const config = require('../configs/bot/bearbot.json');
const fs = require('fs');
const signale = require('signale');

// set Signale scope
const bearScope = signale.scope('bear');

module.exports = message => {
    const client = message.client;
    const prefix = config.prefix;
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }

    if (cmd) {
        if (cmd.conf.guildOnly && message.channel.type === 'dm') return message.channel.send('This command can only be used in servers.');
        if (!cmd.conf.enabled) return message.channel.send('This command is disabled.');
        if (cmd.conf.ownerOnly && message.author.id !== config.owner) return message.channel.send('This command can only be used by the bot owner.');
    }

    try {
        bearScope.watch({prefix: 'message', message: `Running ${command} for user ${message.author.tag} (uid: ${message.author.id})`});
        // console.log(`[message] Running ${command} for user ${message.author.tag} (uid: ${message.author.id}) in ${message.guild.name} (id: ${message.guild.id})`);
        cmd.run(client, message, args);
    } catch (error) {
        bearScope.error({prefix: 'message', message: `Command ${command} failed.\n${error}`});
        // console.log(`[error] Command ${command} failed!\n${error}`);
    }
};