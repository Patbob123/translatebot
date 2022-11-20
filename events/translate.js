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

        let userid = client.author.id
        let userconfig = userConfig[userid]
        let channelid = client.channelId
        let serverid = client.guildId
        let content = client.content

        console.log(userconfig)
        translateTxt(content, userconfig[1], userconfig[2]).then(res => {
            if(userconfig[1] == '') userconfig[1] = 'Default'
            let x = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(res.translations[0].text)
                .setTimestamp()
                .setFooter({ text: userconfig[1] + ' To ' + userconfig[2] });
            // client.channel.send({ embeds: [translationEmbed] });
            client.channel.send({ embeds: [x] });
        })
        console.log(userid, channelid, serverid, content)
    },
};