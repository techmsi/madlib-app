export default class Api {
  constructor(host) {
    this.host = host;
  }
  async get(url) {
    try {
      const response = await fetch(`${this.host}/${url}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log('Fetch API Error', error.message);
      throw error;
    }
  }
}
