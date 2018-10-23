const sayScope = require('signale').scope('say');
exports.run = (client, message, args) => {
    let repeat = args.join(' ');
    message.channel.send(repeat);
    message.delete().catch(e => sayScope.error(`Couldn't delete message, ${e}`));
};

exports.conf = {
    name: 'say',
    description: 'makes bearbot say something',
    aliases: [],
    usage: 'b!say alright you big bitches',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};
