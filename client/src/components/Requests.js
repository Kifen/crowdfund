import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';
import Row from './Row';
import CrowdFundContract from '../utils/crowdfund';
import getWeb3 from '../utils/getWeb3';

class Requests extends Component {
constructor(props){
  super(props)
  this.state = {
    desc: [],
    amount: [],
    recipient: [],
    complete: [],
    approvalCount: [],
    contributorsCount: '',
    address: ''
  }
  this.getRequests = this.getRequests.bind(this);
  this.renderRows = this.renderRows.bind(this);
}

async getRequests() {
  let arr = []
  const web3 = await getWeb3()
  const contract = await CrowdFundContract(this.props.match.params.address);
  const requestCount = await contract.methods.getRequestsCount().call();

  for (let i= 0; i < requestCount; i++){
      arr.push(i)
  }

  this.setState({web3: web3, contract: contract})
  const contributorsCount = await contract.methods.contributorsCount().call();
  const requests = await contract.methods.getRequests(arr).call();
  //console.log(requests);
  this.setState({
    desc: requests[0],
     amount: requests[1],
     recipient: requests[2],
     complete: requests[3],
     approvalCount: requests[4],
     contributorsCount: contributorsCount
   });
}

renderRows() {
  return this.state.desc.map((desc, index) => {
        const amount = this.state.web3.utils.fromWei(this.state.amount[index], 'ether');
        const recipient = this.state.recipient[index];
        const complete = this.state.complete[index];
        const approvalCount = this.state.approvalCount[index];
            return  <Row key={index}
                    index={index}
                    desc={desc}
                    amount={amount}
                    recipient={recipient}
                    approvalCount={approvalCount}
                    contributorsCount={this.state.contributorsCount}
                    complete={complete}
                    address={this.props.address}
                    refreshTable={this.getRequests}
                    address={this.props.match.params.address}
                  />;
  });
}

componentDidMount() {
  this.getRequests()
}

  render() {
    const { address } = this.props.match.params;
    return(
      <Layout header={'HeaderOne'}>
      <Link to={`/campaigns/${address}/requests/new`}>
        <a>
          <Button content='Add Request'
          primary icon='add circle'
          labelPosition='right'
          floated='right'
          style={{marginBottom: 10}}/>
        </a>
      </Link>
      <Table celled>
        <Table.Header>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Recipient</Table.HeaderCell>
          <Table.HeaderCell>Approval Count</Table.HeaderCell>
          <Table.HeaderCell>Approve</Table.HeaderCell>
          <Table.HeaderCell>Finalize</Table.HeaderCell>
        </Table.Header>
        <Table.Body>{this.renderRows()}</Table.Body>
      </Table>
      </Layout>
    )
  }

}

export default Requests
