import getWeb3 from './getWeb3';
import CrowdFund from '../contracts/CrowdSource.json'

export default async (address) => {
  const web3 = await getWeb3();
  return new web3.eth.Contract(CrowdFund.abi, address);
}
