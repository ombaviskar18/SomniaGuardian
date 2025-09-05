# SomniaGuardian

Universal blockchain security analysis platform powered by Somnia network.

## Features

- **Contract Analysis**: Comprehensive security evaluation of smart contracts
- **Social Analysis**: AI-powered social sentiment analysis for crypto projects
- **Tokenomics Analysis**: Deep dive into token economics and distribution
- **Cross-Chain Monitoring**: Monitor transactions across multiple blockchains
- **SST Token Integration**: Features gated by holding 1 SST token

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Blockchain**: Somnia Testnet (Shannon)
- **Smart Contracts**: Solidity + Hardhat
- **Deployment**: Vercel

## Network Configuration

- **Network Name**: Somnia Testnet (Shannon)
- **Chain ID**: 50312
- **RPC URL**: https://dream-rpc.somnia.network/
- **Currency Symbol**: STT
- **Block Explorer**: https://somnia-testnet.socialscan.io/

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask wallet

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SomniaGuardian/ZetaGaurdian
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your actual values
```

4. Deploy SST token to Somnia:
```bash
npx hardhat compile
ts-node ./scripts/deploy-sst.ts
```

5. Update contract addresses:
- Copy the deployed SST address to `frontend/src/constants/contracts.ts`
- Update `contract-addresses.json` with the new address

6. Start development server:
```bash
npm run dev:all
```

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard (see `VERCEL_ENV_SETUP.md`)
3. Deploy:
```bash
npm run deploy
```

### Environment Variables

Required environment variables for full functionality:

- `SOMNIA_RPC_URL`: Somnia network RPC endpoint
- `PRIVATE_KEY`: Wallet private key for deployments
- `GEMINI_API_KEY`: Google Gemini API key for AI features
- `GOOGLE_NEWS_API_KEY`: News API key for social analysis
- Various blockchain API keys (see `VERCEL_ENV_SETUP.md`)

## Smart Contracts

### SST Token

ERC-20 token contract deployed on Somnia Testnet:
- **Name**: Somnia Service Token
- **Symbol**: SST
- **Purpose**: Gate features requiring 1 SST token

### Deployment

```bash
# Compile contracts
npx hardhat compile

# Deploy SST token
ts-node ./scripts/deploy-sst.ts

# Deploy other contracts
npx hardhat deploy --network somnia
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/inspect` - Contract analysis
- `GET /api/social/insights` - Social sentiment analysis
- `GET /api/news` - News aggregation
- `GET /api/token/total-supply` - Token supply information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Support

For support and questions, please open an issue in the repository.