import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

export const HeaderOne = () => {
  return(
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item name='crowdfund'>
      CrowdFund
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item name='campaigns'>
        Campaigns
        </Menu.Item>
        <Menu.Item icon='add circle' primary>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
};

export const HeaderTwo = () => {
  return(
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item name='crowdfund'>
      CrowdFund
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item name='campaigns'>
        Campaigns
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
};
