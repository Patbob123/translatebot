const { translateTxt } = require("../utils/translateTxt");
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')

const userConfigName = '../config/userConfig.json';
const channelConfigName = '../config/channelConfig.json';


module.exports = {
    name: 'messageCreate',
    execute(client) {
        let userConfig = JSON.parse(fs.readFileSync(path.join(__dirname, userConfigName), 'utf8'))
        let channelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, channelConfigName), 'utf8'))

        // console.log(client);

        let user = client.author
        let userconfig = userConfig[user.id]
        let channelid = client.channelId
        let serverid = client.guildId

        if (user.bot || userconfig == null) return
        if (channelConfig[serverid.toString()] == null) return
        if (!channelConfig[serverid.toString()].includes(channelid) || !userconfig[0]) return

        let content = client.content

        translateTxt(content, userconfig[1], userconfig[2]).then(async res => {
            if (userconfig[1] == '') userconfig[1] = 'Default'
            let embed = new EmbedBuilder()
                .setColor(0xb411fa)
                .setTitle(res.translations[0].text)
                .setAuthor({
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    iconURL: client.author.displayAvatarURL(),
                    name: client.author.username + ':'
                })
                .setTimestamp()
                .setFooter({ text: userconfig[1] + ' To ' + userconfig[2] })
                await client.channel.send({ embeds: [embed] });
        })
        console.log(channelid, serverid, content)
    },
};