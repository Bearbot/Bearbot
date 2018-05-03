exports.run = (client, message, args) => {
    let msg = args.join(' ');

    message.channel.send(msg.split('').reverse().join(''));
};

exports.conf = {
    name: 'reverse',
    description: 'reverse your text!',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};