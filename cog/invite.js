exports.run = (client, message, args) => {
    message.reply('<https://discordapp.com/api/oauth2/authorize?client_id=412139349770108939&permissions=372632694&scope=bot>');
};

exports.conf = {
    name: 'invite',
    description: 'get an invite link to invite me to your server!',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};