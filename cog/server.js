const { support_server } = require('../configs/bot/bearbot.json');
exports.run = (client, message, args) => {
    message.reply(support_server);
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