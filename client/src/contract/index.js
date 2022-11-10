//export the address 
//ABI = Application Binary Interface. It's an interface between two program modules. Basically it allows our FE side to call the functions that we create in the smart contract.
//It's a JSON file that contains all the information about the smart contract. It's the interface between the smart contract and the front end. It's the contract's API.


import contract from './AVAXGods.json';

export const ADDRESS = '0xA96df854bC3687aC627cDC0A0e07B2B50579929F'

export const { abi: ABI } = contract; 