exports.run = (client, message, args) => {
    const {VM} = require('vm2');

    const isEasterEggEnabled = true;

    let code = args.join(' ');
    if (code.indexOf('`') > -1) {
        message.reply('code blocks aren\'t supported yet, sorry!');
    } else if (code === '2 + 2 - 1') {
        if (isEasterEggEnabled) {
            message.channel.send('that\'s 3, quick maths');
        } else {
            message.channel.send('3');
        }
    } else {
        try {
            let res = new VM().run(code);
            message.channel.send(res);
        } catch (err) {
            message.channel.send(`Error: \`${err}\``);
        }
    }
};

exports.conf = {
    name: 'debug',
    description: 'run node.js code in a sandbox!',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};