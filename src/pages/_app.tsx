import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: "KEjoTwYE2Ckhvrsbk5tO94HXMor3qf_A" }),
    alchemyProvider({ apiKey: "UyVbnU_JfK0AjrPFdO_Txn4qruRcT5HU" }),
  ]
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
