exports.run = (client, message, args) => {
    message.channel.send(args[0] + args[1]);
};

exports.conf = {
    name: 'argtest',
    description: 'argtest',
    aliases: [],
    usage: '',
    enabled: false,
    guildOnly: false,
    ownerOnly: true
};