import React from 'react';

import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';

export interface RaisinConfigProps {
  children?: React.ReactNode
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
})

export const RaisinConfig: React.FC<RaisinConfigProps> = ({children}) => {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  );
};



