exports.run = (client, message, args) => {
    message.channel.send('<https://trello.com/bearbotdiscord>\n\nBug board: <https://trello.com/b/BayO1d2W/bugs>\nFeature progress board: <https://trello.com/b/uSUsEmN2/feature-progress>');
};

exports.conf = {
    name: 'trello',
    description: 'get bearbot\'s trello links',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};