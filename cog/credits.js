exports.run = (client, message, args) => {
    message.reply('<https://gist.github.com/plusreed/32c0cd4294cd367c065d303def0dfd4c>');
};

exports.conf = {
    name: 'credits',
    description: 'see the libraries that made bearbot possible.',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};