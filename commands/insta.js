const Discord = require('discord.js');
const config = require("../config.json", "utf-8");
const scraper = require('insta-scraper');
const fs = require("fs");

exports.run = (Bot, message, args) => {
  console.log(message.author.username, "Used Insta");
    if (args[0]) {
      if (args[0].startsWith('#')) {
        var hashtag = args[0].slice(1);
        scraper.getMediaByTag(hashtag, function(error,response){
          var post = response.top_posts.nodes[0];
          message.channel.send({embed:new Discord.RichEmbed()
                .setDescription(`https://www.instagram.com/p/${post.code}\n${post.caption}`)
                .setImage(post.display_src)
                .setFooter(`♥ ${post.likes.count} | 💬 ${post.comments.count}`)
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)});
        })
      }else {
        scraper.getAccountInfo(args[0], function(error,response){
          if (response.is_private)
          return message.channel.send({embed:new Discord.RichEmbed()
                .setAuthor(`@${response.username} | ${response.full_name}`,response.profile_pic_url,`https://www.instagram.com/${response.username}`)
                .setDescription(`**ERROR:** User is a private account`)
                .setImage(response.profile_pic_url_hd)
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)});

          for (var i = 0; i < response.media.nodes.length; i++) {
            if (!response.media.nodes[i].is_video) {
              var post = response.media.nodes[i];
              message.channel.send({embed:new Discord.RichEmbed()
                    .setAuthor(`@${response.username} | ${response.full_name}`,response.profile_pic_url,`https://www.instagram.com/${response.username}`)
                    .setDescription(`https://www.instagram.com/p/${post.code}\n${post.caption}`)
                    .setImage(post.display_src)
                    .setFooter(`♥ ${post.likes.count} | 💬 ${post.comments.count}`)
                    .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)});
              break;
            }
          }
          if(i>=response.media.nodes.length) message.channel.send(`**ERROR:** No recent image posts found for @${args[0]}`,message);
        })
      }
    }else {
      message.channel.send(`**Usage:** -insta <username>`,message);
    }
}
