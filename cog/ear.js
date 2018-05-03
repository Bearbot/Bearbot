exports.run = (client, message, args) => {
    // message.channel.send("hello!");
    const glob = require('glob');
    glob('../bear_pics', function(er, file) {
        message.channel.send({
            files: [{
                attachment: file[Math.floor(Math.random() * file.length)],
            }]
        }).catch(e => console.error(e));
    });
};

exports.conf = {
    name: 'ear',
    description: 'bear pictures [disabled]',
    aliases: ['bear'],
    usage: '',
    enabled: false,
    guildOnly: false,
    ownerOnly: false
};