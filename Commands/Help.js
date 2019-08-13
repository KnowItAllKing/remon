const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Help command',

  async execute(client, message, args) {
    const commands = client.handler.commandMap;

    const embed = new MessageEmbed()
      .setAuthor(
        'Help | ' + message.author.tag,
        message.author.displayAvatarURL()
      )
      .setDescription(
        commands.map(x => `\`${x.name}\` - ${x.description}`).join('\n')
      )
      .setColor('#6E88C1');
    message.channel.send(embed);
  }
};
