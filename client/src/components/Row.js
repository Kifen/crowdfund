import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import CrowdFundContract from '../utils/crowdfund';
import getWeb3 from '../utils/getWeb3';

class Row extends Component {

  onApprove = async () => {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    const contract = await CrowdFundContract(this.props.address);
    await contract.methods.approveRequest(this.props.index).send({from: accounts[0]})
    this.props.refreshTable();
  }

  onFinalize = async () => {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    const contract = await CrowdFundContract(this.props.address);
    await contract.methods.finalizeRequest(this.props.index).send({from: accounts[0]})
    this.props.refreshTable();
  }

  render() {
    const { index, desc, amount, recipient, approvalCount, contributorsCount, address, complete } = this.props;
    const ready = approvalCount > contributorsCount/2;
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
}

export default Row
