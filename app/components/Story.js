import React, { Component } from 'react';
import classNames from 'classnames';

// Parses text template with placeholders
import Templater from '../utils/Templater';
import Api from '../utils/Api';

// Stories consist of words & blanks
import Blank from './Blank';
import Words from './Words';

export default class Story extends Component {
  constructor(props){
    super(props);

    this.api = new Api('http://localhost:3000');
    this._setupParser(`Do you {verb} your {adjective} {noun} {adverb}?`);

    this.state = {
      remaining: new Set(),
      data: []
    }
  }

  componentWillMount(){
    this._loadData();
  }

  _loadData(){
    // get from server
    this.api.get('/story')
    .then(data => {
      this._setupParser(data.story);
      this.setState({ data: data.story });
    }).catch(e => {console.log('Error', e)})
  }

  _setupParser(text){
    this.parser = new Templater(text);
    this.reTpl = this.parser.getTplRe();
    this.wordArray = this.parser.wordArray();
    this.BLANKS = this.parser.countBlanks();
  }

  _isDone(id, command) {
    const { remaining } = this.state;

    if(command === 'add'){
      remaining.add(id);
    }
    else {
      remaining.delete(id);
    }

    this.setState({ remaining });

  }

  renderBlank(text, i) {
    const strippedWord = text.replace(this.reTpl, '$1');
    return (<Blank key={`missing-${strippedWord}-${i}`} id={`missing-${strippedWord}-${i}`} type={strippedWord} onEdit={this._isDone.bind(this)} />);
  }

  renderWord(text, i) {
    const { remaining } = this.state;

    return this.BLANKS === remaining.size ? (<Words key={`word-${i}`}>{text}</Words>) : null;
  }

  render() {
    const { wordArray, parser, BLANKS } = this;
    const { remaining, data } = this.state;
    let missing = BLANKS - remaining.size;

    return ( <div>
      {wordArray.map((w, i) => parser.isBlank(w) ? this.renderBlank(w,i) : this.renderWord(w,i))}
      { missing  === 0 ? null : <span id="count">{missing}</span>}
      </div>)
  }
}
