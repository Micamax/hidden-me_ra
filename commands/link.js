const Discord = require('discord.js');

exports.run = (client,message) => {
  console.log(message.author.username, "Used Link");
  client.generateInvite(8).then(link => {
    message.channel.send({embed:new Discord.RichEmbed()
      .setDescription(`**[LINK](${link}) - Invite Me To Your Server! :sparkling_heart:**`)
      .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)});
  });
}