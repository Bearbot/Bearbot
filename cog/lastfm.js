const config = require('../configs/bot/bearbot.json'),
    base = 'http://ws.audioscrobbler.com/2.0',
    key = config.lfmkey,
    request = require('request'),
    discord = require('discord.js'),
    signale = require('signale'),
    lfmScope = signale.scope('lfm');
let user;
exports.run = (client, message, args) => {

    let validArgs = [
        'scrobbling',
        'set',
        // "recent",
        'profile'
    ];

    switch (args[0]) {
    case 'scrobbling':
        try {
            user = require(`../configs/users/${message.author.id}.json`);
        } catch (err) {
            let errStr = err.toString();
            if (errStr.indexOf('Cannot find module') > -1) {
                if (args[1]) return;
                message.reply('You do not have a Last.fm username set. You will need to set one using `b!lastfm set usernamehere`.\nOr you can provide a username and I can see if they are scrobbling something for you!');
                return;
            } else {
                message.channel.send('Error');
                lfmScope.error({ prefix: 'scrobbling', message: err });
                break;
            }
        } finally {
            request(`${base}/?method=user.getrecenttracks&user=${args[1] || user.lfmusername}&api_key=${key}&format=json`, (error, response, body) => {
                let lfmjson = JSON.parse(body);
                try {
                    if (lfmjson.recenttracks.track[0]['@attr'].nowplaying) {
                        console.log(`[lfm] Found something being scrobbled for ${args[1] || user.lfmusername}.`);
                        const embed = new discord.RichEmbed()
                            .setColor(1214160)
                            .addField('Song', lfmjson.recenttracks.track[0].name, false)
                            .addField('Artist', lfmjson.recenttracks.track[0].artist['#text'], true)
                            .addField('Album', lfmjson.recenttracks.track[0].album['#text'], true)
                            .addField('URL', `[Click here to open URL](${lfmjson.recenttracks.track[0].url})`, false)
                            .setThumbnail(lfmjson.recenttracks.track[0].image[3]['#text']);
                        message.channel.send(`Here's what I found scrobbling for ${args[1] || user.lfmusername}:`, {
                            embed
                        });
                    }
                } catch (err) {
                    let errstr = err.toString();
                    if (errstr.indexOf('Cannot read property \'nowplaying\' of undefined') > -1) {
                        message.channel.send('That user is not scrobbling anything.');
                    } else if (errstr.indexOf('Cannot read property \'track\' of undefined') > -1) {
                        message.channel.send('That user does not exist.');
                    } else {
                        message.channel.send('An error occurred. The Last.fm API may not be responding.');
                        lfmScope.error({ prefix: 'scrobbling', message: err });
                    }
                }
            });
        }
        return;
    case 'set':
        if (!args[1]) {
            message.channel.send('I need a Last.fm username for this to work.');
        } else {
            const fs = require('fs');
            const lfmcfg = {
                'lfmusername': args[1]
            };
            let json = JSON.stringify(lfmcfg);
            fs.writeFile(`./configs/users/${message.author.id}.json`, json, (err) => {
                if (err) {
                    message.channel.send('Something happened.');
                    lfmScope.error({ prefix: 'set', message: err });
                } else {
                    message.channel.send(`Your Last.fm username has been set to \`${args[1]}\`.`);
                }
            });
        }
        return;
    case 'profile':
        try {
            user = require(`../configs/users/${message.author.id}.json`);
        } catch (err) {
            let errStr = err.toString();
            if (errStr.indexOf('Cannot find module') > -1) {
                if (args[1]) return;
                message.reply('You do not have a Last.fm username set. You will need to set one using `b!lastfm set usernamehere`.\nOr you can provide a username and I can show you their profile!');
                return;
            } else {
                message.channel.send('Error');
                lfmScope.error({ prefix: 'profile', message: err });
                break;
            }
        } finally {
            request(`${base}/?method=user.getinfo&user=${args[1] || user.lfmusername}&api_key=${key}&format=json`, (error, response, body) => {
                let lfmjson = JSON.parse(body);
                let regdate = new Date(lfmjson.user.registered.unixtime * 1000);

                const embed = new discord.RichEmbed()
                    .setColor(1214160)
                    .setTitle(lfmjson.user.name)
                    .setURL(lfmjson.user.url)
                    .setThumbnail(lfmjson.user.image[3]['#text'])
                    .addField('Scrobbles', lfmjson.user.playcount)
                    .setFooter('Registered on')
                    .setTimestamp(regdate);

                message.channel.send(`Here's the profile for ${args[1] || user.lfmusername}:`, {
                    embed
                });
            });
        }
        return;
    default:
        message.channel.send(`Valid args are: \`${validArgs.join('`, `')}\``);
    }
};

exports.conf = {
    name: 'lastfm',
    description: 'run last.fm related tasks',
    aliases: ['fm', 'lfm'],
    usage: 'b!lastfm profile plusreed',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};
