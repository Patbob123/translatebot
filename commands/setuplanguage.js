const { SlashCommandBuilder } = require('discord.js');
const { CommandInteraction } = require('discord.js')
const request = require('request');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('language')
		.setDescription('change langauage!')
        .addStringOption((option) =>
			option.setName('input')
				.setDescription('What you say')
				.setRequired(true)

		)
        .addStringOption((option) =>
            option.setName('output')
                .setDescription('What the bot will say')
                .setRequired(true)

        ),
	async execute(interaction) {
		await interaction.reply(`You will be translated from ${interaction.options.getString('input')} to ${interaction.options.getString('output')}`);

	},
};