import React, { Component, useEffect, useState } from 'react';

// Stories consist of words & blanks
import { BlankSpace, WordSpace } from 'components/Blank';
import ErrorBoundary, { useAsyncError } from 'components/ErrorBoundary';

const Missing = ({ missing }) => {
  return missing === 0 ? null : (
    <span data-testid="missing" className="count">
      <b>{missing}</b>
    </span>
  );
};

class Words extends Component {
  state = {
    remaining: new Set(),
  };

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
    const { remaining } = this.state;
    const { words = [], blanks = [] } = this.props.data || {};
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

const WordDisplay = ({ api }) => {
  const [data, setData] = useState(null);
  const throwError = useAsyncError();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get('api/story');
      setData(data);
    };

    fetchData().catch((e) => {
      throwError(e);
    });
  }, []);

  return <Words data={data} />;
};

const Story = ({ api }) => {
  return (
    <ErrorBoundary>
      <WordDisplay api={api} />
    </ErrorBoundary>
  );
};

export default Story;
