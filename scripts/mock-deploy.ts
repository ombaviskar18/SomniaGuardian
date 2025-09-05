// Mock deployment script for SST token
// This creates a placeholder address for development/testing
// Replace with actual deployment when ready

import fs from 'fs';
import path from 'path';

// Mock SST token address (placeholder)
const MOCK_SST_ADDRESS = '0x1234567890123456789012345678901234567890';

// Mock Universal contract address (placeholder)
const MOCK_UNIVERSAL_ADDRESS = '0x0987654321098765432109876543210987654321';

console.log('🚀 Mock Deployment for SomniaGuardian');
console.log('=====================================');
console.log('');

console.log('📋 Deployed Contracts:');
console.log(`SST Token: ${MOCK_SST_ADDRESS}`);
console.log(`Universal Contract: ${MOCK_UNIVERSAL_ADDRESS}`);
console.log('');

// Update contract-addresses.json
const contractAddresses = {
  "Universal": MOCK_UNIVERSAL_ADDRESS,
  "SST": MOCK_SST_ADDRESS,
  "Network": {
    "name": "Somnia Testnet (Shannon)",
    "rpcUrl": "https://dream-rpc.somnia.network/",
    "chainId": 50312,
    "currency": "STT",
    "explorer": "https://somnia-testnet.socialscan.io/"
  }
};

fs.writeFileSync(
  path.resolve(__dirname, '../contract-addresses.json'),
  JSON.stringify(contractAddresses, null, 2)
);

console.log('✅ Updated contract-addresses.json');

// Update frontend constants
const frontendConstantsPath = path.resolve(__dirname, '../frontend/src/constants/contracts.ts');
const frontendConstants = `export const HELLO_UNIVERSAL_CONTRACT_ADDRESS =
  '${MOCK_UNIVERSAL_ADDRESS}';

export const SST_TOKEN_ADDRESS =
  '${MOCK_SST_ADDRESS}';
`;

fs.writeFileSync(frontendConstantsPath, frontendConstants);

console.log('✅ Updated frontend/src/constants/contracts.ts');

console.log('');
console.log('🎉 Mock deployment completed!');
console.log('');
console.log('📝 Next Steps:');
console.log('1. Deploy actual contracts to Somnia Testnet');
console.log('2. Replace mock addresses with real deployed addresses');
console.log('3. Test the application with real contracts');
console.log('');
console.log('🔗 Somnia Testnet Details:');
console.log('Network: Somnia Testnet (Shannon)');
console.log('Chain ID: 50312');
console.log('RPC: https://dream-rpc.somnia.network/');
console.log('Explorer: https://somnia-testnet.socialscan.io/');
