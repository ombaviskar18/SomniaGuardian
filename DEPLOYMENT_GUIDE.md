# SomniaGuardian Deployment Guide

## 🚀 Quick Deployment to Vercel

### Prerequisites
- Node.js 18+
- Vercel account
- MetaMask wallet with Somnia Testnet configured

### 1. Environment Setup

#### Install Dependencies
```bash
npm install
```

#### Set Environment Variables in Vercel
Go to your Vercel project dashboard → Settings → Environment Variables and add:

**Required:**
```
SOMNIA_RPC_URL=https://dream-rpc.somnia.network/
PRIVATE_KEY=your_wallet_private_key_here
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_NEWS_API_KEY=your_google_news_api_key_here
```

**Optional (for multi-chain support):**
```
ETHERSCAN_API_KEY=your_etherscan_api_key
ALCHEMY_ETH_SEPOLIA_URL=your_alchemy_url
BASESCAN_API_KEY=your_basescan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
BSCSCAN_API_KEY=your_bscscan_api_key
SNOWTRACE_API_KEY=your_snowtrace_api_key
```

### 2. Contract Deployment

#### Option A: Mock Deployment (For Testing)
```bash
npm run mock-deploy
```
This sets up placeholder addresses for immediate testing.

#### Option B: Real Deployment (Production)
```bash
# Compile contracts
npx hardhat compile

# Deploy SST token
ts-node ./scripts/deploy-sst.ts

# Update addresses in:
# - frontend/src/constants/contracts.ts
# - contract-addresses.json
```

### 3. Deploy to Vercel

#### Development Deployment
```bash
npm run deploy:dev
```

#### Production Deployment
```bash
npm run deploy
```

### 4. Verify Deployment

1. **Health Check**: `https://your-app.vercel.app/api/health`
2. **Contract Analysis**: `https://your-app.vercel.app/api/inspect?chain=ethereum&address=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
3. **Frontend**: Visit your Vercel URL

## 🔧 Network Configuration

### Somnia Testnet (Shannon)
- **Network Name**: Somnia Testnet (Shannon)
- **Chain ID**: 50312
- **RPC URL**: https://dream-rpc.somnia.network/
- **Currency Symbol**: STT
- **Block Explorer**: https://somnia-testnet.socialscan.io/

### MetaMask Configuration
Add this network to MetaMask:
```json
{
  "chainId": "0xC468",
  "chainName": "Somnia Testnet (Shannon)",
  "rpcUrls": ["https://dream-rpc.somnia.network/"],
  "nativeCurrency": {
    "name": "STT",
    "symbol": "STT",
    "decimals": 18
  },
  "blockExplorerUrls": ["https://somnia-testnet.socialscan.io/"]
}
```

## 📋 Contract Addresses

### Current Mock Addresses (Replace with Real Deployment)
- **SST Token**: `0x1234567890123456789012345678901234567890`
- **Universal Contract**: `0x0987654321098765432109876543210987654321`

### After Real Deployment
Update these files with actual deployed addresses:
- `frontend/src/constants/contracts.ts`
- `contract-addresses.json`

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **Contract Deployment Issues**
   - Ensure PRIVATE_KEY is set correctly
   - Verify Somnia RPC is accessible
   - Check wallet has enough STT for gas

3. **API Errors**
   - Verify all environment variables are set
   - Check API key limits and validity
   - Review Vercel function logs

### Environment Variable Priority
The API uses the first available configuration:
- **Ethereum**: `ALCHEMY_ETH_SEPOLIA_URL` → `INFURA_ETH_SEPOLIA_URL`
- **Mainnet**: `ALCHEMY_ETH_MAINNET_URL` → `INFURA_ETH_MAINNET_URL`

## 🎯 Features Requiring SST Token

Users need at least 1 SST token to access:
- Contract Analysis
- Social Analysis  
- Tokenomics Analysis
- Monitoring Features

## 📞 Support

For deployment issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints individually
4. Open an issue in the repository

---

**Ready to deploy!** 🚀
