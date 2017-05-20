import React, { Component } from 'react';

export default class Words extends Component {
  render () {
    return (<span>{this.props.children}</span>);
  }
}
