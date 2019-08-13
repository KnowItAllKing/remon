const { MessageEmbed } = require('discord.js');

const regionMap = {
  brazil: 'Brazil',
  'us-west': 'US West',
  japan: 'Japan',
  singapore: 'Singapore',
  'eu-central': 'Central Europe',
  hongkong: 'Hong Kong',
  'us-south': 'US South',
  southafrica: 'South Africa',
  'us-central': 'US Central',
  london: 'London',
  'us-east': 'US East',
  sydney: 'Sydney',
  'eu-west': 'Western Europe',
  amsterdam: 'Amsterdam',
  frankfurt: 'Frankfurt',
  russia: 'Russia'
};

module.exports = {
  name: 'serverinfo',
  description: 'View server info',

  async execute(client, message, args) {
    const userCount = message.guild.members.filter(m => !m.user.bot).size;

    const embed = new MessageEmbed()
      .setAuthor(
        `Server Info | ${message.author.tag}`,
        message.author.displayAvatarURL()
      )
      .addField('Name', message.guild.name, true)
      .addField('ID', message.guild.id, true)
      .addField('Owner', message.guild.owner.user.tag, true)
      .setImage(message.guild.iconURL({ size: 64 }))
      .addField('Region', regionMap[message.guild.region], true)
      .addField('Member Count', message.guild.memberCount, true)
      .addField(
        'Total | Humans | Bots',
        `${message.guild.memberCount} | ${userCount} | ${message.guild
          .memberCount - userCount}`
      )
      .addField('Roles', message.guild.roles.size);

    message.channel.send(embed);
  }
};
