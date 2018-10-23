const banScope = require('signale').scope('ban');
exports.run = (client, message, args) => {
    let can_ban = message.channel.permissionsFor(message.member).has('BAN_MEMBERS', true);
    let user = message.mentions.members.first();
    let msg = args.slice(2).join(' ');
    
    if (typeof(user) === 'undefined') {
        message.channel.send('I can\'t ban someone if you don\'t give me a person to ban.\nPlease use `b!help ban` to learn usage.');
        return;
    }
    if (!msg) {
        message.channel.send('Please supply a reason.');
        return;
    }
    if (!args[1]) {
        message.channel.send('Please provide an amount of days of messages to delete.');
        return;
    }

    if (can_ban) {
        if (!user.bannable) {
            message.channel.send('I can\'t ban that user.');
            return;
        }
        user.ban({
            days: args[2],
            reason: msg
        });
        message.channel.send('<:tickYes:315009125694177281> Done! User banned.').then(
            msg => msg.delete(1000).catch(e => banScope.error(e))
        );
        return;
    } else {
        message.reply('You don\'t have the permissions to do this, sorry.');
    }
};

exports.conf = {
    name: 'ban',
    description: 'ban someone through bearbot.',
    aliases: [],
    usage: 'b!ban @user 3 obnoxious behavior.',
    enabled: true,
    guildOnly: true,
    ownerOnly: false
};
