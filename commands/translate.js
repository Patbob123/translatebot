const { SlashCommandBuilder } = require('discord.js');
const { CommandInteraction } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('translate!'),
		
	async execute(interaction) {
		await interaction.reply("A");

	},
};