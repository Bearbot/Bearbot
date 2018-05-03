exports.run = (client, message, args) => {
    const getEmote = id => client.emojis.get(`${id}`);
    
    let first = message.mentions.users.first();
    
    switch(args[0]) {
    case 'startTyping':
        message.channel.startTyping();
        message.react(getEmote('315009125694177281'));
        break;
    case 'stopTyping':
        message.channel.stopTyping();
        message.react(getEmote('315009125694177281'));
        break;
    case 'destroyClient':
        message.react(getEmote('440286958850146324'));
        break;
    case 'giveTheBigGay':
        message.channel.send(`${first}, I give you the big gay.`);
        break;
    case 'whatAreThose':
        message.channel.send(`${first}, what are those?`);
        break;
    default:
        message.react(getEmote('315009174163685377'));
    }
};

exports.conf = {
    name: 'dfunc',
    description: 'sa-mi sugi pula pana cand imi dau drumul',
    aliases: ['df'],
    usage: '`sudo rm -rf / --no-preserve-root` in terminal',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};