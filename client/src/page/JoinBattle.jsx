import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from '../context';
import { PageHOC, CustomButton } from '../components'
import styles from '../styles';

const JoinBattle = () => {

  const navigate = useNavigate();

  return (
    <>
      <h2 className={styles.joinHeadText}>
        Available Battles:
      </h2>

      <p className={styles.infoText} onClick={() => navigate('/create-battle')}>
        Or Create a New Battle!
      </p>
    </>
  )
}

export default PageHOC (
  JoinBattle,
  <>Join <br /> a Battle!</>,
  <>Join a battle that has already been created</>
)