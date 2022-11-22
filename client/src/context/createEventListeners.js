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

export const createEventListeners = ({ navigate, contract, provider, walletAddress, setShowAlert }) => {
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
        type: 'success', 
        message: 'Player Successfully Added!',
      });
    }
  });
}