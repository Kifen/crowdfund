import React, { Component } from 'react';
import { Menu, Button, Segment } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';


export default class Headers extends Component{
  constructor(props) {
    super(props)

    this.state = {
      activeMenu: ''
    }

    this.renderHeader = this.renderHeader.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.headerOne = this.headerOne.bind(this);
    this.headerTwo = this.headerTwo.bind(this);
  }

  renderHeader = (props) => {
    if (props.header === "HeaderOne"){
      return <div>{this.headerOne(props.active)}</div>
    }
    return <div>{this.headerTwo(props.active)}</div>
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeMenu: name, page: name })
  }

  headerOne = (active) => {
    return(
      <Menu style={{ marginTop: '10px', marginBottom: '10px' }}>

        <Link to='/campaigns'>
          <a>
          <Menu.Item name='crowdfund'
           active={active === 'crowdfund'}
           onClick={this.handleItemClick}
          >
          CrowdFund
          </Menu.Item>
          </a>
        </Link>

        <Menu.Menu position='right'>

        <Link to='/campaigns'>
          <a>
          <Menu.Item name='campaigns'
          active={active === 'campaigns'}
          onClick={this.handleItemClick}
          >
          Campaigns
          </Menu.Item>
          </a>
        </Link>

        <Link to='/campaigns/new'>
          <a>
          <Menu.Item icon='add circle' name='create'
          primary
          active={active === 'create'}
          onClick={this.handleItemClick}/>
          </a>
        </Link>

        </Menu.Menu>
      </Menu>
    )
  };

  headerTwo = (active) => {
    return(
      <Menu style={{ marginTop: '10px'}}>

        <Link to='/campaigns'>
          <a>
          <Menu.Item name='crowdfund'
           active={active === 'crowdfund'}
           onClick={this.handleItemClick}
          >
          CrowdFund
          </Menu.Item>
          </a>
        </Link>

        <Menu.Menu position='right'>

        <Link to='/campaigns'>
          <a>
          <Menu.Item name='campaigns'
          active={active === 'campaigns'}
          onClick={this.handleItemClick}
          >
          Campaigns
          </Menu.Item>
          </a>
        </Link>
        </Menu.Menu>
      </Menu>
    )
  };

  render() {
    return(
      <div>
        {this.renderHeader(this.props)}
      </div>
    )
  }
}
