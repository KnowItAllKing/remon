const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'eval',
  description: 'A public eval command',

  blocked: [
    'require(',
    '.token',
    'client.',
    'module.',
    'delete',
    'process.',
    './',
    '.leave'
  ],

  async execute(client, message) {
    const args = message.content.trim().slice(7);
    if (message.author.id !== client._options.owner)
      return message.channel.send('Error: This command is owner-only for now.');
    if (!args.startsWith('```js'))
      return message.channel.send(
        "Error: Eval commands must use a codeblock tagged with Javascript. \nExample: \nr.eval ```js\nmessage.channel.send('test');\n```"
      );
    const filter = text =>
      this.blocked.some(c => text.toLowerCase().includes(c));

    const parseCodeBlock = text =>
      text
        .replace('```js\n', '')
        .replace('\n```', '')
        .replace('```', '')
        .replace('\n', '; ')
        .replace(';;', ';')
        .replace(".send('", ".send('This is an evaled message: ");

    const code = parseCodeBlock(args);

    if (message.author.id !== client._options.owner && filter(code))
      return message.channel.send('Nope');

    let evaled;
    let error;
    const start = Date.now();
    try {
      evaled = await eval(code);
    } catch (e) {
      error = e;
    }

    const embed = new MessageEmbed()
      .setAuthor(
        `Help | ${message.author.tag}${
          message.author.id === client._options.owner ? ' (Owner Access)' : ''
        }`,
        message.author.displayAvatarURL()
      )
      .addField(':pencil2: Input', `\`\`\`js\n${code}\n\`\`\``)
      .addField(
        error ? ':x: Error' : ':notepad_spiral: Output',
        `\`\`\`\n${error || evaled}\n\`\`\``
      )
      .setFooter(`Executed in ${Date.now() - start} ms`)
      .setColor(error ? '#FF0000' : '#00AA55');

    message.channel.send(embed);
  }
};
