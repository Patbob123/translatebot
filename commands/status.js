const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')

const userConfigName = '../config/userConfig.json';
const channelConfigName = '../config/channelConfig.json';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Check current toggle status')
    ,
    async execute(interaction) {
        console.log(interaction)
        let userConfig = JSON.parse(fs.readFileSync(path.join(__dirname, userConfigName), 'utf8'))
        let channelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, channelConfigName), 'utf8'))

        let userid = interaction.member.id;
        let channelid = interaction.channel.id;
        let serverid = interaction.guild.id;

        let userstatus = userConfig.hasOwnProperty(userid) && userConfig[userid.toString()][0];
        let channelstatus = channelConfig.hasOwnProperty(serverid) && channelConfig[serverid.toString()].includes(channelid);
        let embed = new EmbedBuilder()
            .setColor(0xb411fa)
            .setTitle('Channel: ' + channelstatus + ' | User: ' + userstatus)
            .setAuthor({
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                iconURL: interaction.member.displayAvatarURL(),
                name: interaction.user.username + ':'
            })
        await interaction.channel.send({ embeds: [embed] });

    },
};

