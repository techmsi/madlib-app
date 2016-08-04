import React, { Component } from 'react';

export default class Words extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (<span>{this.props.children}</span>);
  }
}
