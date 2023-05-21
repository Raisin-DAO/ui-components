import React from 'react';

import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

export interface RaisinConfigProps {
  children?: React.ReactNode;
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: 'HslyZrFWXbBPfj7dwo6or3qZiHQZhocb' }), publicProvider()]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

export const RaisinConfig: React.FC<RaisinConfigProps> = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
