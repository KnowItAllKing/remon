module.exports = {
  name: 'message',
  prefix: 'r.',

  async execute(client, message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(this.prefix)) return;
    if (!message.guild) return;

    const args = message.content
      .trim()
      .slice(this.prefix.length)
      .split(/ +/g);

    if (!args.length) return;

    const command = args.shift().toLowerCase();

    const cmd = client.handler.getCommand(command);

    if (!cmd) return;

    cmd.execute(client, message, args);
  }
};
