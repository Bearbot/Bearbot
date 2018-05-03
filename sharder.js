const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bear.js');
Manager.spawn(2); // 5,000 guilds