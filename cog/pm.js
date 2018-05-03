exports.run = (client, message, args) => {
    message.reply('a PM is coming your way!');
    message.author.send('bench tails');
};

exports.conf = {
    name: 'pm',
    description: 'sends a PM to you [disabled]',
    aliases: [],
    usage: '',
    enabled: false,
    guildOnly: true,
    ownerOnly: false
};