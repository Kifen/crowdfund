import React, {Component} from 'react';
import getFactory from '../utils/factory';
import getWeb3 from '../utils/getWeb3'

class Home extends Component {

  async componentDidMount() {
   // await factory.contract.createCampaign()
   const factory = await getFactory();
   console.log(factory);
   const web3 = await getWeb3();
   console.log(web3)
   const accounts = await web3.eth.getAccounts();
   console.log(accounts);
   const amount = web3.utils.toWei('100', 'ether')
   await factory.methods.createCampaign(100).send({from: accounts[0], gas: '1000000'});
   const address = await factory.methods.getDeployedCampaigns().call();
   console.log(address);
  }
    render() {
        return (
          <div>
            <h1>Home</h1>
          </div>
        )
      }
}

export default Home