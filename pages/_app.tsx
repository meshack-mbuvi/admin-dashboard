import type { AppProps } from "next/app";
import "styles/globals.css";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY })]
);

const { connectors } = getDefaultWallets({
  appName: "Admin Dashboard",
  chains,
});

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
