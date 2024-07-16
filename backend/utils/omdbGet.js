const fetch = require('node-fetch');

const logger = require('./logger');

class OMDBGet {
  constructor() {
    this.optionsStr = '';
  }

  imdbID(id) {
    this.optionsStr = `${this.optionsStr}&i=${id}`;

    return this;
  }

  title(title) {
    this.optionsStr = `${this.optionsStr}&t=${title.replace(' ', '+')}`;

    return this;
  }

  year(year) {
    this.optionsStr = `${this.optionsStr}&y=${year}`;

    return this;
  }

  plot(plot) {
    this.optionsStr = `${this.optionsStr}&plot=${plot}`;

    return this;
  }

  async send() {
    const url = `https://www.omdbapi.com/?${this.optionsStr}&type=movie&r=json&apikey=${process.env.OMDB_API_KEY}`;
    logger.info(`sending ombd get: ${url}`);
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    logger.info(`omdb get response status: ${response.status}`);
    const data = await response.json();
    logger.info(`omdb get response data: ${JSON.stringify(data)}`);
    return data;
  }
}

module.exports = OMDBGet;
