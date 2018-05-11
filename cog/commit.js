exports.run = (client, message, args) => {
    const { execSync } = require('child_process');
    
    let commithash = execSync('git rev-parse --short HEAD').toString().trim(),
        commitmsg = execSync('git log -1 --pretty=%B | cat').toString().trim(),
        branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    
    message.channel.send(`Current Bearbot commit: \`${commithash}\`\nLast commit message:\n\`\`\`\n${commitmsg}\n\`\`\`\nCurrent branch: \`${branch}\``);
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
