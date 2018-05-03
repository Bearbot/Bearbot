const config = require('../configs/bot/bearbot.json');
const dbl = require('dblposter');
module.exports = client => {
    const dblPoster = new dbl(config.dblkey, client);
    console.log('[dblposter] Binding before bot startup...');
    dblPoster.bind();
    console.log('[dblposter] Binded successfully');
    console.log(`ALRIGHT YOU BIG BITCHES, I'M UP AS OF ${new Date}`);
    console.log(`Logged in as ${client.user.tag}\nCurrently on ${client.guilds.size} servers with a total of ${client.users.size} users!`);
    client.user.setStatus(config.defaultpresence);
    client.user.setActivity(config.defaultgame, { type: config.defaulttype });
};