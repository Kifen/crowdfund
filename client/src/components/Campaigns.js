import React, {Component} from 'react';
import getFactory from '../utils/factory';
import getWeb3 from '../utils/getWeb3'
import { Card, Button } from 'semantic-ui-react';
import Layout from './layout/Layout';
import { Link } from 'react-router-dom';

class Campaigns extends Component {

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
        description:(
          <Link to={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={campaigns}/>;
  }

  render() {
      return (
        <Layout header={"HeaderOne"} active={"campaigns"}>
          <div>
            <h3>Open Campaigns</h3>
            {this.renderCampaigns(this.state.deployedCampaigns)}
          </div>
        </Layout>
      )
    }
}

export default Campaigns
