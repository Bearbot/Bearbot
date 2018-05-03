const config = require('../configs/bot/bearbot.json');
exports.run = (client, message, args) => {
    let phrases = [
        'no breaks',
        'Oh, Finder!',
        'SPANK IT HARD',
        'Safari never goes this rough...~',
        'NO BREAKS, NO FUCKING BREAKS',
        'Thats kind of hot',
        'bench tails'
    ];

    if (!message.channel.nsfw) {
        if (message.author.id === config.owner) {
            let m = randChoose();
            message.channel.send(m);
            return;
        } else {
            message.reply('this only works in NSFW channels!');
            return;
        }
    }

    function randChoose() {
        let arg = args.join(' ');
        if (arg === 'list') {
            return `\`${phrases.join('`, `')}\``;
        } else {
            var rand = phrases[Math.floor(Math.random() * phrases.length)];
            return rand;
        }
    }

    message.channel.send(randChoose());
};

exports.conf = {
    name: 'refrito',
    description: 'i... don\'t know how to describe this.',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: true,
    ownerOnly: false
};