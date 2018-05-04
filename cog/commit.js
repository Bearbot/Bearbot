exports.run = (client, message, args) => {
    const exec = require('child_process').exec;

    message.channel.send('Gathering commit details...').then((msg) =>
        exec('git rev-parse --short HEAD', (err, stdout, stderr) => {
            if (err) console.log(err);
            msg.edit(`Current Bearbot commit: ${stdout}`).then((msg) =>
                exec('git log -1 --pretty=%B | cat', (err, stdout, stderr) => {
                    if (err) console.log(err);
                    msg.edit(`${msg.content}\nLast commit message: \`\`\`\n${stdout}\n\`\`\``).then((msg) =>
                        exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
                            msg.edit(`${msg.content}\nCurrent branch: \`${stdout}\``);
                        })
                    );
                })
            );
        })
    );
};

exports.conf = {
    name: 'commit',
    description: 'see the recent bearbot commit hash and message!',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};