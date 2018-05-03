const Discord = require('discord.js');
exports.run = (client, message, args) => {
    const request = require('request');
    const moment = require('moment-timezone');
    const base = 'https://api-quiz.hype.space';

    let TestMode = false;

    if (TestMode === true) {
        const NoActiveGame = require('../configs/testjson/HQ_NoGame.json');
        const ActiveGame = require('../configs/testjson/HQ_ActiveGame.json');

        let A_nextShow = moment(ActiveGame.nextShowTime).tz('America/New_York').format('MM-DD-YY hh:mm:ss a z');
        let A_upcomingShow = moment(ActiveGame.upcoming[0].time).tz('America/New_York').format('MM-DD-YY hh:mm:ss a z');
        let I_nextShow = moment(NoActiveGame.nextShowTime).tz('America/New_York').format('MM-DD-YY hh:mm:ss a z');
        let I_upcomingShow = moment(NoActiveGame.upcoming[0].time).tz('America/New_York').format('MM-DD-YY hh:mm:ss a z');

        message.channel.send('[test mode is active]');
        message.channel.send('Running test_ActiveGame...');
        let ActiveGame_Embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .setThumbnail('https://plusreed.com/assets/bear/HQ.png')
            .addField('Game active', ActiveGame.active, true)
            .addField('Prize', ActiveGame.prize, true)
            .addField('Next game', A_upcomingShow, true)
            .addField('Next prize', ActiveGame.upcoming[0].prize, true)
            .addField('Stream URL', ActiveGame.broadcast.streams.source, false)
            .setColor(7435482)
            .setFooter('HQ Trivia show statistics (beta)')
            .setTimestamp();
        message.channel.send(ActiveGame_Embed);
        message.channel.send('Running test_InactiveGame...');
        let InactiveGame_Embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .setThumbnail('https://plusreed.com/assets/bear/HQ.png')
            .addField('Game active', NoActiveGame.active, false)
            .addField('Next game', I_nextShow, false)
            .addField('Prize', NoActiveGame.nextShowPrize, false)
            .setColor(7435482)
            .setFooter('HQ Trivia show statistics (beta)')
            .setTimestamp();
        message.channel.send(InactiveGame_Embed);
        return;
    }

    request(`${base}/shows/now/?type=hq`, (error, response, body) => {
        let hqBody = JSON.parse(body);
        let nextShow = moment(hqBody.nextShowTime).tz('America/New_York').format('MM-DD-YY hh:mm:ss a z');
        function ActiveCheck() {
            if (hqBody.active === false) {
                return 'No';
            } else {
                return 'Yes';
            }
        }
        let embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL)
            .addField('Game active', ActiveCheck(), false)
            .addField('Next game', nextShow, false)
            .addField('Prize', hqBody.nextShowPrize, false)
            .setThumbnail('https://plusreed.com/assets/bear/HQ.png')
            .setColor(7435482)
            .setFooter('HQ Trivia show statistics (beta)')
            .setTimestamp();

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