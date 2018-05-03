exports.run = (client, message, args) => {
    let ping = client.ping;
    let roundedPing = Math.round(ping * 10) / 10;
    // let uptime = process.uptime();
    // let roundedUptime = Math.round(uptime * 10) / 10;
    message.channel.send('ROA- I mean, pong').then(msg => {
        msg.edit(`ROA- I mean, pong\nping: ${roundedPing.toString()}ms\nserver latency: ${msg.createdTimestamp - message.createdTimestamp}ms`);
    }).catch(err => message.channel.send(err));
};

exports.conf = {
    name: 'ping',
    description: 'pong',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};