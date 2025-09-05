import { ethers } from "ethers";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

async function main() {
  const rpc = process.env.SOMNIA_RPC_URL || "https://dream-rpc.somnia.network/";
  const privateKey = process.env.PRIVATE_KEY as string;
  if (!privateKey) throw new Error("PRIVATE_KEY is required");

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(privateKey, provider);

  const artifactPath = path.resolve(__dirname, "../artifacts/contracts/SST.sol/SST.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

  // Mint 1,000,000 SST with 18 decimals
  const initialSupply = ethers.utils.parseUnits("1000000", 18);
  const contract = await factory.deploy(initialSupply);
  await contract.deployed();

  const addressBookPath = path.resolve(__dirname, "../contract-addresses.json");
  let current: any = {};
  if (fs.existsSync(addressBookPath)) current = JSON.parse(fs.readFileSync(addressBookPath, "utf8"));

  current.SST = contract.address;
  current.Network = {
    name: "Somnia Testnet (Shannon)",
    rpcUrl: rpc,
    chainId: 50312,
    currency: "STT",
    explorer: "https://somnia-testnet.socialscan.io/",
  };

  fs.writeFileSync(addressBookPath, JSON.stringify(current, null, 2));

  console.log(JSON.stringify({ address: contract.address }));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


