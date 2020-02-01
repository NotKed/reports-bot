const Discord = require('discord.js');
require('dotenv').config();

module.exports = class apply {
  constructor() {
    this.name = 'report',
    this.usage = `${process.env.PREFIX}report [username] [evidence] [reason]`,
    this.alias = []
  }

   run(bot, message, args) {
    if(args.length < 3) return message.author.send(this.usage);
    var username = args[0];
    var evidence = args[1];
    var reason = args.splice(2);

    var embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}'s report on "${username}"`)
    .setColor(0xCB5BFF)
    .addField('Evidence', evidence)
    .addField('Reason', reason)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp();

    message.guild.channels.get(process.env.CHANNEL).send(embed)
    .then(async (msg) => {
      await msg.react('✅');
      await msg.react('❎');

      const filter = (reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❎'
      const collector = msg.createReactionCollector(filter, { time: 2 * 24 * 60 * 60 * 1000 });
      await collector.on('collect', r => {
        if(r.users.last().username == 'Reports') return;
        if(r.emoji.name === '✅') { collector.stop(); return message.author.send(`Your report on ${username} has been accepted by ${r.users.last().username}!`); }
        if(r.emoji.name === '❎') { collector.stop(); return message.author.send(`Your report on ${username} has been denied by ${r.users.last().username}!`); }
      });
    });

    message.delete();
  }
}
