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
            .addField('Prize', `$${ActiveGame.prize.toLocaleString()}`, true)
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
	let upcomingGameType = hqBody.upcoming[0].vertical;
	let currentGameType = hqBody.vertical;
	/**
	 * Parse the HQ vertical.
	 * @param {String} vertical - The HQ vertical to parse.
	 * @return {String} The parsed vertical.
	 */
	function parseHQVertical(vertical) {
		switch(vertical) {
			case "sports":
				return "HQ Sports";
			case "general":
				return "HQ Trivia";
			default:
				return "Unknown"; 
		}
	}
	
        if (hqBody.active === false) {
            ActiveCheck = 'No';
        } else {
            ActiveCheck = 'Yes';
        }

        if (hqBody.active === false) {
            let InactiveGame_Embed = new Discord.RichEmbed()
                .setAuthor(message.member.displayName, message.author.avatarURL)
                .addField('Game active', ActiveCheck)
                .addField('Prize', hqBody.nextShowPrize)
		.addField('Game type', parseHQVertical(hqBody.nextShowVertical))
                .setThumbnail('https://plusreed.com/assets/bear/HQ.png')
                .setColor(7435482)
                .setFooter('Next Game')
                .setTimestamp(hqBody.nextShowTime);
            message.channel.send(InactiveGame_Embed);
        } else if (hqBody.active === true) {
            let ActiveGame_Embed = new Discord.RichEmbed()
                .setAuthor(message.member.displayName, message.author.avatarURL)
                .setThumbnail('https://plusreed.com/assets/bear/HQ.png')
                .addField('Game active', ActiveCheck, true)
		.addField('Game type', parseHQVertical(hqBody.vertical), true)
                .addField('Prize', `$${hqBody.prize.toLocaleString()}`, true)
                .addField('Next prize', hqBody.upcoming[0].prize, true)
                .addField('Stream URL', hqBody.broadcast.streams.source, false)
                .setColor(7435482)
                .setFooter('Next Game')
                .setTimestamp(hqBody.nextShowTime);
            message.channel.send(ActiveGame_Embed);
        } else {
            message.channel.send('Received unknown response from HQ Trivia API.');
        }
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
