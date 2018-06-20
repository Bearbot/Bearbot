const { client_id } = require('../configs/bot/bearbot.json');
exports.run = (client, message, args) => {
    message.reply(`<https://discordapp.com/api/oauth2/authorize?client_id=${client_id}&permissions=372632694&scope=bot>`);
};

exports.conf = {
    name: 'invite',
    description: 'get an invite link to invite me to your server!',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};