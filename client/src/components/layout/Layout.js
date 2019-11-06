import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';


export default (props) => {
  return (
    <Container>
      <Header header={props.header} active={props.active}/>
      {props.children}
    </Container>
  )
};
