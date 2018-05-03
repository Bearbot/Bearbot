const config = require('../configs/bot/bearbot.json');
exports.run = async (client, message, args) => {
    let code = args.join(' ');
    try {
        let res = await eval(code);
        if (res === 'undefined') {
            message.channel.send('nothing was returned, so i assume everything went fine. **assume.**');
            return;
        } else {
            await message.channel.send(`\`\`\`js\n${res}\`\`\``);
            return;
        }
    } catch (err) {
        await message.channel.send(`Error: \`${err}\``);
    }
};

exports.conf = {
    name: 'eval',
    description: 'evaluate node.js code',
    aliases: [],
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};