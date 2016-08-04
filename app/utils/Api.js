import fetch from 'isomorphic-fetch';

export default class Api {
  constructor(host) {
    this.host = host;
  }
  get(url){
    return fetch(`${this.host}${url}`).then( resp => {
      let json = resp.json();

      return (resp.ok) ? json: json.then(err => {throw err});
    })
    .catch(err =>  { console.log('Fetch API Error', err); });
  }
}
