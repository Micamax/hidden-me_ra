const Discord = require('discord.js');
const fortnite = require('fortnite.js');
const config = require("../config.json", "utf-8");
const Fortnite = new fortnite('27e6c558-7e51-47a0-bcb6-c2d1493700ca');
const platforms = ['PC', 'XBOX', 'PS4'];
const fs = require('fs');

exports.run = (client, msg, args, query, fort) => {
    console.log(msg.author.username, "Used FStats");

    function platform(query, fort) {
        if(query == 'PC') return fort.PC;
        else if(query == 'XBOX') return fort.XBOX;
        else if(query == 'PS4') return fort.PS4;
    }

    const q = args.join(" ");
    const emb = new Discord.RichEmbed();
    if(q.startsWith('player')) {
        fullStats = q.replace('player', '').trim();
        allStats = fullStats.split(" ");
        if(!allStats[0]) {
            msg.channel.startTyping();
            emb.setColor(`${msg.guild.me.displayHexColor!=='#000000' ? msg.guild.me.displayHexColor : config.hexColour}`);
            emb.addField('Platform Not Defined', 'List Of Platforms: `pc, ps4, xbox`');
            emb.setFooter(msg.author.tag, msg.author.avatarURL);
            msg.channel.stopTyping();
            msg.channel.send({embed:emb});
        } else if(!platforms.includes(allStats[0].toUpperCase())) {
            msg.channel.startTyping();
            emb.setColor(`${msg.guild.me.displayHexColor!=='#000000' ? msg.guild.me.displayHexColor : config.hexColour}`);
            emb.addField('Invalid Platform', 'List Of Platforms: `pc, ps4, xbox`');
            emb.setFooter(msg.author.tag, msg.author.avatarURL);
            msg.channel.stopTyping();
            msg.channel.send({embed:emb});
        } else if(!allStats[1]) {
            msg.channel.startTyping();
            emb.setColor(`${msg.guild.me.displayHexColor!=='#000000' ? msg.guild.me.displayHexColor : config.hexColour}`);
            emb.addField('Username Not Defined', 'Try Again With A Valid Username');
            emb.setFooter(msg.author.tag, msg.author.avatarURL);
            msg.channel.stopTyping();
            msg.channel.send({embed:emb});
        } else if(platforms.includes(allStats[0].toUpperCase())) {
            platf = allStats[0];
            plat = platform(platf.toUpperCase(), Fortnite);
            player = fullStats.replace(platf, '').trim();
            Fortnite.get(player, plat).then(async function (p) {
                await msg.channel.startTyping();
                await emb.setAuthor('Stats About '+p.displayName, 'https://i.imgur.com/IMjozOI.jpg');
                await emb.setColor(`${msg.guild.me.displayHexColor!=='#000000' ? msg.guild.me.displayHexColor : config.hexColour}`);
                await emb.setThumbnail('https://i.imgur.com/IMjozOI.jpg');
                await emb.addField('General', `Score: ${p.stats.score}\nKills: ${p.stats.kills}\nMatches: ${p.stats.matches}\nTop 1: ${p.stats.top1}\nTop 3: ${p.stats.top3}\nTop 5: ${p.stats.top5}\nTop 25: ${p.stats.top25}\nK/D: ${p.stats.kd}\nTime Played: ${p.stats.timePlayed}`);
                await emb.setFooter(msg.author.tag, msg.author.avatarURL);
                await msg.channel.stopTyping();
                await msg.channel.send({embed:emb});
            });
        }
    } else if(!args[0]) {
        msg.channel.startTyping();
        emb.setColor(`${msg.guild.me.displayHexColor!=='#000000' ? msg.guild.me.displayHexColor : config.hexColour}`);
        emb.setAuthor('Fortnite Commands', 'https://i.imgur.com/IMjozOI.jpg');
        emb.setThumbnail('https://i.imgur.com/IMjozOI.jpg');
        emb.addField('`player`', "Search For A Player's Stats\nUsage: `-fstats player [Platform] [Username]`\n\nValid Platforms: `pc, ps4, xbox`");
        emb.setFooter(msg.author.tag, msg.author.avatarURL);
        msg.channel.stopTyping();
        msg.channel.send({embed:emb});
    }
}

exports.command = {
    name: "Fortnite",
    fullCmd: "-fstats",
    description: "Shows Stats In Fortnite",
    hidden: false
}