const { config } = require('dotenv');

const { RemonClient } = require('./Structures/Client');

config();

const client = new RemonClient({
  token: process.env.TOKEN,
  owner: '517016133694521374'
});

client.start();
