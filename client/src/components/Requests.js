import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';
import CrowdFundContract from '../utils/crowdfund';
import getWeb3 from '../utils/getWeb3';


class Requests extends Component {
constructor(props){
  super(props)
  this.renderRequests = this.renderRequests.bind(this);
}

async renderRequests() {
  let arr = []
  const web3 = await getWeb3()
  const contract = await CrowdFundContract(this.props.match.params.address);
  const requestCount = await contract.methods.getRequestsCount().call();

  for (let i= 0; i < requestCount; i++){
      arr.push(i)
  }
  const requests = await contract.methods.getRequests(arr).call();
  console.log(requests);
}

  render() {
    const { address } = this.props.match.params;
    this.renderRequests()
    return(
      <Layout header={'HeaderOne'}>
        <Link to={`/campaigns/${address}/requests/new`}>
          <a>
            <Button content='Add Request' primary icon='add circle' labelPosition='right'/>
          </a>
        </Link>
      </Layout>
    )
  }

}

export default Requests
