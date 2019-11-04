import React, {Component} from 'react';
import getFactory from '../utils/factory';
import getWeb3 from '../utils/getWeb3'
import { Card } from 'semantic-ui-react';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deployedCampaigns: []
    }
    this.renderCampaigns = this.renderCampaigns.bind(this);
  }

  async componentDidMount() {
   // await factory.contract.createCampaign()
   const factory = await getFactory();
   const web3 = await getWeb3();
   const accounts = await web3.eth.getAccounts();
   //await factory.methods.createCampaign(100).send({from: accounts[0], gas: '1000000'});
   const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
   this.setState({deployedCampaigns})
   console.log(this.state.deployedCampaigns);
  }

  renderCampaigns(campaignsArr) {
    const campaigns = campaignsArr.map(address => {
      return {
        header: address,
        description: <a>View Campaigns</a>,
        fluid: true
      };
    });
    return <Card.Group items={campaigns}/>;
  }

  render() {
      return (
        <div>
            {this.renderCampaigns(this.state.deployedCampaigns)}
        </div>
      )
    }
}

export default Home
