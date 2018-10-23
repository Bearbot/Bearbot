const Discord = require('discord.js');
const client = new Discord.Client({
    autoReconnect: true,
    disableEveryone: true
});
const conf = require('./configs/bot/bearbot.json');
const fs = require('fs');
const signale = require('signale');

const bearScope = signale.scope('bear');

require('./utilities/eventLoader')(client);

const token = conf.token;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./cog/', (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        const cmd = require(`./cog/${file}`);
        client.commands.set(cmd.conf.name, cmd);
        cmd.conf.aliases.forEach(alias => {
            client.aliases.set(alias, cmd.conf.name);
        });
    });
});


let reload = (message, cmd) => {
    delete require.cache[require.resolve(`./cog/${cmd}`)];
    try {
        let cfile = require(`./cog/${cmd}`);
    } catch (err) {
        message.channel.send(`i couldn't load ${cmd}. error:\n\`\`\`${err}\`\`\``);
        return;
    }
    bearScope.info({prefox: 'reload', message: `User ${message.author.tag} (uid: ${message.author.id}) reloaded cog ${cmd}`});
    message.channel.send(`reloaded ${cmd}`).then(
        response => response.delete(1000).catch(e => bearScope.error(e))
    ).catch(e => bearScope.error(e));
};
exports.reload = reload;

let load = (message, cmd) => {
    try {
        try {
            fs.rename(`./cog/unloaded/${cmd}.js`, `./cog/${cmd}.js`, () => {
                let cfile = require('./cog/' + cmd);
            });
        } catch (err) {
            let cfile = require('./cog/' + cmd);
        }
    } catch (err) {
        message.channel.send(`i couldn't load ${cmd}. error:\n\`\`\`${err}\`\`\``);
        return;
    }
    message.channel.send(`loaded ${cmd}`).then(
        response => response.delete(1000).catch(e => bearScope.error(e))
    ).catch(e => bearScope.error(e));
};
exports.load = load;

client.login(token);
