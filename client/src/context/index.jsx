import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers'; //package that allows us to interact with the smart contract
import Web3Modal from 'web3modal'; //allows us to connect to the wallet
import { useNavigate } from 'react-router-dom';
import { ABI, ADDRESS } from '../contract';

import { createEventListeners } from './createEventListeners';

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
  const [showAlert, setShowAlert] = useState({ status: false, type: "info", message: '' }); //starts as an object with status as false (meaning the message isnt showing)
  const [battleName, setBattleName] = useState('');
  const [gameData, setGameData] = useState({
    players: [],
    pendingBattle: [],
    activeBattle: null
  });
  const [updateGameData, setUpdateGameData] = useState(0);
  const [battleGround, setBattleGround] = useState('bg-astral'); //connects to battleground

  const navigate = useNavigate();

  //* Set wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({
      method: 'eth_requestAccounts'
    })

    //set first account as state
    if (accounts) setWalletAddress(accounts[0]);
  }

  useEffect(() => {
    updateCurrentWalletAddress();

    //update the wallet on account change
    window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
  }, []);

  //* Set smart contract provider to state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider); //we set the newProvider to the state so that we can use it later
      setContract(newContract);
    };

    setSmartContractAndProvider();
  }, []);

  useEffect(() => {
    //check if contract exists. If it does, createEventListeners function.
    if (contract) {
      createEventListeners({
        navigate,
        contract,
        provider,
        walletAddress,        
        setShowAlert,
        setBattleName,
        battleName,
        setUpdateGameData,
      });
    }
  }, [contract])

  //* Timer for alert
  //if the status is currently true (alert is showing) then we create a new timer. We show the alert and then close it after 5 seconds. The message being an empty string means we are canceling it.
  //in React we need to make sure to clearTimeout() by passing the timer so that we dont have multiple timers running at the same time.
  useEffect(() => {

    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: '' })
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);


  //* Set the game data to the state
  // this will be useful later on once we want to map over the active games, or check if the current player is in a game.
  //executed when contract changes
  useEffect(() => {
    const fetchGameData = async () => {
      //first get all available battles
      const fetchedBattles = await contract?.getAllBattles();

      //filter battles to only show battles no one has joined yet. battleStatus = 0 means no one has joined yet and the battle is pending.
      const pendingBattles = fetchedBattles.filter((battle) => battle.battleStatus === 0);
      let activeBattle = null;

      //finds battle that our current player has created (aka an active battle).
      //means that our player has the same address as the address of the wallet in the browser. Which means we can do things. 
      // 'startsWith(0x00)' means we dont have a winner and the battle is still active.
      //in that case we can create a new variable (let activeBattle). 
      fetchedBattles.forEach((battle) => {
        if(battle.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {
          if(battle.winner.startsWith('0x00')) {
            activeBattle = battle;
          }
        }
      })

      // console.log(fetchedBattles);
      setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle })
    }

    //check if contract exists. If so, fetch game data function
    if(contract) fetchGameData();
  }, [contract, updateGameData])

  return (
    <GlobalContext.Provider
      value={{ //these next things are props
        contract,
        walletAddress,
        updateCurrentWalletAddress,
        showAlert,
        setShowAlert,
        battleName,
        setBattleName,
        gameData,
        setGameData,
        battleGround,
        setBattleGround,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);