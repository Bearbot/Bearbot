exports.run = (client, message, args) => {
    let game = args.join(' ');
    client.user.setPresence({game: { name: game }});
    message.channel.send(`alright, game changed to \`${game}\``);
};

exports.conf = {
    name: 'setgame',
    description: 'set the playing game of bearbot',
    aliases: [],
    usage: 'b!setgame rika ships lapidot',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};