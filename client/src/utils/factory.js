import getWeb3 from './getWeb3';
import CrowdSourceFactory from '../contracts/CrowdSourceFactory.json';

const getContractInstance = async () => {
  const web3 = await getWeb3();
  const networkId = await web3.eth.net.getId();
  const deployedAddress = CrowdSourceFactory.networks[networkId].address
  // create the instance
  const instance = new web3.eth.Contract(
    CrowdSourceFactory.abi,
    deployedAddress
  )
  return instance
}

export default getContractInstance
