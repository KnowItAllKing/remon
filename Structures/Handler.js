const { promises } = require('fs');
const { resolve } = require('path');

const { readdir } = promises;

const { Collection } = require('discord.js');

class Handler {
  constructor(client, path = './', commandPath, eventPath) {
    this.client = client;

    this.path = path;

    this.commands = new Collection();

    this.loadCommands();
    this.loadEvents();
  }

  async loadCommands(dir = 'Commands') {
    const resolved = resolve(this.path, dir);

    const unfiltered = await readdir(resolved),
      commands = unfiltered
        .filter(f => f.endsWith('.js'))
        .map(x => `${resolved}/${x}`)
        .map(require);

    for (const command of commands) {
      this.commands.set(command.name, command);
    }
  }

  async loadEvents(dir = 'Events') {
    const resolved = resolve(this.path, dir);

    const unfiltered = await readdir(resolved),
      events = unfiltered
        .filter(f => f.endsWith('.js'))
        .map(x => `${resolved}/${x}`)
        .map(require);

    for (const event of events) {
      this.client.on(event.name, (...args) =>
        event.execute(this.client, ...args)
      );
    }
  }

  getCommand(command) {
    return this.commands.get(command);
  }
  isCommand(command) {
    return this.commands.has(command);
  }
  get commandMap() {
    return this.commands.map(({ name, description }) => ({
      name,
      description
    }));
  }
}

module.exports = { Handler };
