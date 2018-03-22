const Discord = require('discord.js');
const config = require("../config.json", "utf-8");

exports.run = (client, message, args) => {
    console.log(message.author.username, "Used Private Pictures");
    if(message.author.id !== config.ownerID) return message.reply('**You Don\'t Have Permission To Use This Command!** 💝');;
    const secList = [
        "https://media.discordapp.net/attachments/418814608774660098/418823520684867594/xqPQ1i6.jpg?width=221&height=241",
        "https://media.discordapp.net/attachments/418814608774660098/418823078685179904/P17.jpg?width=321&height=241",
        "https://media.discordapp.net/attachments/418814608774660098/418823045034278912/P15.jpg?width=136&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418823044463591434/Melkormancin-chat-with-Janice-6.jpg?width=254&height=241",
        "https://media.discordapp.net/attachments/418814608774660098/418823036251406336/GearUp3.jpg?width=242&height=241",
        "https://media.discordapp.net/attachments/418814608774660098/418823034091339776/GearUp.jpg?width=253&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418823018211704832/Gearup2.jpg?width=181&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418823002205978635/P22.jpg?width=259&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418822978239725569/P19.jpg?width=253&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418822454065102848/download.jpg?width=154&height=211",
        "https://media.discordapp.net/attachments/418814608774660098/418822453335425024/download_2.jpg?width=154&height=211",
        "https://media.discordapp.net/attachments/418814608774660098/418822453184430091/c-16.jpg?width=207&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418822426693206016/CrJ7LHxXYAERtEa.jpg?width=241&height=241",
        "https://media.discordapp.net/attachments/418814608774660098/418816178455052289/0b2a3508a32110fac5b267f765b1519f.png?width=190&height=241",
        "https://media.discordapp.net/attachments/418814608774660098/418815894303801364/c-4.jpg?width=179&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418815874191982592/c-9.jpg?width=276&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418815236980736001/39499d29cafeccb6e78fed2e03140804.jpg?width=185&height=240",
        "https://media.discordapp.net/attachments/418814608774660098/418815177920610325/88c227e4bf95da5ee2af57f659e7aa62.jpg?width=135&height=240"

    ]
    const result = Math.floor((Math.random() * secList.length) + 0)
    const secThis = {};
        const embed = new Discord.RichEmbed()
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
        .setImage(secList[result])
        message.channel.send(`**🎀 ${message.author}💋 This Is Secret Picture Of Mine!**🎀`)
        message.channel.send(embed)
}

