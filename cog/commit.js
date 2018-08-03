exports.run = (client, message, args) => {
    const { execSync } = require('child_process');
    
    let hash = execSync('git rev-parse --short HEAD').toString().trim(),
        msg = execSync('git log -1 --pretty=%B').toString().trim(),
        branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    
    message.channel.send(`Current Bearbot commit: \`${hash}\`\nLast commit message:\n\`\`\`\n${msg}\n\`\`\`\nCurrent branch: \`${branch}\`\n\nInterested in seeing the source code? Look no further than here: <https://github.com/plusreed/Bearbot>`);
};

exports.conf = {
    name: 'commit',
    description: 'see the current commit Bear is running on!',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: false
};
