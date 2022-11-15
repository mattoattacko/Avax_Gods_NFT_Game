import React, { useState } from 'react';

import { useGlobalContext } from '../context';
import { PageHOC, CustomInput, CustomButton } from '../components'

const Home = () => {

  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [ playerName, setPlayerName ] = useState('');

  //interact with the smart contract
  const handleClick = async () => {
    try {

      const playerExists = await contract.isPlayer(walletAddress); // Check if player exists already. Function returns a boolean. 

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName); // Register player. The 'playerName' is coming from our CustomInput. The game token is the same as the second 'playerName'

        setShowAlert({
          status: true, //we want to show the alert ergo true
          type: 'info', //show the info alert
          message: `${playerName} is being summoned` //show the message
        })
      }
    } catch (error) {
      setShowAlert({
        status: true, 
        type: 'failure', 
        message: "Something went wrong"
      })
    }
  }

  return (
    <div className='flex flex-col'>
      <CustomInput 
        label='Player Name'
        placeholder='Enter player name'
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton 
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6" //styles for this specific button
      />
    </div>
  )
};

export default PageHOC (
  Home,
  <>Welcome to Avax Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your wallet to start playing <br /> the ultimate Web3 Battle Card Game </>
)