import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';


export default class Headers extends Component{
  constructor(props) {
    super(props)

    this.state = {
      activeMenu: '',
      page: ''
    }

    this.renderHeader = this.renderHeader.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.headerOne = this.headerOne.bind(this);
    this.headerTwo = this.headerTwo.bind(this);
  }

  renderHeader = (header) => {
    if (header === "HeaderOne"){
      return <div>{this.headerOne()}</div>
    }
    return <div>{this.headerTwo()}</div>
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeMenu: name, page: name })
  }

  headerOne = () => {
    return(
      <Menu style={{ marginTop: '10px' }}>
        <Menu.Item name='crowdfund'
         active={this.state.activeMenu === 'crowdfund'}
         onClick={this.handleItemClick}
        >
        CrowdFund
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item name='campaigns'
          active={this.state.activeMenu === 'campaigns'}
          onClick={this.handleItemClick}
          >
          Campaigns
          </Menu.Item>
          <Menu.Item icon='add circle' primary>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  };

  headerTwo = () => {
    return(
      <Menu style={{ marginTop: '10px' }}>
      <Menu.Item name='crowdfund'
       active={this.state.activeMenu === 'crowdfund'}
       onClick={this.handleItemClick}
      >
        CrowdFund
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item name='campaigns'
          active={this.state.activeMenu === 'campaigns'}
          onClick={this.handleItemClick}
          >
          Campaigns
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  };

  render() {
    return(
      <div>
        {this.renderHeader(this.props.header)}
      </div>
    )
  }
}
