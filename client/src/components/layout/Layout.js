import React from 'react';
import { Container } from 'semantic-ui-react';
import { HeaderOne, HeaderTwo } from './Headers';

function Header(props) {
  if (props.header === "HeaderOne"){
    return (
      <Container>
        <HeaderOne/>
        {props.children}
        <h1>I'm a footer</h1>
      </Container>
    )
  }
  return(
    <Container>
      <HeaderTwo/>
      {props.children}
      <h1>I'm a footer</h1>
    </Container>
  )
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
