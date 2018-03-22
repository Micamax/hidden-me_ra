const Discord = require('discord.js');
const request   = require('request');
const config = require("../config.json", "utf-8");
const fs = require("fs");


exports.run = (client, args, message) => {
    var expr = args.join(' ');
    request({url:`https://jeannie.p.mashape.com/api?input=${expr}&locale=${config.localization.locale}&timeZone=${config.localization.timezoneOffset}&location=${config.localization.coordinates}`,headers: {'X-Mashape-Key': config.mashape.jeannie,'Accept': 'application/json'}}, function (error, response, body) {
      if (error!=null) {
        message.reply(`**ERROR:** Could Not Access Jeannie API`,message);
      }else {
        response = JSON.parse(body);
        if(response.output[0]){
          if (message.channel.type===`dm` || message.channel.permissionsFor(client.user).has('SEND_MESSAGES'))
            message.reply(response.output[0].actions.say.text.substring(0, 2000));
        }else {
          if (message.channel.type===`dm` || message.channel.permissionsFor(client.user).has('SEND_MESSAGES'))
            message.reply(`**Sorry I Couldn't Process What You're Trying To Say.**`);
        }
      }
    });
  }
