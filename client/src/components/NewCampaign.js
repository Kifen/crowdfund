import React, { Component} from 'react';
import Layout from './layout/Layout';
import { Button, Form, Header, Input, Message } from 'semantic-ui-react';
import Factory from '../utils/factory';
import getWeb3 from '../utils/getWeb3';

class NewCampaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minimumPledge: '',
      errorMsg : '',
      loading: false
    }
    this.setPledge = this.setPledge.bind(this);
    this.createCampaign = this.createCampaign.bind(this);
  }

setPledge(e) {
  this.setState({minimumPledge: e.target.value});
}

createCampaign = async (e) => {
  this.setState({loading: true, errorMsg: ""});
  e.preventDefault();
  const web3 = await getWeb3();
  const factory = await Factory();
  try {
    const [account] = await web3.eth.getAccounts();
    await factory.methods.createCampaign(this.state.minimumPledge)
    .send({from: account});
  }catch(err){
    this.setState({errorMsg: err.message});
  }
  this.setState({loading: false});
};

  render(){
    return(
      <div>
        <Layout header={"HeaderTwo"}>
       <Header as='h2' icon='bullhorn' content='Create a Campaign' />
          <Form onSubmit={this.createCampaign} error={!!this.state.errorMsg}>
            <Form.Field>
              <label>Minimum Pledge</label>
              <Input
                label='wei'
                labelPosition='right'
                value={this.state.minimumPledge}
                onChange={this.setPledge}
              />
            </Form.Field>
            <Message error header='Oops!' content={this.state.errorMsg}/>
            <Button loading={this.state.loading} type='submit' primary>Create!</Button>
          </Form>
        </Layout>
      </div>
    )
  }
}

export default NewCampaign
