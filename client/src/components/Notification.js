import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class Notification extends Component {
  constructor(props) {
    super(props)
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss = () => {
    this.props.dismiss();
}

  render() {
    const isVisible = this.props.visible
    console.log(isVisible);
    if (isVisible) {
      return(
        <Message info onDismiss={this.handleDismiss} color='green'>
          <Message.Header>Request Created!</Message.Header>
          <p>Your request has been created, it will be reviewed by all donors to your campaign.</p>
        </Message>
      )
    }
    return (null);
  }
}

export default Notification
