const Discord = require('discord.js');
exports.run = (client, message, args) => {
    const request = require('request'),
        base = 'https://api-quiz.hype.space';

    let TestMode = false;

    if (TestMode === true) {
        const NoActiveGame = require('../configs/testjson/HQ_NoGame.json');
        const ActiveGame = require('../configs/testjson/HQ_ActiveGame.json');

        message.channel.send('[test mode is active]');
        message.channel.send('Running test_ActiveGame...');
        let ActiveGame_Embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .setThumbnail('https://plusreed.com/assets/bear/HQ.png')
            .addField('Game active', ActiveGame.active, true)
            .addField('Prize', ActiveGame.prize, true)
            .addField('Next prize', ActiveGame.upcoming[0].prize, true)
            .addField('Stream URL', ActiveGame.broadcast.streams.source, false)
            .setColor(7435482)
            .setFooter('Next Game')
            .setTimestamp(ActiveGame.nextShowTime);
        message.channel.send(ActiveGame_Embed);
        message.channel.send('Running test_InactiveGame...');
        let InactiveGame_Embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .setThumbnail('https://plusreed.com/assets/bear/HQ.png')
            .addField('Game active', NoActiveGame.active)
            .addField('Prize', NoActiveGame.nextShowPrize)
            .setColor(7435482)
            .setFooter('Next Game')
            .setTimestamp(NoActiveGame.nextShowTime);
        message.channel.send(InactiveGame_Embed);
        return;
    }

    request(`${base}/shows/now/?type=hq`, (error, response, body) => {
        let hqBody = JSON.parse(body);
        let ActiveCheck;
        if (hqBody.active === false) {
            ActiveCheck = 'No';
        } else {
            ActiveCheck = 'Yes';
        }
        let embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .addField('Game active', ActiveCheck)
            .addField('Prize', hqBody.nextShowPrize)
            .setThumbnail('https://plusreed.com/assets/bear/HQ.png')
            .setColor(7435482)
            .setFooter('Next Game')
            .setTimestamp(hqBody.nextShowTime);

        message.channel.send(embed);
    });
};

exports.conf = {
    name: 'hq',
    description: 'get information about HQ Trivia shows!',
    aliases: ['hqtrivia', 'hqties', 'hquties', 'hcuties'],
    usage: 'b!hq',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};
