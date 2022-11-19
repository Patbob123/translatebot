require('dotenv').config()
const path = require('path')
const fs = require('fs') 
const { REST, SlashCommandBuilder, Routes } = require('discord.js');

const commands = []
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// rest.put(Routes.applicationGuildCommands('1043566529444323489', '770325257751363624'), { body: commands })
// 	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
// 	.catch(console.error);
rest.put( Routes.applicationCommands('1043566529444323489'), { body: commands })
	.then((data) => console.log(`Successfully reloaded ${data.length} application commands.`))
	.catch(console.error);;