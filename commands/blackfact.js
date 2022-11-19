const { SlashCommandBuilder } = require('discord.js');
const { CommandInteraction } = require('discord.js')
const request = require('request');

function getFact(){
	request('http://www.google.com', function (error, response, body) {
			//"x-api-key"
			
			console.error('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			console.log('body:', body); // Print the HTML for the Google homepage.
			return "A"
		});
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('blackfact')
		.setDescription('Gives black fact!')
		,
	async execute(interaction) {
		let fact = getFact()
		await interaction.reply(fact);

	},
};