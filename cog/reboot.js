const config = require('../configs/bot/bearbot.json');
exports.run = (client, message, args) => {
    let msg = args.join(' ');
    if (msg) {
        // TODO: make an option to make this a global announcement
        message.channel.send(`Doing a quick hibernation... :bear::zzz:\nReason: \`${msg}\``);
        setTimeout(() => {
            process.exit();
        }, 2000);
    } else {
        message.channel.send('Doing a quick hibernation... :bear::zzz:');
        setTimeout(() => {
            process.exit();
        }, 2000);
    }
};

exports.conf = {
    name: 'reboot',
    description: 'makes bearbot do a super quick hibernation',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};