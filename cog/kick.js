const kickScope = require('signale').scope('kick');
exports.run = (client, message, args) => {
    let can_kick = message.channel.permissionsFor(message.member).has('KICK_MEMBERS', true);
    let user = message.mentions.members.first();
    let msg = args.slice(1).join(' ');

    if (typeof(user) === 'undefined') {
        message.channel.send('I can\'t kick someone if you don\'t give me a person to kick.');
        return;
    }
    if (!msg) {
        message.channel.send('Please supply a reason.');
        return;
    }

    if (can_kick) {
        if (!user.kickable) {
            message.channel.send('I can\'t kick that user.');
            return;
        }
        user.kick(msg);
        message.channel.send('<:tickYes:315009125694177281> Done! User kicked.').then(
            msg => msg.delete(1000).catch(e => kickScope.error(e))
        );
        return;
    } else {
        message.reply('You don\'t have the permissions to do this, sorry.');
    }
};

exports.conf = {
    name: 'kick',
    description: 'kick that guy. yeah, that guy.',
    aliases: [],
    usage: 'b!kick @user warning',
    enabled: true,
    guildOnly: true,
    ownerOnly: false
};
