import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import CrowdFundContract from '../utils/crowdfund';
import getWeb3 from '../utils/getWeb3';

class Row extends Component {

  async onApprove() {
    const web3 = await getWeb3()
    const [account] = await web3.eth.getAccounts()
    const contract = await CrowdFundContract(this.state.address);
    console.log(contract);
    await contract.methods.approveRequest(this.state.index).send({from: account})
    this.props.refreshTable();
  }

  async onFinalize() {
    const web3 = await getWeb3()
    const [account] = await web3.eth.getAccounts()
    const contract = await CrowdFundContract(this.state.address);
    console.log(contract);
    await contract.methods.approveRequest(this.state.index).send({from: account})
    this.props.refreshTable();
  }

  renderRow(index, desc, amount, recipient, approvalCount, contributorsCount, address, complete, ready) {
    let state = this.state
    return(
      <Table.Row disabled={complete} positive={ready && !complete}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{desc}</Table.Cell>
        <Table.Cell>{amount}</Table.Cell>
        <Table.Cell>{recipient}</Table.Cell>
        <Table.Cell>{approvalCount}/{contributorsCount}</Table.Cell>
        <Table.Cell>
        {complete ? null : (
          <Button color="green" basic onClick={this.onApprove}>Approve</Button>
        )}
        </Table.Cell>
        <Table.Cell>
        {complete ? null : (
          <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>
        )}  
        </Table.Cell>
      </Table.Row>
    )
  }

  render() {
    const { index, desc, amount, recipient, approvalCount, contributorsCount, address, complete } = this.props;
    const ready = approvalCount > approvalCount/2;
    return this.renderRow(index, desc, amount, recipient, approvalCount, contributorsCount, address, complete, ready)
  }
}

export default Row
