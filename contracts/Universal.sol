// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {GatewayZEVM, MessageContext, UniversalContract} from "@Zetachain/protocol-contracts/contracts/zevm/GatewayZEVM.sol";

contract Universal is UniversalContract {
    GatewayZEVM public immutable GATEWAY;

    event HelloEvent(string, string);
    error Unauthorized();

    modifier onlyGateway() {
        if (msg.sender != address(GATEWAY)) revert Unauthorized();
        _;
    }

    constructor(address payable gatewayAddress) {
        GATEWAY = GatewayZEVM(gatewayAddress);
    }

    function onCall(
        MessageContext calldata /* context */,
        address /* zrc20 */,
        uint256 /* amount */,
        bytes calldata message
    ) external override onlyGateway {
        string memory name = abi.decode(message, (string));
        emit HelloEvent("Hello: ", name);
    }
}
