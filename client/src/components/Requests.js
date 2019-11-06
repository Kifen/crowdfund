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
  const web3 = await getWeb3()
  const contract = CrowdFundContract(this.props.match.params.address);

}

  render() {
    const { address } = this.props.match.params;
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
