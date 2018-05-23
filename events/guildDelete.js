const signale = require('signale');
const bearScope = signale.scope('bear');

module.exports = (guild) => {
    bearScope.info({prefix: 'guildDelete', message: `Seems like I was removed from the ${guild.name} guild.`});
};