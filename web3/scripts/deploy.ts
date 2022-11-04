//This was given to us in a gist (JSM)
import { ethers } from 'hardhat';
import console from 'console';

const _metadataUri = 'https://gateway.pinata.cloud/ipfs/https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi';

async function deploy(name: string, ...params: [string]) {
  const contractFactory = await ethers.getContractFactory(name); //creates new contract factory

  return await contractFactory.deploy(...params).then((f) => f.deployed()); //deploy new contract factory
}

async function main() {
  const [admin] = await ethers.getSigners();
  
  console.log(`Deploying a smart contract...`);

  const AVAXGods = (await deploy('AVAXGods', _metadataUri)).connect(admin);

  console.log({ AVAXGods: AVAXGods.address }); //get address of deployed contract
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });