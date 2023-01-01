class Templater {
  constructor(text) {
    this.text = text;
    this.blankRegex = /{(.*?)}/g;
    this.punctuationAndSpacesRegex = /{?\w+}?|[\.\-,\?]/gm;
  }

  getTemplateRegex() {
    return this.blankRegex;
  }

  countBlanks() {
    const { blankRegex, text } = this;

    return text.match(blankRegex).length;
  }

  getBlanks() {
    const { blankRegex, text } = this;

    return text.match(blankRegex);
  }

  isBlank(substring) {
    const { blankRegex } = this;

    return blankRegex.test(substring);
  }

  wordArray() {
    const { punctuationAndSpacesRegex, text } = this;

    return text.match(punctuationAndSpacesRegex).map((word) => ({
      text: word,
      blank: this.isBlank(word),
      strippedWord: word.replace(this.blankRegex, '$1'),
    }));
  }
}

exports.Templater = Templater;
