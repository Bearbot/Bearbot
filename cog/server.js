exports.run = (client, message, args) => {
    message.reply('https://discord.gg/tSV3yxm');
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