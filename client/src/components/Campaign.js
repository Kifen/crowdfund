import React, { Component } from 'react';
import { Card, Grid, Header } from 'semantic-ui-react';
import Layout from './layout/Layout';
import ContributeForm from './ContributeForm';
import getFactory from '../utils/factory';
import getWeb3 from '../utils/getWeb3'
import CrowdFund from '../contracts/CrowdSource.json';
import CrowdFundContract from '../utils/crowdfund';

class Campaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minimumPledge: '',
      balance: '',
      numberOfRequests: '',
      numberOfApprovals: '',
      manager: '',
      address: '',
      valid: true
    }

    this.renderCard = this.renderCard.bind(this);
  }

  async componentDidMount() {
    const factory = await getFactory();
    const web3 = await getWeb3();
    const arr = await factory.methods.getDeployedCampaigns().call();

    const address = this.props.match.params.address
    if (arr.includes(address)) {
      //const contract = new web3.eth.Contract(CrowdFund.abi, address);
      const contract = await CrowdFundContract(address);
      console.log(contract)
      const summary = await contract.methods.getSummary().call();
      //console.log(summary);
      const bal = web3.utils.fromWei(summary[1], 'ether');
      this.setState({minimumPledge: summary[0], balance: bal, numberOfRequests: summary[2],
        numberOfApprovals: summary[3] ,manager: summary[4], address: address, valid: true})
    } else {
        this.setState({valid: false, address: address});
    }
  }

  renderCard() {
    const items = [
      {
        header: this.state.manager,
        meta: 'Manager Address',
        description: 'Manager created this campaign and can create request to withdraw funds.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: this.state.minimumPledge,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least `(${this.state.minimumPledge})` to become an approver.'
      },
      {
        header: this.state.numberOfRequests,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw funds from the contract. Requests must be approved by approvers.'
      },
      {
        header: this.state.numberOfApprovals,
        meta: "Number of Approvers",
        description: "Number of people who have donated to this campaign."
      },
      {
        header: this.state.balance,
        meta: "Campaign Balance (ether)",
        description: 'Available funds remaining in campaign.'
      }
    ]
    return <Card.Group items={items}/>;
  }

  render() {
    if (!this.state.valid){
      return <h1>{this.state.address} is invalid</h1>
    }

    return(
      <div>
        <Layout header={"HeaderOne"} active={""}>
        <Header as='h3' block>Campaign: {this.state.address}</Header>
          <Grid>
            <Grid.Column width={10}>
              {this.renderCard()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.state.address}/>
            </Grid.Column>
          </Grid>
        </Layout>
      </div>
    )
  }

}

export default Campaign
