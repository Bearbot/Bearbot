const Discord = require('discord.js');
const { prefix } = require('../configs/bot/bearbot.json');
const fs = require('fs');
const helpScope = require('signale').scope('help');

exports.run = (client, message, args) => {
    let command = args[0];

    if (!command) {
        let commands = new Array();
        let ownerCommands = new Array();
        fs.readdir('./cog', (err, files) => {
            files.forEach(file => {
                if (file.endsWith('.js') && !require(`./${file}`).conf.ownerOnly && !require(`./${file}`).conf.enabled === false) {
                    commands.push(file.replace('.js', ''));
                } /* else if (file.endsWith('.js') && require(`./${file}`).conf.ownerOnly) {
                    ownerCommands.push(file.replace('.js', ''))
                } */
            });
            message.channel.send(`Here are all the currently available commands: \`${commands.join('`, `')}\`\nFor more information on a specific command, try \`${prefix}help commandname\``);
        });
        return;
    }

    try {
        let help = require(`./${command}.js`).conf;

        let name = help.name || 'No name provided';
        let desc = help.description || 'No description';
        let usage = help.usage || 'No usage provided';
        let aliases = help.aliases.length >= 1 ? help.aliases.join(', ') : 'No aliases for command';

        const embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .setDescription(`Command name: **${name}**\nDescription: \`${desc}\`\nAliases: **${aliases}**\nUsage: **${usage}**`)
            .setFooter(`Help for command ${args[0]}`)
            .setColor(message.member.displayHexColor)
            .setTimestamp();

        message.channel.send(embed);
    } catch (err) {
        message.channel.send('Encountered an error, are you sure that is a command?\nPlease make sure you\'re putting the actual command name instead of an alias.');
        helpScope.error(err);
    }
};

exports.conf = {
    name: 'help',
    description: 'Displays help for commands',
    aliases: [],
    usage: '<command-name>',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};
