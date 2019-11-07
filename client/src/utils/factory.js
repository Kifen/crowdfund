import getWeb3 from './getWeb3';
import CrowdFundFactory from '../contracts/CrowdFundFactory.json';

const getContractInstance = async () => {
  const web3 = await getWeb3();
  const networkId = await web3.eth.net.getId();
  console.log(networkId);
  const deployedAddress = CrowdFundFactory.networks[networkId].address
  // create the instance
  const instance = new web3.eth.Contract(
    CrowdFundFactory.abi,
    deployedAddress
  )
  return instance
}

export default getContractInstance
