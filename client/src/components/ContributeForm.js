import React, { Component} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import CrowdFundContract from '../utils/crowdfund';
import getWeb3 from '../utils/getWeb3';


class ContributeForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: "",
      loading: false,
      errMsg: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async event => {
    this.setState({loading: true, errMsg: ""});
    e.preventDefault()

    try {
      const web3 = await getWeb3()
      const contract = await CrowdFundContract(this.props.address);
      const [account] = await web3.eth.getAccounts()
      await web3.methods.contribute().send({
        from: account, gas: '1000000', value: web3.utils.toWei(this.state.value, 'ether')
      });
    }catch(err) {
      this.setState({errorMsg: err.message});
    }
    this.setState({loading: false});
  };

  render() {
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg} >
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event  => this.setState({value: event.target.value})}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header='Oops!' content={this.state.errorMsg}/>
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    )
  }
}

export default ContributeForm
