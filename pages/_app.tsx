import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Keypair } from 'stellar-base'
import * from '@solana/web3.js'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

const ownerKeypair = Keypair.generate();

export default MyApp
