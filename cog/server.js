const { support_server } = require('../configs/bot/bearbot.json');
exports.run = (client, message, args) => {
    message.reply(`if you want to join the official Bearbot server, here's a link: ${support_server}`);
};

exports.conf = {
    name: 'server',
    description: 'get an invite to the official bearbot server',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};