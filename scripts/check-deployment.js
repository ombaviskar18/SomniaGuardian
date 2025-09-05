// Simple deployment checker script
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking SomniaGuardian Deployment Status');
console.log('============================================');

// Check contract addresses
const contractAddressesPath = path.resolve(__dirname, '../contract-addresses.json');
const frontendConstantsPath = path.resolve(__dirname, '../frontend/src/constants/contracts.ts');

let contractAddresses = {};
let frontendConstants = '';

try {
  contractAddresses = JSON.parse(fs.readFileSync(contractAddressesPath, 'utf8'));
  console.log('✅ contract-addresses.json found');
} catch (error) {
  console.log('❌ contract-addresses.json not found or invalid');
}

try {
  frontendConstants = fs.readFileSync(frontendConstantsPath, 'utf8');
  console.log('✅ frontend/src/constants/contracts.ts found');
} catch (error) {
  console.log('❌ frontend/src/constants/contracts.ts not found');
}

console.log('');
console.log('📋 Current Configuration:');
console.log('========================');

if (contractAddresses.SST) {
  const isMock = contractAddresses.SST === '0x1234567890123456789012345678901234567890';
  console.log(`SST Token Address: ${contractAddresses.SST} ${isMock ? '(MOCK)' : '(REAL)'}`);
  
  if (isMock) {
    console.log('⚠️  Using mock SST address - deploy real contract for production');
  } else {
    console.log('✅ Using real SST contract address');
  }
} else {
  console.log('❌ SST Token Address: Not set');
}

if (contractAddresses.Network) {
  console.log(`Network: ${contractAddresses.Network.name}`);
  console.log(`Chain ID: ${contractAddresses.Network.chainId}`);
  console.log(`RPC: ${contractAddresses.Network.rpcUrl}`);
  console.log(`Explorer: ${contractAddresses.Network.explorer}`);
} else {
  console.log('❌ Network configuration: Not set');
}

console.log('');
console.log('🔧 Deployment Commands:');
console.log('======================');
console.log('Mock deployment:     npm run mock-deploy');
console.log('Update SST address:  npm run update-sst-address <CONTRACT_ADDRESS>');
console.log('Deploy to Vercel:    npm run deploy');

console.log('');
console.log('📖 Documentation:');
console.log('================');
console.log('Complete guide:       README.md');

console.log('');
console.log('🌐 Somnia Testnet Details:');
console.log('=========================');
console.log('Network Name: Somnia Testnet (Shannon)');
console.log('Chain ID: 50312');
console.log('RPC URL: https://dream-rpc.somnia.network/');
console.log('Currency: STT');
console.log('Explorer: https://somnia-testnet.socialscan.io/');
console.log('Faucet: https://testnet.somnia.network/');

console.log('');
console.log('🎯 Next Steps:');
console.log('=============');
if (contractAddresses.SST === '0x1234567890123456789012345678901234567890') {
  console.log('1. Deploy real SST contract using Remix IDE (see README.md)');
  console.log('2. Update contract address using: npm run update-sst-address <ADDRESS>');
  console.log('3. Test the application with real contract');
  console.log('4. Deploy to Vercel: npm run deploy');
} else {
  console.log('1. Test the application with current contract');
  console.log('2. Deploy to Vercel: npm run deploy');
  console.log('3. Monitor deployment and verify functionality');
}
