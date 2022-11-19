const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')

const userConfigName = '../config/userConfig.json';
const channelConfigName = '../config/channelConfig.json';

let userConfig = JSON.parse(fs.readFileSync(path.join(__dirname,userConfigName), 'utf8'))
let channelConfig = JSON.parse(fs.readFileSync(path.join(__dirname,channelConfigName), 'utf8'))


languages = {
    "bulgarian":"BG",
    "czech":"CS",
    "danish":"DA",
    "german":"DE",
    "greek":"EL",
    "english":"EN",
    "spanish":"ES",
    "estonian":"ET",
    "finnish":"FI",
    "french":"FR",
    "hungarian":"HU",
    "indonesian":"ID",
    "italian":"IT",
    "japanese":"JA",
    "lithuanian":"LT",
    "latvian":"LV",
    "dutch":"NL",
    "polish":"PL",
    "portuguese":"PT",
    "romanian":"RO",
    "russian":"RU",
    "slovak":"SK",
    "slovenian":"SL",
    "swedish":"SV",
    "turkish":"TR",
    "ukrainian":"UK",
    "chinese":"ZH",
}


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
        let input = interaction.options.getString('input')
        let output = interaction.options.getString('output')
        let inputlang = input.length<=2?input.toUpperCase():languages[input.toLowerCase()];
        let outputlang = output.length<=2?output.toUpperCase():languages[output.toLowerCase()];
        
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