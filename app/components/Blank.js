import React, { Component } from 'react';

export default class Blank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: true,
      valueEntered: ''
    };
  }

  _setValue(event) {
    // Remove non-alpha characters from value
    const clean = input => input.replace(/[^A-Za-z]/gi, '');
    const isNotBlank = event.target.value.length;

    if(event.keyCode === 13) {  //Enter
      this.setState({
        valueEntered: isNotBlank ? clean(event.target.value): '',
        editing: false
      });
      // Call Story(<- parent component) method
      this.props.onEdit(this.props.id, isNotBlank ? 'add': null);
    }
  }

  _getValue(event){
    const { valueEntered } = this.state;

    if(valueEntered) {
      event.target.value = valueEntered
    }
  }

  _edit() {
    this.setState({ editing: true });
  }

  _renderEditField() {
    const { type, id } = this.props;

    return (<input
              id={id}
              type="text"
              autoFocus
              placeholder={type}
              onFocus={this._getValue.bind(this)}
              onKeyDown={this._setValue.bind(this)} />);
  }

  _renderValue() {
    const { valueEntered } = this.state;

    return (<em className="blank" onClick={this._edit.bind(this)}>{valueEntered}</em>);
  }

  render() {
    const { editing } = this.state;
    const { type } = this.props;

    return (
      <span data-type={type}>
      { editing ? this._renderEditField() : this._renderValue() }
      </span>
    );
  }
}
