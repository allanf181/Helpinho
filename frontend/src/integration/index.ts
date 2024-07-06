import axios from 'axios';

export class Integration {
  URL: string;
  constructor(sufix: string) {
    this.URL = `http://localhost:3000/dev/${sufix}`;
  }

  async getMany() {
    return await axios.get(this.URL);
  }
}
