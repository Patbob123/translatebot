const { SlashCommandBuilder } = require('discord.js');
const { CommandInteraction } = require('discord.js')
const request = require('request');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blackfact')
		.setDescription('Gives black fact!')
		,
	async execute(interaction) {
		await interaction.reply("No black facts today.");

	},
};