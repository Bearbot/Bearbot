exports.run = (client, message, args) => {
    message.channel.send('This is not done yet, my apologies.');
};

exports.conf = {
    name: 'i18n',
    description: 'not done',
    aliases: [],
    usage: '',
    enabled: false,
    guildOnly: false,
    ownerOnly: false
};