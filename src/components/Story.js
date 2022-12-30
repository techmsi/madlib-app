import React, { Component } from 'react';

// Stories consist of words & blanks
import { BlankSpace, WordSpace } from 'components/Blank';

const Missing = ({ missing }) => {
  return missing === 0 ? null : <span className="count">{missing}</span>;
};

export default class Story extends Component {
  state = {
    remaining: new Set(),
    data: [],
  };

  async componentDidMount() {
    this.onLoad();
  }

  async onLoad() {
    try {
      const data = await this.props.api.get('story');
      console.table(data.words);
      this.setState({ data });

      return data;
    } catch (error) {
      console.log('Load API Error', error);
    }
  }

  onEdit = (id, command) => {
    const { remaining } = this.state;

    if (command === 'add') {
      remaining.add(id);
    } else {
      remaining.delete(id);
    }

    this.setState({ remaining });
  };

  render() {
    const { remaining, data } = this.state;
    const { words = [], blanks = [] } = data || {};
    const missing = blanks?.length - remaining.size;

    if (words?.length === 0) {
      return <div className="spinner" />;
    }

    return (
      <>
        {words?.map(({ blank, strippedWord, text }, i) =>
          blank ? (
            <BlankSpace
              key={`missing-${strippedWord}-${i}`}
              id={`missing-${strippedWord}-${i}`}
              partOfSpeech={strippedWord}
              onEdit={this.onEdit}
            />
          ) : (
            <WordSpace key={`word-${i}`} text={text} missing={missing} />
          )
        )}
        <Missing missing={missing} />
      </>
    );
  }
}
