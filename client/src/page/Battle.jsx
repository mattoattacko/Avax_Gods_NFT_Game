// not a higher order component wrapper because this is going to be our game battle page.
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '../components';
import { useGlobalContext } from '../context';
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets';
import { playAudio } from '../utils/animation.js';

import styles from '../styles';


const Battle = () => {
  const { contract, gameData, walletAddress, setBattleName, setShowAlert } = useGlobalContext();
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  //navigate to /battle/:battleName
  const { battleName } = useParams();
  const navigate = useNavigate();



  return (
    //battleGround images in the tailwind config file are based on different battle ground names.
    <div className={`${styles.flexBetween} ${styles.gameContainer} astral`}  >
      <h1 className="text-xl text-white">
        {battleName}
      </h1>
    </div>
  )
}

export default Battle