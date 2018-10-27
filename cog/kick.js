exports.run = (client, message, args) => {
    let can_kick = message.channel.permissionsFor(message.member).has('KICK_MEMBERS', true);
    let user = message.mentions.members.first();
    let msg = args.slice(1).join(' ');

    if (!user) return message.channel.send('I can\'t kick someone if you don\'t give me a person to kick.');
    
    if (!user) return message.channel.send('I can\'t kick someone if you don\'t give me a person to kick.\nPlease use `b!help kick` to learn usage.');
    
    if (!msg) msg = 'no reason provided.';
    
    if (message.channel.permissionsFor(message.guild.me).has('KICK_MEMBERS') return message.channel.send('I don\'t have permission to do this, sorry.');
    
    if (can_kick) {
        if (!user.kickable) return message.channel.send('I can\'t kick that user.');
        user.kick(msg);
        return message.channel.send('<:tickYes:315009125694177281> Done! User kicked.').then(
            msg => msg.delete(1000).catch(e => console.log(e))
        );
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
