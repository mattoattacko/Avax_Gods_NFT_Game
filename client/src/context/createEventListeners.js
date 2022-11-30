import { ethers } from 'ethers';

import { ABI } from '../contract';

const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter); //Removes previous event listener. Prevents multiple listeners for same event at same time

  provider.on(eventFilter, (logs) => { //get the logs inside of the CBfunction
    //parse the logs. This is a built in ethers functionality.
    const parsedLog = (new ethers.utils.Interface(ABI)).parseLog(logs); //we pass in the ABI and the logs. This will return an object with the event name and the event args. We can then use this to update the state.

    //pass the logs to our callback function
    cb(parsedLog);
  })
};

export const createEventListeners = ({ navigate, contract, provider, walletAddress, setShowAlert, setUpdateGameData }) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer(); 
  
  //we pass in the event name. This will return an object with the event name and the event args. We can then use this to update the state.
  //when we create a contract and specify an event for that contract (eg: NewPlayer event), we can immediately filter the calls for that contract
  //we will import the contract through props
  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    //inside of this CBfunc, we are passing the 'parsedLog', so we destructure that and get { args } from it. This is the event argument.
    console.log("New Player Created!", args);

    //alert
    if (walletAddress === args.owner) {
      setShowAlert({ 
        status: true, 
        type: "success", 
        message: 'Player Successfully Added!',
      });
    }
  })


  // event listener for join battle event. Redirect players to battle ground area. Gotta make a new game token.
  // the 'args' of the other player contains their walletAddress.
  // if statement makes sure our players are player 1 or 2.
  // once we join the battle, we want to update the game data. So we need a new useState field in index.jsx (setUpdateGameData).
  // in setUpdateGameData, we want access to the previous/prev update game data. Then we return prevUpdateGameData + 1. This will trigger the useEffect in index.jsx.
  // we take the useEffect under "set the game data to state" and update it once the updateGame variable changes. So we pass it in as the second dependency param.
  const NewBattleEventFilter = contract.filters.NewBattle();
  AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log("New Battle Created!", args, walletAddress);

    if(walletAddress.toLowerCase() === args.player1.toLowerCase() 
      || walletAddress.toLowerCase() === args.player2.toLowerCase()) {
        navigate(`/battle/${args.battleName}`)
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1)
  })


}