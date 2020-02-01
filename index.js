// Created by NotKed for Zeldaria Development
// 01/02/2020 - 02:49

const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

require('dotenv').config();

const { CommandHandler } = require('djs-commands');
const CH = new CommandHandler({
    folder: __dirname + "/commands/",
    prefix: [process.env.PREFIX]
});

bot.on('ready', () => {
  console.log(`${bot.user.username} is online.`);
});

bot.on('message', message => {

    if(message.channel.type === 'dm') return;
    if(message.author.type === 'bot') return;
    let args = message.content.split(" ");
    let command = args[0];
    args = args.splice(1);
    let cmd = CH.getCommand(command);
    if(!cmd) return;

    try {
        cmd.run(bot, message, args);
    } catch(e) {
        console.log(e);
    }
});

bot.login(process.env.TOKEN);
