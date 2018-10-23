const config = require('../configs/bot/bearbot.json');
const signale = require('signale');
const speedtestScope = signale.scope('speedtest');

exports.run = (client, message, args) => {
    const publicIp = require('public-ip');
    const exec = require('child_process').exec;

    function getRandomIPInt() {
        let int1 = Math.floor(Math.random() * 256).toString(),
            int2 = Math.floor(Math.random() * 256).toString(),
            int3 = Math.floor(Math.random() * 256).toString(),
            int4 = Math.floor(Math.random() * 256).toString();
        return `${int1}.${int2}.${int3}.${int4}`;
    }

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
                if (err) speedtestScope.error(err);
                msg.edit(`\`\`\`${stdout}\`\`\``);
            });
            break;
        default:
            publicIp.v4().then(ip => {
                exec('speedtest-cli', (err, stdout, stderr) => {
                    if (err) speedtestScope.error(err);
                    stdout = stdout.replace(ip, getRandomIPInt());
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
    usage: '',
    enabled: true,
    guildOnly: false,
    ownerOnly: true
};
