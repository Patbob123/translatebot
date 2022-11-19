require('dotenv').config()
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands('1023718517784203394', '770325257751363624'), { body: [] })
	.then((data) => console.log(`DELETED GUILD COMMANDS`))
	.catch(console.error);
rest.put( Routes.applicationCommands('1023718517784203394'), { body: [] })
	.then((data) => console.log(`DELETED GLOBAL COMMANDS`))
	.catch(console.error);