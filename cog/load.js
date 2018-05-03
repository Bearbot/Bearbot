const bot = require('../bear.js');
const config = require('../configs/bot/bearbot.json');

exports.run = (client, message, args) => {
    let cmd = args.join(' ');
    bot.load(message, cmd);
};

exports.conf = {
    name: 'load',
    description: 'load commands into bearbot',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};