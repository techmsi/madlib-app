import React, { Component } from 'react';

const clean = (input) => input.replace(/[^A-Za-z]/gi, '');

export const WordSpace = ({ text, missing }) => {
  return missing === 0 ? <span className="word">{text}</span> : null;
};

export const BlankSpace = ({ partOfSpeech, onEdit, id }) => {
  return <Blank id={id} type={partOfSpeech} onEdit={onEdit} />;
};

export default class Blank extends Component {
  state = {
    editing: true,
    valueEntered: '',
  };

  onSubmit = ({ target: { value }, keyCode }) => {
    const { onEdit, id } = this.props;
    // Remove non-alpha characters from value
    const isNotBlank = value.length;

    if (keyCode === 13) {
      this.setState({
        valueEntered: isNotBlank ? clean(value) : '',
        editing: false,
      });
      // Call Story(<- parent component) method
      onEdit(id, isNotBlank ? 'add' : null);
    }
  };

  onFocus = ({ target }) => {
    const { valueEntered } = this.state;

    if (valueEntered) {
      target.value = valueEntered;
    }
  };

  edit = () => {
    this.setState({ editing: true });
  };

  render() {
    const { editing, valueEntered } = this.state;
    const { type, id } = this.props;

    return (
      <span data-type={type}>
        {editing ? (
          <input
            id={id}
            aria-label={`Enter the missing ${type}`}
            type="text"
            autoFocus
            placeholder={type}
            onFocus={this.onFocus}
            onKeyDown={this.onSubmit}
          />
        ) : (
          <em className="blank" onClick={this.edit}>
            {valueEntered}
          </em>
        )}
      </span>
    );
  }
}
