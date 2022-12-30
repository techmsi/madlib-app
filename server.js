const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const { Templater } = require('./src/utils/Templater');

app.use(cors());
app.use(express.static('public'));

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }

  console.log(`Server is listening on ${port}`);
});

app.get('/api', (req, res) => {
  res.send('Welcome to the madlibs api.');
});

const parseText = (text) => {
  const parser = new Templater(text);
  const words = parser.wordArray();
  const blanks = parser.getBlanks();

  return { words, blanks };
};

app.get('/api/story', (req, res) => {
  const story = 'Do you {verb} your {adjective} {noun} {adverb}?';
  const { words, blanks } = parseText(story);

  res.json({
    words,
    blanks,
  });
});

module.exports = app;
