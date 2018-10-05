const config = require('../configs/bot/bearbot.json');
exports.run = (client, message, args) => {
    const publicIp = require('public-ip');
    const exec = require('child_process').exec;

    function generateRandomIP() {
        let int1 = Math.floor(Math.random() * 256).toString(),
            int2 = Math.floor(Math.random() * 256).toString(),
            int3 = Math.floor(Math.random() * 256).toString(),
            int4 = Math.floor(Math.random() * 256).toString();
        return `${int1}.${int2}.${int3}.${int4}`;
    }
    
    // TODO: Move this to a configuration file.
    let otherISPs = [
        'NASA',
        'Poputepipikku',
        'Linode',
        'big fuck',
        'AAAAAAAAAAAAAAAAAA',
        'bear',
        'Sensei Hate Group Inc.',
        'EpikRika8332.gov',
        'BigDickBitch.com'
    ];
    let randISP = otherISPs[Math.floor(Math.random() * otherISPs.length)]; // Randomly select from otherISPs array
    
    message.channel.send('Please wait, this could take a bit...').then(msg => {
        switch (args[0]) {
        case 'simple':
            exec('speedtest-cli --simple', (err, stdout, stderr) => {
                if (err) console.log(err);
                msg.edit(`\`\`\`${stdout}\`\`\``);
            });
            break;
        default:
            publicIp.v4().then(ip => {
                exec('speedtest-cli', (err, stdout, stderr) => {
                    if (err) console.log(err);
                    stdout = stdout.replace(ip, generateRandomIP());
                    stdout = stdout.replace('Linode', randISP);
                    msg.edit(`\`\`\`${stdout}\`\`\``);
                });
            });
        }
    }
    );
};

exports.conf = {
    name: 'speedtest',
    description: 'runs a speedtest from the server that bearbot is hosted on',
    aliases: [],
    usage: 'b!speedtest',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};
