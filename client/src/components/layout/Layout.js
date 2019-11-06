import React from 'react';
import { Container } from 'semantic-ui-react';
import { HeaderOne, HeaderTwo } from './Headers';
import Header from './Header';


export default (props) => {
  return (
    <Container>
      <Header header={props.header} active={props.active}/>
      {props.children}
      <h1>I'm a footer</h1>
    </Container>
  )
};
