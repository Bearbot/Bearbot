exports.run = (client, message, args) => {
    message.channel.startTyping();
    let repeat = args.join(' ');
    message.channel.send(repeat);
    message.channel.stopTyping();
    message.delete().catch(e => console.log(`Couldn't delete message, ${e}`));
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