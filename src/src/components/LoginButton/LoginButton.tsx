import React from 'react';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const LoginButton: React.FC = () => {
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return <div>{isConnected ? <div>GM: {address}</div> : <button onClick={() => connect()}>Connect</button>}</div>;
};
