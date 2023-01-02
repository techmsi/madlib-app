const fetch = require('cross-fetch');
const { Lexer, Tagger } = require('fast-tag-pos');
const definitions = require('./definitions.json');

const parseText = (partOfSpeechTaggedWords) => {
  const words = partOfSpeechTaggedWords.map(([word, tag]) => {
    const hasTags = ['VB', 'NN', 'RB', 'JJ'].includes(tag);

    return {
      text: word,
      blank: hasTags,
      pos: hasTags ? definitions[tag] : {},
      strippedWord: hasTags ? definitions[tag].shortname.toLowerCase() : word,
    };
  });
  const blanks = words.filter(({ blank }) => !!blank);

  return { words, blanks };
};

exports.handler = async function (event, context) {
  const lexer = new Lexer();
  const tagger = new Tagger();

  if (event.path === '/')
    return {
      statusCode: 200,
      body: 'Welcome to the madlibs api.',
    };

  if (event.path === '/api/story') {
    try {
      const story = 'Do you play your electric guitar loudly?';
      const contentToWords = lexer.lex(story);
      const taggedWords = tagger.tag(contentToWords);
      const { words, blanks } = parseText(taggedWords);

      return {
        statusCode: 200,
        body: JSON.stringify({ content: story, words, blanks }),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }

  if (event.path === '/api/story/joke') {
    try {
      const response = await fetch('https://icanhazdadjoke.com', {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        return { statusCode: response.status, body: response.statusText };
      }
      const { joke } = await response.json();

      const contentToWords = lexer.lex(joke);
      const taggedWords = tagger.tag(contentToWords);
      const { words, blanks } = parseText(taggedWords);

      return {
        statusCode: 200,
        body: JSON.stringify({ content: joke, words, blanks }),
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message }),
      };
    }
  }
};
