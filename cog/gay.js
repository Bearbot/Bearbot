const config = require('../configs/bot/bearbot.json');
exports.run = (client, message, args) => {
    let gayids = [
        '138800872627896320', // Dud
        '139793690712473600', // Seb
        '202999961653084160', // Buddy
        '104784948044525568', // Muddy
        '96298770504904704', // Roland
        '157282342975700992', // snnsual
        '181330454706651136', // Alex
        '179742623601393664', // special boy
        // These below will never get triggered. They're bots. //
        '346741490908921877', // Sensei
        '272141618474385409' // Snowball
    ];

    let straightids = [
        '238913683030409226' // nice boy
    ];

    if (gayids.indexOf(message.author.id) > -1) {
        message.channel.send('my gay-o-meter says you\'re gay');
    } else if (message.author.id === config.owner) {
        message.channel.send('oh you\'re just a fucking retard to be honest');
    } else if(straightids.indexOf(message.author.id) > -1) {
        message.channel.send('you\'re actually a fucking straight ass dude. hella bro!');
    } else {
        let response = ['my gay-o-meter says you\'re gay', 'my gay-o-meter says you ain\'t gay'];
        message.channel.send(response[Math.floor(Math.random() * response.length)]);
    }
};

exports.conf = {
    name: 'gay',
    description: 'tells you if you\'re gay or not.',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: true,
    ownerOnly: false
};
