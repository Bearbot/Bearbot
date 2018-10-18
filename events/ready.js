const config = require('../configs/bot/bearbot.json');
const dbl = require('dblposter');
const signale = require('signale');

// signale scopes
const dblScope = signale.scope('dblposter');
const bearScope = signale.scope('bear');

module.exports = client => {
    const dblPoster = new dbl(process.env.BEAR_DBL_KEY, client);

    dblScope.info('Binding before bot startup.');
    dblPoster.bind();
    dblScope.success('Binded successfully');
    
    bearScope.info(`Up as of ${new Date}`);
    bearScope.success(`Logged in as ${client.user.tag}! I have ${client.guilds.size} guilds and a total of ${client.users.size} users.`);
    
    // TODO: actually error check here
    bearScope.watch({prefix: 'activity', message: 'Setting presence and game'});
    client.user.setStatus(config.defaultpresence);
    client.user.setActivity(config.defaultgame, { type: config.defaulttype });
    bearScope.success({prefix: 'activity', message: 'Set presence successfully.'});
};
