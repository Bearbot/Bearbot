const Discord = require('discord.js');
exports.run = (client, message, args) => {
    function format(seconds) {
        function pad(s) {
            return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60 * 60));
        var minutes = Math.floor(seconds % (60 * 60) / 60);
        var secs = Math.floor(seconds % 60);

        return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    }
    let embed = new Discord.RichEmbed()
        .setAuthor(message.member.displayName, message.author.avatarURL)
        .setThumbnail(client.user.avatarURL)
        .addField('Servers', `${client.guilds.size} servers`, true)
        .addField('Users', `${client.users.size} users`, true)
        .addField('Uptime', format(process.uptime()), true)
        .setColor(message.member.displayHexColor)
        .setTimestamp();
    message.channel.send(embed);
};

exports.conf = {
    name: 'stats',
    description: 'get stats regarding bearbot!',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};