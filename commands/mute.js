const Discord = require('discord.js');
const config = require("../config.json", "utf-8");

exports.run = (Bot, message, args) => {
    console.log(message.author.username, "Used Mute");
  let reason = args.slice(1).join(' ');
  let member = message.mentions.members.first();
  let modlog = message.guild.channels.find('name', 'mod-log');
  let muteRole = message.guild.roles.find('name', 'Muted');
  if (!modlog) return message.reply('**I Cannot Find A "mod-log" Channel**').catch(console.error);
  if (!muteRole) return message.reply('**I Cannot Find A "Muted" Role**').catch(console.error);
  if (reason.length < 1) return message.reply('**You Must Supply A Reason For The Mute.**').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('**You Must Mention Someone To Mute Them.**').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
    .setTimestamp()
    .setDescription(`**Action:** Un/mute\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);

  if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('**I Do Not Have The Correct Permissions.**').catch(console.error);

  if (member.roles.has(muteRole.id)) {
    member.removeRole(muteRole).then(() => {
      Bot.channels.get(modlog.id).send({embed}).catch(console.error);
    })
    .catch(e=>console.error("**Cannot Remove Muted Role:** " + e));
  } else {
    member.addRole(muteRole).then(() => {
      Bot.channels.get(modlog.id).send({embed}).catch(console.error);
    })
    .catch(e=>console.error("**Cannot Add Muted Role:** " + e));
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute']
};

exports.help = {
  name: 'mute',
  description: 'mutes or unmutes a mentioned user',
  usage: 'un/mute [mention] [reason]'
};