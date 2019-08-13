module.exports = {
  name: 'say',
  description: 'View server info',

  async execute(client, message, args) {
    const say = message.content.trim().slice(6);

    return message.channel.send(say);
  }
};
