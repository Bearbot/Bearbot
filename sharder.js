const Discord = require('discord.js');
const signale = require('signale');
const shardingScope = signale.scope('sharding');

const Manager = new Discord.ShardingManager('./bear.js');
const numOfShards = parseInt(process.argv[2]);

shardingScope.info(`Starting Bearbot with ${numOfShards | '2'} shards!`);
Manager.spawn(numOfShards || 2); // 5,000 guilds by default
