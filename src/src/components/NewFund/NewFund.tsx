import React, { useEffect, useState } from 'react';
import { Address, useContractWrite, useWaitForTransaction } from 'wagmi';
import { usePrepareContractWrite } from 'wagmi';
import abi from '../../shared/abi.json';

enum ValidTokens {
  RTT = '0x7A56e2F6e2965a3569Fe3BD9c8f65E565C0941ef',
}

enum TokenDecimals {
  RTT = 18,
}

type ContractArgs = {
  goal: number;
  token: Address;
  receiver: Address;
};

type FormStateType = Pick<ContractArgs, 'receiver'> & {
  goal: string;
  token: ValidTokens | '';
};

const initialState: FormStateType = {
  goal: '0',
  token: '',
  receiver: '0x6e8CdBE9CB9A90F75Fe4D5B2F08B9181b04f4Ea9',
};

export const NewFund: React.FC = () => {
  const [formState, setFormState] = useState(initialState);
  const [realValuesState, setRealValuesState] = useState({} as ContractArgs);

  useEffect(() => {
    validate();
  }, [formState]);

  const [errors, setErrors] = useState({
    goal: '',
    token: '',
    receiver: '',
  });

  const [isValid, setIsValid] = useState(false);

  const { config } = usePrepareContractWrite({
    address: '0x7e37Cd627C75DB9b76331F484449E5d98D5C82c5',
    abi,
    functionName: 'initFund',
    args: [realValuesState.goal, realValuesState.token, realValuesState.receiver],
    enabled: isValid,
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = {} as typeof errors;

    if (parseInt(formState.goal) <= 0) {
      isValid = false;
      newErrors.goal = 'Goal should be a positive number.';
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(formState.receiver)) {
      isValid = false;
      newErrors.receiver = `Receiver ${formState.receiver} is not a valid address.`;
    }

    if (formState.token === '') {
      isValid = false;
    } else {
      setRealValuesState({
        goal: parseInt(formState.goal) * 10 ** 18,
        token: formState.token,
        receiver: formState.receiver,
      });
    }

    setIsValid(isValid);
    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validate() && formState.token !== '') {
      let tokenKey = Object.keys(ValidTokens).find(
        (key) => ValidTokens[key as keyof typeof ValidTokens] === formState.token
      );
      let decimals = TokenDecimals[tokenKey as keyof typeof TokenDecimals];
      realValuesState.goal = 1 * 10 ** decimals;
      realValuesState.token = formState.token;
      realValuesState.receiver = formState.receiver;
      write?.();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Goal</label>
          <input name="goal" value={formState.goal} onChange={handleChange} type="number" />
          {errors.goal}
        </div>
        <div>
          <label>Token</label>
          <select name="token" value={formState.token} onChange={handleChange}>
            <option value="">Select One</option>
            {Object.entries(ValidTokens).map(([tokenKey, tokenValue]) => (
              <option value={tokenValue} key={tokenKey}>
                {tokenKey}
              </option>
            ))}
          </select>
          {errors.token}
        </div>
        <div>
          <label>Reciever</label>
          <input name="receiver" value={formState.receiver} onChange={handleChange} />
          {errors.receiver}
        </div>
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
