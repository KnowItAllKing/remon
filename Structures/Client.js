const { Client } = require('discord.js');

const { Handler } = require('./Handler');

class RemonClient extends Client {
  constructor(options) {
    super();
    this._options = options;

    this._init();
  }

  _init() {
    this.handler = new Handler(this);
  }

  start() {
    this.login(this._options.token);
  }
}

module.exports = { RemonClient };
