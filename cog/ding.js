exports.run = (client, message, args) => {
    message.channel.send('ding dong who? (wrong command, use ping)');
};

exports.conf = {
    name: 'ding',
    description: 'ding dong who?\nAYYYY i didn\'t even know she was coming',
    aliases: [],
    usage: '',
    enabled: false,
    guildOnly: false,
    ownerOnly: false
};