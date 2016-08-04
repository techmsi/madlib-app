const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.use(express.static('public'));

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }

  console.log(`Server is listening on ${port}`);
});

app.get('/story', (req,res) => {
  res.json({
    story: "Do you {verb} your {adjective} {noun} {adverb}?"
  });
});

module.exports = app;
