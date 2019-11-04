import React from 'react';
import { Container } from 'semantic-ui-react';
import { HeaderOne, HeaderTwo } from './Headers';

function Header(props) {
  if (props.header === "HeaderOne"){
    return <HeaderOne/>
  }
  return <HeaderTwo/>
}

export default (props) => {
  return (
    <Container>
      <Header header={props.header}/>
      {props.children}
      <h1>I'm a footer</h1>
    </Container>
  )
};
