import React, { useState } from 'react';
import { useAccount, useConnect, useContractWrite, useWaitForTransaction } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { usePrepareContractWrite } from 'wagmi';
import abi from '../../shared/abi.json';

const initialState = {
  goal: 100 * 18,
  token: '0x7A56e2F6e2965a3569Fe3BD9c8f65E565C0941ef',
  receiver: '0x6e8CdBE9CB9A90F75Fe4D5B2F08B9181b04f4Ea9',
};

export const NewFund: React.FC = () => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { config } = usePrepareContractWrite({
    address: '0x7e37Cd627C75DB9b76331F484449E5d98D5C82c5',
    abi,
    functionName: 'initFund',
    args: [formState.goal, formState.token, formState.receiver],
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formState.goal = 1 * 10 ** 18;
    formState.token = '0x7A56e2F6e2965a3569Fe3BD9c8f65E565C0941ef';
    formState.receiver = '0x6e8CdBE9CB9A90F75Fe4D5B2F08B9181b04f4Ea9';
    console.log('gm', formState);
    write?.();
  };

  return (
    <>
      {isConnected ? <div>GM: {address}</div> : <button onClick={() => connect()}>Connect Wallet</button>}
      <form onSubmit={handleSubmit}>
        <button disabled={!write || isLoading}>{isLoading ? 'Creating...' : 'Mint'}</button>
        {isSuccess && (
          <div>
            Successfully created!
            <div>
              <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
      </form>
    </>
  );
};
