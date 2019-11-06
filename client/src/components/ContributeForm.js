import React, { Component} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import CrowdFundContract from '../utils/crowdfund';
import getWeb3 from '../utils/getWeb3';
import { Redirect } from 'react-router-dom'


class ContributeForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      pledge: "",
      loading: false,
      errMsg: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.setPledge = this.setPledge.bind(this);
  }

  setPledge(e) {
    this.setState({pledge: e.target.value});
  }

  onSubmit = async event => {
    this.setState({loading: true, errMsg: ""});
    event.preventDefault()

    try {
      const web3 = await getWeb3()
      const contract = await CrowdFundContract(this.props.address);
      const [account] = await web3.eth.getAccounts()
      await contract.methods.contribute().send({
        from: account, gas: '1000000', value: web3.utils.toWei(this.state.pledge, 'ether')
      });
    } catch(err) {
      this.setState({errMsg: err.message});
    }
      this.setState({loading: false, pledge: ""});
      this.props.updatecampaign()
    };

  render() {
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errMsg} >
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.pledge}
            onChange={this.setPledge}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header='Oops!' content={this.state.errMsg}/>
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    )
  }
}

export default ContributeForm
