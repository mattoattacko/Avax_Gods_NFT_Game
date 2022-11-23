import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { PageHOC, CustomButton, CustomInput, GameLoad } from '../components'
import styles from '../styles';

const CreateBattle = () => {
  
  const { battleName, setBattleName, contract } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false); //used for wait screen


  const navigate = useNavigate();

  const handleClick = async () => {
    //make sure user filled in info
    if(!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);

      setWaitBattle(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {waitBattle && <GameLoad />} 
      {/* if we are waiting for the game battle, show the GameLoad component */}

      <div className="flex flex-col mb-5">
        <CustomInput 
          label='Battle'
          placeholder='Enter battle name'
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton 
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>

      <p 
        className={styles.infoText}
        onClick={() => navigate('/join-battle')}
      >
        Or join battles in progress
      </p>
    </>
  )
};

export default PageHOC (
  CreateBattle,
  <>Create <br /> a new Battle!</>,
  <>Create your own battle and wait for other players to join</>
)