exports.run = (client, message, args) => {
    let can_ban = message.channel.permissionsFor(message.member).has('BAN_MEMBERS', true);
    let user = message.mentions.members.first();
    let time = args[1] || 7;
    let msg = args.slice(2).join(' ');
    
    if (!user) return message.channel.send('I can\'t ban someone if you don\'t give me a person to ban.\nPlease use `b!help ban` to learn usage.');

    if (!msg) msg = 'no reason provided.';

    if (message.channel.permissionsFor(message.guild.me).has('BAN_MEMBERS')) return message.channel.send('I don\'t have permission to do this, sorry.');

    if (can_ban) {
        if (!user.bannable) return message.channel.send('I can\'t ban that user.');
        user.ban({
            days: time,
            reason: msg
        });
        return message.channel.send('<:tickYes:315009125694177281> Done! User banned.').then(
            msg => msg.delete(1000).catch(e => console.log(e))
        );
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
