import React, { useState } from 'react';

import { useGlobalContext } from '../context';
import { PageHOC, CustomInput, CustomButton } from '../components'

const Home = () => {

  const { contract, walletAddress } = useGlobalContext();
  const [ playerName, setPlayerName ] = useState('');

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
        onClick={() => {}}
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