const { translateTxt } = require("../utils/translateTxt");
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path')

const userConfigName = '../config/userConfig.json';
const channelConfigName = '../config/channelConfig.json';

let userConfig = JSON.parse(fs.readFileSync(path.join(__dirname, userConfigName), 'utf8'))
let channelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, channelConfigName), 'utf8')) //NEED TO UPDATE????

module.exports = {
    name: 'messageCreate',
    execute(client) {
        // console.log(client);
        if (client.author.bot) return
        
        let user = client.author
        console.log(client.author)
        let userconfig = userConfig[user.id]
        let channelid = client.channelId
        let serverid = client.guildId
        let content = client.content

        console.log(userconfig)
        translateTxt(content, userconfig[1], userconfig[2]).then(res => {
            if(userconfig[1] == '') userconfig[1] = 'Default'
            let x = new EmbedBuilder()
                .setColor(0xb411fa)
                .setTitle(res.translations[0].text)
                .setAuthor({
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    iconURL: client.author.displayAvatarURL(),
                    name: client.author.username+':'
                })
                .setTimestamp()
                .setFooter({ text: userconfig[1] + ' To ' + userconfig[2] })
            client.channel.send({ embeds: [x] });
        })
        console.log(channelid, serverid, content)
    },
};