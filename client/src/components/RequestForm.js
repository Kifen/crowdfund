import React, { Component } from 'react';
import { Form, Input, Button, Message, Header } from 'semantic-ui-react';
import CrowdFundContract from '../utils/crowdfund';
import getWeb3 from '../utils/getWeb3';
import Layout from './layout/Layout';
import { Link } from 'react-router-dom';
import Notification from './Notification'

class RequestForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      errorMsg: "",
      amount: "",
      recipient: "",
      desc: "",
      loading: false,
      visible: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.notify = this.notify.bind(this);
  }

  notify() {
    this.setState({visible: false})
  }

  async onSubmit(e) {
    this.setState({loading: true, errorMsg: "", visible: false})
    e.preventDefault()
    try {
      const web3 = await getWeb3();
      const [account] = await web3.eth.getAccounts();
      const contract = await CrowdFundContract(this.props.match.params.address);
      console.log(contract);
      await contract.methods.createRequest(this.state.desc,
         web3.utils.toWei(this.state.amount, 'ether'),
          this.state.recipient).send({from: account})
    } catch(err) {
      this.setState({errorMsg: err.message, loading: false})
    }
    this.setState({loading: false, desc: "", amount: "",recipient: "", visible: true})
  }

  render(){
    return(
      <Layout header={"HeaderOne"}>
      <Header as='h3' block>Create a Request</Header>
        <Notification visible={this.state.visible} dismiss={this.notify}/>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
          <Form.TextArea
            label='Description'
            placeholder='What is your request?'
            value={this.state.desc}
            onChange={event => this.setState({desc: event.target.value})}
            />

            <Form.Field>
              <label>Amount</label>
              <Input
                value={this.state.amount}
                label='ether'
                labelPosition='right'
                onChange={event => this.setState({amount: event.target.value})}
              />
            </Form.Field>

            <Form.Field>
              <label>Recipent Address</label>
              <Input
                value={this.state.recipient}
                placeholder='addess'
                onChange={event => this.setState({recipient: event.target.value})}
              />
            </Form.Field>
          <Message error header='Oops!' content={this.state.errorMsg}/>
          <Button loading={this.state.loading} type='submit' primary>Request!</Button>
        </Form>
      </Layout>
    )
  }
}

export default RequestForm
