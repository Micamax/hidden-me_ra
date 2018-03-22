const Discord = require('discord.js');
const config = require("../config.json", "utf-8");
const fs = require("fs");

exports.run = (client, message) => {
  console.log(message.author.username, "Used RandomUser");
      var user = randomMem(message);
      message.reply(message, '**The Random Chosen User Is: **' + user);
function randomMem() {
    const memeberNum = Math.floor((Math.random() * message.guild.members.size));
    const newMems = Array.from(message.guild.members);
    const findMem = message.guild.members.get(newMems[memeberNum][0]);
    return member = findMem ? findMem : null;
  };
  const invader = randomMem();
}