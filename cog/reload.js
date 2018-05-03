const bot = require('../bear.js');
const config = require('../configs/bot/bearbot.json');

exports.run = (client, message, args) => {
    let cmd = args.join(' ');
    bot.reload(message, cmd);
};

exports.conf = {
    name: 'reload',
    description: 'reload a bearbot command',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};