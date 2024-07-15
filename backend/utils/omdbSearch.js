const fetch = require('node-fetch');

const logger = require('./logger');

class OMDBSearch {
  constructor(searchStr) {
    this.optionsStr = `s=${searchStr.replace(' ', '+')}`;
  }

  year(year) {
    this.optionsStr = `${this.optionsStr}&y=${year}`;

    return this;
  }

  page(pageNum) {
    this.optionsStr = `${this.optionsStr}&page=${pageNum}`;

    return this;
  }

  async send() {
    const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&${this.optionsStr}&type=movie&r=json`;
    logger.info(`sending omdb search: ${url}`);
    return await (await fetch(url)).json();
  }
}

module.exports = OMDBSearch;
