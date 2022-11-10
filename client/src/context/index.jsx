import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers'; //package that allows us to interact with the smart contract
import Web3Modal from 'web3modal'; //allows us to connect to the wallet
import { useNavigate } from 'react-router-dom';
import { ABI, ADDRESS } from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  //first interact/connect with the smart contract.
  //then pass all the values to the value object to use them in all the components.
  //then make a helper function/hook useGlobalContext where we useContext and pass in the GlobalContext. That allows us to call it from other components.

  //we put {children} in the GlobalContextProvider so that we can wrap all the components in the main.jsx file with the GlobalContextProvider. That way all the components will have access to the values in the value object.

  //we use a series of useEffects to connect to the smart contract as soon as the app loads.
  //we connect to a smart wallet with Core, which injects web3 functionality into the browser. That's how we get the window.ethereum.request() function.

  //we set the newContract to the state so that we can use it later

  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState('');
  const [provider, setProvider] = useState('');

  //* Set wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    //set first account as state
    if(accounts) setWalletAddress(accounts[0]);
  }

  useEffect(() => {
    updateCurrentWalletAddress();

    //update the wallet on account change
    window.ethereum.on('accountsChanged', updateCurrentWalletAddress);
  }, [])

  //* Set smart contract provider to state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.signer();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider); //we set the newProvider to the state so that we can use it later
      setContract(newContract);
    }

    setSmartContractAndProvider();
  }, [])

  return (
    <GlobalContext.Provider value={{
      
    }}> 
      {children} 
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);