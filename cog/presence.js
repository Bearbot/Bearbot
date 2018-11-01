const config = require('../configs/bot/bearbot.json');
const signale = require('signale');
const presenceScope = signale.scope('presence');
exports.run = (client, message, args) => {
    let validOptions = ['set', 'reset', 'settype'];
    let validPresence = ['online', 'offline', 'idle', 'dnd'];
    let validType = ['LISTENING', 'WATCHING', 'STREAMING', 'PLAYING'];

    switch (args[0]) {
    case 'set':
        if (validPresence.indexOf(args[1]) > -1) {
            client.user.setPresence({ status: args[1] });
        } else {
            message.channel.send(`not a valid presence. presences are: \`${validPresence.join('`, `')}\``);
        }
        break;
    case 'reset':
        client.user.setPresence({status: config.defaultpresence});
        client.user.setActivity(config.defaultgame, { type: config.defaulttype });
        message.channel.send('presence reset.').then(
            response => response.delete(1000).catch(e => presenceScope.error(e))
        ).catch(e => presenceScope.error(e));
        break;
    case 'settype':
        if (validType.indexOf(args[1]) < -1) {
            message.channel.send('not a valid type');      
        } else if (args[2] === undefined) {
            client.user.setActivity(this.client.presence.activity.name, { type: args[1] });
        } else {
            client.user.setActivity(args.slice(2).join(' '), { type: args[1] });
        }
        break;
    default:
        message.channel.send(`not a valid option. options are: \`${validOptions.join('`, `')}\``);
    }
};

exports.conf = {
    name: 'presence',
    description: 'set bearbot\'s presence',
    aliases: [],
    usage: 'b!presence set dnd',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};
