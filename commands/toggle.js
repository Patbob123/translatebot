const { SlashCommandBuilder } = require('discord.js');

const fs = require('fs');
const path = require('path')

const userConfigName = '../config/userConfig.json';
const channelConfigName = '../config/channelConfig.json';

let userConfig = JSON.parse(fs.readFileSync(path.join(__dirname,userConfigName), 'utf8'))
let channelConfig = JSON.parse(fs.readFileSync(path.join(__dirname,channelConfigName), 'utf8'))

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggle')
        .setDescription('Toggle On/Off')
        .addStringOption((type) =>
            type.setName('type')
                .setDescription('User or Channel')
                .setRequired(false)
                .setAutocomplete(true),
        ),
    async autocomplete(interaction) {
        const option = interaction.options.getFocused(true);
        let choices = ['User', 'Channel']
        let filtered = choices.filter(choice => choice.startsWith(option.value));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        let type = interaction.options.getString('type').toLowerCase();
        let user = interaction.options.member.id;
        let channel = interaction.options.getChannel('target');
        let server = interaction.guild;

        switch (type) {
            case "user":
                if(userConfig.hasOwnProperty(user)) {
                    userConfig[user][0] = !userConfig[user][0]; 
                } else {
                    userConfig[user] = [true, "", "EN"];
                }
                fs.writeFile(path.join(__dirname,userConfigName), JSON.stringify(userConfig, null, 2), async function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(userConfig, null ,2));
                    await interaction.reply(`Toggled User to ${userConfig[user][0]}!`);
                });
                break;
            case "channel":
                let toggled = channelConfig[server].includes(channel);
                if(toggled) {
                    channelConfig[server] = channelConfig[server].filter(cid => cid != channel); 
                } else {
                    channelConfig[server].push(channel);
                }
                fs.writeFile(path.join(__dirname,channelConfigName), JSON.stringify(channelConfig, null, 2), async function writeJSON(err) {
                    if (err) return console.log(err);
                    console.log(JSON.stringify(channelConfig, null ,2));
                    await interaction.reply(`Toggled Channel to ${toggled}!`);
                });

                break;
            default:
                await interaction.reply(`${type} is an invalid option!`);
        }

    },
};