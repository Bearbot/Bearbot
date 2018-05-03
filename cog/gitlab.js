const config = require('../configs/bot/bearbot.json');
exports.run = (client, message, args) => {
    message.channel.send('aaahgfhfgdhdfgaa');
};

exports.conf = {
    name: 'gitlab',
    description: 'run gitlab related operations. [disabled]',
    aliases: [],
    usage: '',
    enabled: false,
    guildOnly: true,
    ownerOnly: false
};