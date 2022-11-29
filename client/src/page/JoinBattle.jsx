import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from '../context';
import { PageHOC, CustomButton } from '../components'
import styles from '../styles';

const JoinBattle = () => {
  const { contract, gameData, setShowAlert, setBattleName, walletAddress } = useGlobalContext();
  const navigate = useNavigate();

  // joins battle
  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      await contract.joinBattle(battleName);

      setShowAlert({ status: true, type: "success", message: `Joining ${battleName}!` });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className={styles.joinHeadText}>
        Available Battles:
      </h2>

      <div className={styles.joinContainer}>
        {/* check if pending battles exist. If yes, display them */}
        {/* filter out the battles that dont match any that the current player has created, then map through them */}
        {gameData.pendingBattles.length 
          ? gameData.pendingBattles.filter((battle) => !battle.players.includes(walletAddress)).map((battle, index) => (
            <div key={battle.name + index} className={styles.flexBetween}>
              <p className={styles.joinBattleTitle}>
                {index + 1}. {battle.name}
              </p>

              <CustomButton 
                title="Join"
                handleClick={() => handleClick(battle.name)}
              />
            </div>
          ))
          : <p className={styles.joinLoading}>
              Reload Page to See New Battles
            </p>
        }
      </div>

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