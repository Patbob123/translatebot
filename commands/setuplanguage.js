const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')

const userConfigName = '../config/userConfig.json';
let userConfig = JSON.parse(fs.readFileSync(path.join(__dirname, userConfigName), 'utf8'))

const languages = require("../utils/languages")
const abre = languages.abbreviations
const langhash = languages.languagehash

module.exports = {
    data: new SlashCommandBuilder()
        .setName('language')
        .setDescription('change langauage!')
        .addStringOption((option) =>
            option.setName('input')
                .setDescription('What you say')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption((option) =>
            option.setName('output')
                .setDescription('What the bot will say')
                .setRequired(true)
                .setAutocomplete(true)
        ),
    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
		const choices = abre
		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));

        let options;
        if (filtered.length > 25) {
            options = filtered.slice(0, 25);
        } else {
            options = filtered;
        }

		await interaction.respond(
			options.map(choice => ({ name: choice, value: choice })),
		);
    },
    async execute(interaction) {
        let input = interaction.options.getString('input')
        let output = interaction.options.getString('output')
        let inputlang = input.length <= 2 ? input.toUpperCase() : langhash[input.toLowerCase()];
        let outputlang = output.length <= 2 ? output.toUpperCase() : langhash[output.toLowerCase()];

        if (abre.includes(inputlang) && abre.includes(outputlang)) {
            let user = interaction.member.id;
            if (userConfig.hasOwnProperty(user)) {
                userConfig[user][1] = inputlang;
                userConfig[user][2] = outputlang;
            } else {
                userConfig[user] = [false, inputlang, outputlang];
            }
            fs.writeFile(path.join(__dirname, userConfigName), JSON.stringify(userConfig, null, 2), async function writeJSON(err) {
                if (err) return console.log(err);
                await interaction.reply(`You will be translated from ${inputlang} to ${outputlang}`);
            });
        }else{
            if(!abre.includes(inputlang)){
                await interaction.reply(`Input language ${inputlang} does not exist`);
            }
            else if(!abre.includes(outputlang)){
                await interaction.reply(`Output language ${outputlang} does not exist`);
            }
        }


    },
};