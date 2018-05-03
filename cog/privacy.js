exports.run = (client, message, args) => {
    message.reply('You may see the Bearbot privacy notice here: <https://gist.github.com/plusreed/da0bf7138aacd16b5553227815e6915e>');
};

exports.conf = {
    name: 'privacy',
    description: 'view bearbot\'s privacy notice',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};