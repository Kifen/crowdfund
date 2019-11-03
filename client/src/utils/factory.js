import getWeb3 from './getWeb3';
import CrowdSourceFactory from '../contracts/CrowdSourceFactory.json';

const getContractInstance = async () => {
  // get network ID and the deployed address
  //const networkId = '5777';
  const web3 = await getWeb3();
  console.log("IN FACTORY")
  console.log(web3)
  const accounts = await web3.eth.getAccounts()
  console.log(accounts)
  const networkId = await web3.eth.net.getId()
  //const networkId = '5777'
  console.log(networkId)
  const deployedAddress = CrowdSourceFactory.networks[networkId].address
  console.log(deployedAddress)

  // create the instance
  const instance = new web3.eth.Contract(
    CrowdSourceFactory.abi,
    deployedAddress
  )
  return instance
}

export default getContractInstance
 