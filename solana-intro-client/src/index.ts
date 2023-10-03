import * as Web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const connection = new Web3.Connnection(Web3.ClusterAplUrl('devnet'));
  const signer = await initializeKeypair(connection);

  console.log("PublicKey: ", signer.publicKey.toBase58());
}

main()
    .then(() => {
        console.log("Finished successfully")
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })

async function initializeKeypair(connection: Web3.Connection): Promise<Web3.Keypair> {
  if (!process.env.PRIVATE_KEY) {
    console.log('generating new keypair...');
    const signer = Web3.Keypair.generate();

    console.log('Creating .env file');
    fs.writeFileSync('.env', 'PRIVATE_KEY=[${signer.secretKey.toString()}]');

    return signer;
  }

  const secret = JSON.parse(process.env.PRIVATE_KEY ?? '') as number[];
  const secretKey = Uint8Array.from(secret);
  const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);
  return keypairFromSecret;
}