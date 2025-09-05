// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {GatewayZEVM, MessageContext, UniversalContract} from "@Zetachain/protocol-contracts/contracts/zevm/GatewayZEVM.sol";
import {IZRC20} from "@Zetachain/protocol-contracts/contracts/zevm/interfaces/IZRC20.sol";

contract ContractAnalysis is UniversalContract {
    GatewayZEVM public immutable GATEWAY;
    
    // Payment required for each analysis (0.01 Zeta)
    uint256 public constant ANALYSIS_PAYMENT = 0.01 ether;
    
    // Events
    event ContractAnalysisRequested(address indexed user, string contractAddress, uint256 payment);
    event ContractAnalysisCompleted(address indexed user, string contractAddress, uint256 riskScore, string analysis);
    event PaymentReceived(address indexed user, uint256 amount);
    error Unauthorized();
    
    // Structs
    struct AnalysisRequest {
        address user;
        string contractAddress;
        uint256 payment;
        bool completed;
        uint256 riskScore;
        string analysis;
        uint256 timestamp;
    }
    
    // State variables
    mapping(address => AnalysisRequest[]) public userRequests;
    address public owner;
    
    modifier onlyGateway() {
        if (msg.sender != address(GATEWAY)) revert Unauthorized();
        _;
    }
    
    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }
    
    modifier requirePayment() {
        require(msg.value >= ANALYSIS_PAYMENT, "Payment of 0.01 Zeta required for each analysis");
        _;
    }

    constructor(address payable gatewayAddress) {
        GATEWAY = GatewayZEVM(gatewayAddress);
        owner = msg.sender;
    }

    function onCall(
        MessageContext calldata /* context */,
        address /* zrc20 */,
        uint256 /* amount */,
        bytes calldata message
    ) external override onlyGateway {
        // Handle cross-chain calls if needed
        emit ContractAnalysisRequested(msg.sender, "cross-chain", 0);
    }
    
    /**
     * @dev Request contract analysis - requires payment for each analysis
     * @param contractAddress The contract address to analyze
     */
    function requestContractAnalysis(string memory contractAddress) external payable requirePayment {
        require(bytes(contractAddress).length > 0, "Contract address cannot be empty");
        
        // Create analysis request
        AnalysisRequest memory newRequest = AnalysisRequest({
            user: msg.sender,
            contractAddress: contractAddress,
            payment: msg.value,
            completed: false,
            riskScore: 0,
            analysis: "",
            timestamp: block.timestamp
        });
        
        userRequests[msg.sender].push(newRequest);
        
        emit ContractAnalysisRequested(msg.sender, contractAddress, msg.value);
        emit PaymentReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Complete contract analysis (called by owner/backend)
     * @param user The user who requested the analysis
     * @param requestIndex Index of the request in user's requests array
     * @param riskScore The calculated risk score (0-100)
     * @param analysis The analysis report
     */
    function completeAnalysis(
        address user,
        uint256 requestIndex,
        uint256 riskScore,
        string memory analysis
    ) external onlyOwner {
        require(requestIndex < userRequests[user].length, "Invalid request index");
        require(!userRequests[user][requestIndex].completed, "Analysis already completed");
        
        userRequests[user][requestIndex].completed = true;
        userRequests[user][requestIndex].riskScore = riskScore;
        userRequests[user][requestIndex].analysis = analysis;
        
        emit ContractAnalysisCompleted(
            user,
            userRequests[user][requestIndex].contractAddress,
            riskScore,
            analysis
        );
    }
    
    /**
     * @dev Get user's analysis requests
     * @param user The user address
     * @return Array of analysis requests
     */
    function getUserRequests(address user) external view returns (AnalysisRequest[] memory) {
        return userRequests[user];
    }
    

    
    /**
     * @dev Withdraw accumulated payments (owner only)
     */
    function withdrawPayments() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Transfer ownership
     * @param newOwner The new owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        owner = newOwner;
    }
    
    // Allow contract to receive ETH
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }
}
