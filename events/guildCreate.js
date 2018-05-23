const signale = require('signale');
const bearScope = signale.scope('bear');

module.exports = (guild) => {
    bearScope.info({prefix: 'guildCreate', message: `Added to the ${guild.name} guild! Number of members: ${guild.memberCount}`});
};