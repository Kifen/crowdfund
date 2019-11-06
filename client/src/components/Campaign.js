import React, { Component } from 'react';
import {  } from 'semantic-ui-react';
import Layout from './layout/Layout';
import getFactory from '../utils/factory';
import getWeb3 from '../utils/getWeb3'
import CrowdFund from '../contracts/CrowdSource.json';

class Campaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: '',
      numberOfApprovals: '',
      manager: '',
      address: '',
      valid: ''
    }

    //this.isValid = this.isValid.bind(this);
  }

  async componentDidMount() {
    const factory = await getFactory();
    const web3 = await getWeb3();
    const arr = await factory.methods.getDeployedCampaigns().call();

    const address = this.props.match.params.address
    if (arr.includes(address)) {
      const contract = new web3.eth.Contract(CrowdFund.abi, address);
      console.log(contract);
      const {minPledge, balance, numRequests, approvalsCount, manager} = await contract.methods.getSummary().call();
      this.setState({balance: balance, numberOfApprovals: approvalsCount, manager: manager, address: address, valid: true})
    } else {
        this.setState({valid: false, address: address});
    }
  }

  render() {
    if (!this.state.valid){
      return <h1>{this.state.address} is invalid</h1>
    }

    return(
      <div>
        <Layout header={"HeaderOne"} active={""}>

        </Layout>
      </div>
    )
  }

}

export default Campaign
