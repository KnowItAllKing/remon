const { MessageEmbed } = require('discord.js');

const statusMap = {
  online: 'Online',
  idle: 'away',
  offline: 'Offline/Invisible',
  dnd: 'Do Not Disturb'
};

module.exports = {
  name: 'userinfo',
  description: 'Displays user info',

  async execute(client, message, args) {
    const mentioned =
      message.mentions.users.first() || client.users.get(args[0]);

    const embed = new MessageEmbed()
      .setAuthor(`User Info | ${message.author.tag}`)
      .addField('Name', mentioned ? mentioned.tag : message.author.tag, true)
      .addField('ID', mentioned ? mentioned.id : message.author.id, true)
      .addField(
        'Nickname',
        mentioned
          ? mentioned.nickname
            ? message.nickname
            : 'None'
          : message.member.nickname
          ? message.member.nickname
          : 'None',
        true
      )
      .addField('Status', statusMap[message.author.presence.status])
      .setImage(message.author.displayAvatarURL({ size: 64 }));

    return message.channel.send(embed);
  }
};
