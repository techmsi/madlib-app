export default class Templater {
  constructor(text) {
    this.text = text;
    this.reTpl = /{(.*?)}/g;
    this.rePuncAndSpaces = /{?\w+}?|[\.\-,\?]/gm;
  }

  getTplRe(){
    return this.reTpl;
  }

  countBlanks() {
    const { reTpl, text } = this;
    return text.match(reTpl).length;
  }

  isBlank(substring){
    const { reTpl } = this;
    return reTpl.test(substring)
  }

  wordArray(){
    const { rePuncAndSpaces, text } = this;
    return text.match(rePuncAndSpaces);
  }

}
