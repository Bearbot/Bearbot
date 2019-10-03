exports.run = (client, message, args) => {
    message.reply('These are the people that made Bearbot what it is today. Thank you. <https://gist.github.com/plusreed/32c0cd4294cd367c065d303def0dfd4c>');
};

exports.conf = {
    name: 'credits',
    description: 'see the libraries and people that made bearbot possible.',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};