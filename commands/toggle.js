const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')

const userConfigName = '../config/userConfig.json';
const channelConfigName = '../config/channelConfig.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggle')
        .setDescription('Toggle Channel or User On/Off')
        .addStringOption((type) =>
            type.setName('type')
                .setDescription('User or Channel')
                .setRequired(true)
                .setAutocomplete(true),
        ),
    async autocomplete(interaction) {
        const option = interaction.options.getFocused();
        let choices = ['user', 'channel']
        let filtered = choices.filter(choice => choice.startsWith(option));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        let userConfig = JSON.parse(fs.readFileSync(path.join(__dirname,userConfigName), 'utf8'))
        let channelConfig = JSON.parse(fs.readFileSync(path.join(__dirname,channelConfigName), 'utf8'))
        
        let type = interaction.options.getString('type').toLowerCase();
        let user = interaction.member.id;
        let channel = interaction.channel.id;
        let server = interaction.guild.id;

        switch (type) {
            case "user":
                if(userConfig.hasOwnProperty(user)) {
                    userConfig[user][0] = !userConfig[user][0]; 
                } else {
                    userConfig[user] = [true, "", "EN"];
                }
                fs.writeFile(path.join(__dirname,userConfigName), JSON.stringify(userConfig, null, 2), async function writeJSON(err) {
                    if (err) return console.log(err);
                    await interaction.reply(`Toggled User to ${userConfig[user][0]}!`);
                });
                break;
            case "channel":
                let toggled = true;
                if(channelConfig.hasOwnProperty(server)) {
                    toggled = channelConfig[server].includes(channel);
                    if(toggled) {
                        channelConfig[server] = channelConfig[server].filter(cid => cid != channel); 
                    } else {
                        channelConfig[server].push(channel);
                    }
                    toggled = !toggled
                } else {
                    channelConfig[server] = [channel];
                }
                fs.writeFile(path.join(__dirname,channelConfigName), JSON.stringify(channelConfig, null, 2), async function writeJSON(err) {
                    if (err) return console.log(err);
                    await interaction.reply(`Toggled Channel to ${toggled}!`);
                });

                break;
            default:
                await interaction.reply(`${type} is an invalid option!`);
        }

    },
};