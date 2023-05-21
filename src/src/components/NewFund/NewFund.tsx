import React, { useState } from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'

const initialState = {
  goal: '',
  token: '',
  receiver: '',
};

export const NewFund: React.FC = () => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const validateForm = () => {
    let tempErrors = { ...initialState };
    let isValid = true;

    if (!formState.goal || isNaN(Number(formState.goal))) {
      tempErrors.goal = 'Please provide a valid number for Goal';
      isValid = false;
    }

    if (!formState.token) {
      tempErrors.token = 'Please select a token';
      isValid = false;
    }

    if (!formState.receiver.match(/^0x[a-fA-F0-9]{40}$/)) {
      tempErrors.receiver = 'Please provide a valid ETH address';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formState);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isConnected ? <div>GM: {address}</div> : <button onClick={() => connect()}>Connect Wallet</button>}
      <form onSubmit={handleSubmit}>
        <label>
          Goal:
          <input type="text" name="goal" onChange={handleChange} />
          {errors.goal && <div>{errors.goal}</div>}
        </label>
        <label>
          Token:
          <select name="token" onChange={handleChange}>
            <option value="">--Select Token--</option>
            <option value="eth">ETH</option>
            <option value="matic">MATIC</option>
            <option value="usdt">USDT</option>
          </select>
          {errors.token && <div>{errors.token}</div>}
        </label>
        <label>
          Receiver:
          <input type="text" name="receiver" onChange={handleChange} />
          {errors.receiver && <div>{errors.receiver}</div>}
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
