const { SlashCommandBuilder } = require('discord.js');

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
        let inputlang = interaction.options.getString('input').toUpperCase();
        let outputlang = interaction.options.getString('output').toUpperCase();
        let user = interaction.member.id;
        if(userConfig.hasOwnProperty(user)) {
            userConfig[user][1] = inputlang; 
            userConfig[user][2] = outputlang; 
        } else {
            userConfig[user] = [false, inputlang, outputlang];
        }
        fs.writeFile(userConfigName, JSON.stringify(userConfig, null, 2), async function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(userConfig, null ,2));
            await interaction.reply(`You will be translated from ${interaction.options.getString('input')} to ${interaction.options.getString('output')}`);
        });

		
	},
};