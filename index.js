const Discord = require('discord.js');
const Music = require('discord.js-musicbot-addon');
const settings = require('./settings.json');
const weather = require('weather-js');
const Bot = new Discord.Client();
const prefix = '-';
const config = require("./config.json");
const music = new Music(Bot, {
    prefix: "--",
    maxQueueSize: "100",
    disableLoop: true,
    thumbnailType: 'high',
    leaveHelp: "To leave the voice channel.",
    leaveAlt: ["left","kick","go out"],
    helpCmd: 'help',
    playCmd: 'play',
    volumeCmd: 'volume',
    leaveCmd: 'leave',
    ownerOverMember: true,
    botOwner: '389744080067756043',
    youtubeKey: 'AIzaSyAAbLrvqq6kOeGVxEHusBxjo5-Xnr603jI'
  });

var guild = ('');

Bot.on("message", message => {
    if (message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
  
    // This is the best way to define args. Trust me.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // The list of if/else is replaced with those simple 2 lines:
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(Bot, message, args);
    } catch (err) {
      console.error();
    }
  });

Bot.on('guildMemberAdd', function(member) {
	member.guild.channels.find("name", "mod-log").sendMessage(`**Welcome, ${member} To  ${member.guild.name}!**`);
    member.addRole(member.guild.roles.find("name", "Members"));
})

Bot.on('guildMemberRemove', function(member) {
	member.guild.channels.find("name", "mod-log").sendMessage(`**See You Later Buddy, ${member} Left ${member.guild.name}!**`);
})

Bot.on('message', message => {
    
    if (!message.content.startsWith(config.prefix)) return;
    let command = message.content.split(' ')[0].slice(config.prefix.length);
    if (command === 'ping') {
      message.channel.send('Pinging...').then(msg => {
        msg.edit(`**Response took:** \`(${msg.createdTimestamp - message.createdTimestamp}ms)\``);
      });
    };

});

Bot.on("ready", () => {
    console.log("I Am Ready!");
    Bot.user.setActivity("Your Future", { type: 'WATCHING' })
});

Bot.on('ready', () => {
    console.log(`Logged in as ${Bot.user.tag}!`);
});

Bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
});

Bot.on('message', message => {
    if(message.content.split(' ')[0] == '-sm')
        message.guild.members.forEach(member => {
            if(!message.member.hasPermission("ADMINISTRATOR")) return;
            member.send(`${member} ! ` + "**" + message.guild.name + " : ** " + message.content.substr(3));
            message.delete();
        });

    var prefix = "-";
    var args = message.content.substring(prefix.length).split(" ");
    if(message.content.startsWith(prefix + "sm")) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(!args[1]) {
            let embed3 = new Discord.RichEmbed()
                .setDescription(":white_check_mark: | Message Has Been Sent Empty")
                .setColor("#FF0000")
            message.channel.sendEmbed(embed3);
        } else {
            let embed4 = new Discord.RichEmbed()
                .setDescription(':white_check_mark: | Message Has Been Sent Successfully')
                .setColor("#008000")
            message.channel.sendEmbed(embed4);
            message.delete();
        }
    }


    if(message.content.startsWith("-userinfo")) {
                 if(!message.channel.guild) return message.reply('** This Command Only For Servers.**');
 
    let member = message.mentions.members.first();
        if(!member)
            return message.reply("**Please Mention A Valid Member Of This Server.**");

                var mentionned = message.mentions.users.first();
     var mentionavatar;
       if(mentionned){
           var mentionavatar = mentionned;
       } else {
           var mentionavatar = message.author;
           
       }
    let embed = new Discord.RichEmbed()
   .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
    .setThumbnail(`${mentionavatar.avatarURL}`)
   .addField("Name:",`<@` + `${mentionavatar.id}` + `>`, true)
   .addField('Discrim:',"#" +  `${mentionavatar.discriminator}`, true)
    .addField("ID:", `${mentionavatar.id}`, true)
   .addField("Create At:",`${mentionavatar.createdAt}`, true)
   .addField("Joined At:",`${message.member.joinedAt}` , true)
      
      
   message.channel.sendEmbed(embed);
   console.log('[id] Send By: ' + message.author.username)
     }


    if(message.content === "-roles") {
        var roles = message.guild.roles.map(roles => `${roles.name}, `).join(' ')
        const embed = new Discord.RichEmbed()
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
        .addField('Roles:',`**[${roles}]**`)
        message.channel.sendEmbed(embed);
    }


    if(message.content === "-serverinfo") {
        const embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
        .setThumbnail('https://media.discordapp.net/attachments/413313279268487170/413326734436597780/photo.jpg?width=216&height=216')
        .setDescription("`Server Information`")
        .addField("**Owner:**", message.guild.owner)
        .addField("**Server Name:**", message.guild.name)
        .addField("**Server ID:**", message.guild.id)
        .addField("**Total Members:**", message.guild.memberCount)
        .addField("**Region:**", message.guild.region)
        .addField("**Verification Level:**", message.guild.verificationLevel)
        .addField("**Date created:**", message.guild.createdAt)
        .addField("**Roles:**", 'To See A List With All Roles Use *-roles*')
        message.channel.send({embed});
    }

    if(message.content.startsWith("-pic")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers.**');

        let member = message.mentions.members.first();
        if(!member)
        return message.reply("**Please Mention A Valid Member Of This Server.**");

       var mentionned = message.mentions.users.first();
       var mentionavatar;

       if(mentionned){
        var mentionavatar = mentionned;
    } else {
        var mentionavatar = message.author;
    }
    let embed = new Discord.RichEmbed()
    .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
    .setThumbnail(`${mentionavatar.avatarURL}`)
    message.channel.sendEmbed(embed);
    console.log('[id] Send By: ' + message.author.username)
    }
      
    const CLEAR_MESSAGES = '-clear';
    if (message.content == CLEAR_MESSAGES) {


      if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
        console.log("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
        return;
      } else if (!message.channel.permissionsFor(Bot.user).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
        console.log("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
        return;
      }

      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length;

            message.channel.sendMessage("Deletion of messages successful. Total messages deleted: "+messagesDeleted);
            console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
          });
      }
    }

    if (message.content.startsWith(prefix + 'say')) { 
        if (!message.member.roles.some(r=>["👑 Owners"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!");
        var sayMessage = message.content.substring(4)
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }

    var args = message.content.substring(prefix.length).split(" ");
    if (message.content.startsWith(prefix + "clear")) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('⚠ | **You Dont Have The Permission To Do This!**');
        var msg;

        msg = parseInt();
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        message.channel.sendMessage("", {embed: {
            title: "**Done Deleting The Chat.**",
            color: `${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`,
            description: "**Done Deleting The Messages.**",
            footer: {
            }
        }}).then(msg => {msg.delete(3000)});
    }

    if (message.content.startsWith("-avatar")){
        let member = message.mentions.members.first();
        if(!member)
        return message.reply("**Please mention a valid member of this server**");
        var mentionned = message.mentions.users.first();
        var mentionavatar;
 
        if(mentionned){
         var mentionavatar = mentionned;
     } else {
         var mentionavatar = message.author;
     }
      message.channel.send(mentionavatar.avatarURL);
     }

    if (message.content.startsWith("-myavatar")){
        message.channel.send(message.author.avatarURL);
      }

      if(message.content.startsWith(prefix + "uptime")) {
		var days = Math.floor(Bot.uptime / 86400000000000)
		var hours = Math.floor(Bot.uptime / 3600000)
		var minutes = Math.floor((Bot.uptime % 3600000) / 60000)
		var seconds = Math.floor(((Bot.uptime % 360000) % 60000) / 1000)
		const embed = new Discord.RichEmbed()
		.setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
		.addField('**Uptime**', `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
		message.channel.send(embed)
	}

	if(message.content.startsWith(prefix + "guilds")) {
		message.reply(`Type **${prefix}**help for help | **${Bot.guilds.size}** guilds`)
    }

    if(message.content.startsWith(prefix + "myid")) {
		message.reply(`Your ID Is: **${message.author.id}**`)
    }

    if (message.content.startsWith(prefix + 'credits')) {
        message.channel.send("m").then(sentMessage => sentMessage.edit(":regional_indicator_m:"));
        message.channel.send("mi").then(sentMessage => sentMessage.edit(":regional_indicator_m: :regional_indicator_i:"));
        message.channel.send("mic").then(sentMessage => sentMessage.edit(":regional_indicator_m: :regional_indicator_i: :regional_indicator_c:"));
        message.channel.send("mica").then(sentMessage => sentMessage.edit(":regional_indicator_m: :regional_indicator_i: :regional_indicator_c: :regional_indicator_a:"));
    }

    if(message.content === prefix + "help") {
        let embed = new Discord.RichEmbed()
        .setTitle('**General Command\'s:**')
        .setDescription('```prefix: Tells You the Prefix Of The Bot```')
        .addField("**-userinfo:**", " Shows A Account Info.")
        .addField("**-roles:**", " Shows All Roles At The Server.")
        .addField("**-serverinfo:**", " Shows Server Information.")
        .addField("**-ping:**", " Shows If The Bot Respond.")
        .addField("**-avatar:**", " Shows Someones Avatar In Big Size.")
        .addField("**-weather c/f:**", "To See Your Weather At Your Country c=celsius f=fahrenheit.")
        .addField("**-uptime:**", " To See How Long The Bot Was Awake.")
        .addField("**-myid:**", " To See Your ID.")
        .addField("**-roll:**", "Rolls A Number From 1-100")
        .addField("**-flip & -coin & -coinflip:**", "Flips A Coin")
        .addField("**-quote:**", "Shows Random Famous Quote")
        .addField("**-hug:**", "Shows Love To Someone.")
        .addField("**-kiss:**", "Kiss The Person You Love.")
        .addField("**-game tf:**", "True And False Game.")
        .addField("**-google:**", "Google Search With This Command.")
        .addField("**-dm:**", "Private Message Someone With The Bot \(Permission NEEDED\).")
        .addField("**-servers & -bservers & -guilds:**", "Shows How Many Servers The Bot Is In.")
        .addField("**-clear:**", "Clear Many Messages At Once.")
        .addField("**-insta:**", "Show Last Picture From Insta At Someones Profile.")
        .addField("**-fstats:**", "Shows You Your Fortnite Stats.")
        .addField("**-mute:**", "Mutes The Mention Person.")
        .addField("**-nsfw help:**", "For NSFW Commands.")
        .addField("**--help**", "For Music Commands.")
        .addField("Join Our Server", "(https://discord.gg/3M9PV4r)") 
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
        message.channel.sendEmbed(embed);
      }

    if(message.content === "-hi")  {
    message.reply('Hello');
    }

    if(message.content === "prefix")  {
        message.reply('**The Prefix Is: "-"**');
        }

    if(message.content.split(' ')[0] == '-dm')
    message.mentions.users.forEach(member => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        member.send(`@${message.author.tag}! ` + "**" + message.guild.name + " : ** " + message.content.substr(3));
        message.mentions.users.delete();
        message.delete();
    });
    var args = message.content.substring(prefix.length).split(" ");
    if(message.content.startsWith(prefix + "dm")) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
         if(!args[1]) {
            let embed3 = new Discord.RichEmbed()
                .setDescription(":white_check_mark: | Message Has Been Sent Empty")
                .setColor("#FF0000")
             message.channel.sendEmbed(embed3);
        } else {
            let embed4 = new Discord.RichEmbed()
                .setDescription(':white_check_mark: | Message Has Been Sent Successfully')
                .setColor("#008000")
            message.channel.sendEmbed(embed4);
            message.delete();
        }
    }
 
    if (message.content === "-roll") {
        var result = Math.floor((Math.random() * 100) + 1);
        message.channel.send("**You Rolled A: **" + result);
    }    

    if (message.content === "-flip") {
    	var result = Math.floor((Math.random() * 2) + 1);
    	if (result == 1) {
    		message.channel.send("**The Coin Landed On Heads!**");
    	} else if (result == 2) {
    		message.channel.send("**The Coin Landed on Tails!**");
    	}
    }

    if (message.content === "-coin") {
    	var result = Math.floor((Math.random() * 2) + 1);
    	if (result == 1) {
    		message.channel.send("**The Coin Landed On Heads!**");
    	} else if (result == 2) {
    		message.channel.send("**The Coin Landed on Tails!**");
    	}
    }

    if (message.content.startsWith(prefix + 'weather c')) {

        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
            if (err) message.channel.send(err);

            if (result.length === 0) {
                message.channel.send('**Please Enter A Valid Location.**')
                return;
            }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
                .addField('Timezone',`UTC${location.timezone}`, true) 
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)

                message.channel.send({embed});
        });
    }

    if (message.content.startsWith(prefix + 'weather f')) {

        weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
            if (err) message.channel.send(err);
            if(message.channel.name == undefined)  {
            if (result.length === 0) {
                message.channel.send('**Please Enter A Valid Location.**')
                return;
            }
        }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
                .addField('Timezone',`UTC${location.timezone}`, true) 
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)

                message.channel.send({embed});
        });
    }

//    let swears = ["faggot", "cunt", "asshole", "fapping", "fap", "fuck", "ass", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings",
//    "fag", "flange", "fook", "fooker", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fistfucks", "goatse",
//    "fagot", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs",
//    "god-damned", "goddamn", "goddamned", "hardcoresex", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off",
//    "jism", "jiz", "jizm" , "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums",
//    "kunilingus", "l3i+ch", "l3itch", "labia", "lmfao", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*",
//    "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked",
//    "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff",
//    "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob",
//    "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex",
//    "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing",
//    "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming",
//    "b i t c h", "bitch", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+",
//    "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings",
//    "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "titfuck",
//    "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra",
//    "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "xrated", "xxx", "f u c kmothafucker", "mothafuckers", "mothafuckin", "mothafucking",
//    "mothafuckings", "mothafucks", "gaylord", "gaysex", "goatse", "suckmydick", "dick", "middlefinger", "cock", "lickmycock", "suckmycock", "bigdick", "boobs", "gay", "hoe", "hoes",
//    "kos", "kosomk", "kos omk", ]
//    if(swears.some(sw => message.content.toLowerCase().includes(sw))) {
//        message.delete()
//        message.channel.send(`${message.author}**, Swearing Is Not Allowed Here!**`)
//    }

    if(message.content.startsWith(prefix + 'game tf')) {

        let randnum_game = Math.floor(Math.random() * 2)
    
        if (randnum_game == 0) {
    
            const embed = new Discord.RichEmbed()
            .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
            .setDescription(" :white_check_mark: **True**")
            .setFooter('True Or False Game')
            message.channel.send({embed}).catch(console.error)
    
        }else if(randnum_game == 1) {
    
            const embed = new Discord.RichEmbed()
            .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
            .setDescription(" :negative_squared_cross_mark: **False**")
            .setFooter('True Or False Game')
            message.channel.send({embed}).catch(console.error)
        }
    }

    if (message.content.startsWith('-google')) {
        args.shift()
        message.reply('https://www.google.com/#q=' + args.join('+'))
    }

    var choices = [];

    if (message.content.split(' ')[0] == prefix + "choice") {
		tempcnt = message.content.replace(prefix + "choice", "")
		choices = tempcnt.split(',')


		var choice = choices[Math.floor(Math.random() * choices.length)];

		if (choice) {

			message.channel.sendMessage("**I Choose `" + choice + "`!**")
		}
		choices = []
		tempcnt = undefined
		return
	}

    if (message.content.startsWith('-tableflip')) {
        message.reply('**(╯°□°）╯︵ ┻━┻**')
    }

//    if (message.content.startsWith(prefix + 'fstats')) {
//        args.shift()
//        message.reply(`https://stats-fortnite.com/profil/${args.join('/')}`)
//   }
    
});

//    var profanities = require('profanities')

//    for(x = 0; x < profanities.length; x++) {
//        if(message.content.toUpperCase() == profanities[x].toUpperCase()) {
//            message.reply(`You Have Been Warned For Using Innappropriate Language.`)
//            message.delete();
//            return;
//        }
//    }

//  This is when you want to let people post numbers only in a specific channel.
//    if (message.channel.id === 'CHANNELID HERE') {
//        if(isNaN(message.content)) {
//        message.delete();
//        message.author.send('Please Only Post The Number, And Not Any Other Text In This Channel, Thank You!')
//       }
//    }

Bot.on("message", function(message) {
    if(message.channel.name == undefined)  {
    console.log(message.channel.type + ": " + message.author.tag + " : " + message.content);
    Bot.channels.get('409429639333675014').send(message.channel.type + ": " + "@"+message.author.tag + " : " + message.content);
    }
});

Bot.on('message', (message) => {
    const msg = message.content.trim()
	if(msg.toLowerCase().startsWith(prefix + 'kiss')) {
		const kissList = [
			"https://media.giphy.com/media/dP8ONh1mN8YWQ/giphy.gif",
			"https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif",
			"https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
			"https://media.giphy.com/media/wf4UuPMYnwBck/giphy.gif",
			"https://media.giphy.com/media/CzCi6itPr3yBa/giphy.gif",
			"https://media.giphy.com/media/12VXIxKaIEarL2/giphy.gif",
			"https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif",
			"https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif",
			"https://media.giphy.com/media/K4VEsbuHfcj6g/giphy.gif",
			"https://media.giphy.com/media/xiOfpOVHblXOg/giphy.gif",
			"https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
			"https://media.giphy.com/media/oHZPerDaubltu/giphy.gif",
			"https://media.giphy.com/media/OSq9souL3j5zW/giphy.gif",
            "https://media.giphy.com/media/7eQ8Ky3dAsRYA/giphy.gif",
            "https://media.giphy.com/media/xThuW9jvttjddtv2RG/giphy.gif",
            "https://media.giphy.com/media/VXsUx3zjzwMhi/giphy.gif"
		]
		const result = Math.floor((Math.random() * kissList.length) + 0)
		const kissThis = message.mentions.users.first()
		if(!kissThis) {
			message.channel.send('Aw, that\'s sad... You don\'t have anyone to kiss...')
		} else if(kissThis.id == Bot.user.id) {
			message.channel.send('*Don\'t even try to kiss me... I\'m a bot...*')
		} else if(kissThis.id == message.author.id) {
			message.channel.send('Aw, you\'re lonely....')
		} else {
			const embed = new Discord.RichEmbed()
			.setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
			.setImage(kissList[result])
			message.channel.send(`:heart: ${kissThis} was kissed by ${message.author}! :heart:`)
			message.channel.send(embed)
		}
    }

    if(msg.toLowerCase().startsWith(prefix + 'hug')) {
		const huggles = [
			"https://media.giphy.com/media/kvKFM3UWg2P04/giphy.gif",
			"https://media.giphy.com/media/wnsgren9NtITS/giphy.gif",
			"https://media.giphy.com/media/HaC1WdpkL3W00/giphy.gif",
			"https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif",
			"https://media.giphy.com/media/LWTxLvp8G6gzm/giphy.gif",
			"https://media.giphy.com/media/EvYHHSntaIl5m/giphy.gif",
			"https://media.giphy.com/media/llmZp6fCVb4ju/giphy.gif",
			"https://media.giphy.com/media/3oEjI72YdcYarva98I/giphy.gif",
			"https://media.giphy.com/media/OiKAQbQEQItxK/giphy.gif",
			"https://media.giphy.com/media/l2JJOsEYzQbtvV0A0/giphy.gif",
            "https://media.giphy.com/media/l2JJySFVazmR38Lks/giphy.gif",
            "https://cdn.weeb.sh/images/r1R3_d7v-.gif",
            "https://cdn.weeb.sh/images/rko9O_mwW.gif",
            "https://cdn.weeb.sh/images/ryPix0Ft-.gif",
            "https://cdn.weeb.sh/images/ryMqdOXvZ.gif",
            "https://cdn.weeb.sh/images/BJF5_uXvZ.gif",
            "https://cdn.weeb.sh/images/rk6PsvOUM.gif",
            "https://cdn.weeb.sh/images/ByPGRkFVz.gif",
            "https://media.giphy.com/media/iMrHFdDEoxT5S/giphy.gif",
            "https://media.giphy.com/media/sX755wvr2Q6gE/giphy.gif",
            "https://media.giphy.com/media/f6y4qvdxwEDx6/giphy.gif",
            "https://media.giphy.com/media/5QXd9CLYmU944/giphy.gif",
            "https://media.giphy.com/media/hGjhjaBBc7zyg/giphy.gif",
            "https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif",
            "https://media.giphy.com/media/l46Ct8dnc7vaiz7k4/giphy.gif",
            "https://media.giphy.com/media/ztXa20eZi18oo/giphy.gif",
            "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
            "https://media.giphy.com/media/Dc9AyUMrBKvkI/giphy.gif",
            "https://media.giphy.com/media/l49JL3jokhUC60Qp2/giphy.gif",
            "https://media.giphy.com/media/l49JHieoCywZnaiC4/giphy.gif",
            "https://media.giphy.com/media/q3kYEKHyiU4kU/giphy.gif",
            "https://media.giphy.com/media/LIqFOpO9Qh0uA/giphy.gif",
            "https://media.giphy.com/media/nuCFgM2jSSbsY/giphy.gif",
            "https://media.giphy.com/media/l0HlGu6yGT8X51Gko/giphy.gif",
            "https://media.giphy.com/media/3o6ZsU3d4WZ4wX5oQ0/giphy.gif",
            "https://media.giphy.com/media/JGNmo9nBmmy8U/giphy.gif",
            "https://media.giphy.com/media/RmUNTnlaJVLjy/giphy.gif",
            "https://media.giphy.com/media/eMpDBxxTzKety/giphy.gif",
            "https://media.giphy.com/media/GcJN2Dz5XMDeM/giphy.gif",
            "https://media.giphy.com/media/lXiRKBj0SAA0EWvbG/giphy.gif",
            "https://media.giphy.com/media/SlKL25wtiqnXG/giphy.gif",
            "https://media.giphy.com/media/NiJsjJng3IPK/giphy.gif",
            "https://media.giphy.com/media/HjlKKc14d5tBK/giphy.gif",
            "https://media.giphy.com/media/xT39CXg70nNS0MFNLy/giphy.gif",
            "https://media.giphy.com/media/1xne60wzrdpy7szbhP/giphy.gif",
            "https://media.giphy.com/media/16bJmyPvRbCDu/giphy.gif",
            "https://media.giphy.com/media/8KKRIP5ZHUo2k/giphy.gif",
            "https://media.giphy.com/media/26FeTvBUZErLbTonS/giphy.gif",
            "https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif",
            "https://media.giphy.com/media/3o7TKzhTnnkuBU03Dy/giphy.gif",
            "https://media.giphy.com/media/yidUzriaAGJbsxt58k/giphy.gif",
            "https://media.giphy.com/media/bbxTrFmeoM7aU/giphy.gif",
            "https://media.giphy.com/media/l41YzyKroVv69cTmw/giphy.gif",
            "https://media.giphy.com/media/SKjrGSWO9WTxC/giphy.gif",
            "https://media.giphy.com/media/xUOxfb8r3BhgPpfyKs/giphy.gif",
            "https://media.giphy.com/media/xT1XGNlkcBDSqkCRqg/giphy.gif",
            "https://media.giphy.com/media/3o6ozoxybUNWdzIJl6/giphy.gif",
            "https://media.giphy.com/media/3o6ozthpyPfmo0B5S0/giphy.gif",
            "https://media.giphy.com/media/xUA7aRqI2oCIBsGI6c/giphy.gif",
            "https://media.giphy.com/media/xUOxeRc6xGntIwmtck/giphy.gif",
            "https://media.giphy.com/media/3o6Ei1wg93AOY7OorS/giphy.gif",
            "https://media.giphy.com/media/3ohs87wRnK1DErffhK/giphy.gif",
            "https://media.giphy.com/media/vaXnKwhc4cAQU/giphy.gif",
            "https://media.giphy.com/media/3o7WTDVMidWRDzP9ss/giphy.gif",
            "https://media.giphy.com/media/26ybvIKLuiPUQWL8A/giphy.gif",
            "https://media.giphy.com/media/l3vRnzEG1ShPsEUbm/giphy.gif",
            "https://media.giphy.com/media/LuSeshH6YcgZq/giphy.gif",
            "https://media.giphy.com/media/13fQ3RrUjteykw/giphy.gif",
            "https://media.giphy.com/media/yj3wsE2zSIgUg/giphy.gif",
            "https://media.giphy.com/media/NADvz1Co9e6Ag/giphy.gif",
            "https://media.giphy.com/media/3oKIP9Mkgy0ninvQ0U/giphy.gif",
            "https://media.giphy.com/media/mmPgxbuPiwCQg/giphy.gif",
            "https://media.giphy.com/media/OGJ9dt4qelBcc/giphy.gif",
            "https://media.giphy.com/media/xT8qBajgkwehpxK2C4/giphy.gif",
            "https://media.giphy.com/media/3orif4GiUWcvnswkp2/giphy.gif",
            "https://media.giphy.com/media/zg3Q7tLi8Pvzy/giphy.gif",
            "https://media.giphy.com/media/26ueYYGwf9Z3PTML6/giphy.gif",
            "https://media.giphy.com/media/l2JJySFVazmR38Lks/giphy.gif",
            "https://media.giphy.com/media/KnOohm4xGRYhq/giphy.gif",
            "https://media.giphy.com/media/l1IY5d7ELI7n7LjZm/giphy.gif",
            "https://media.giphy.com/media/3oEduSMkqjEZAyEicM/giphy.gif",
            "https://media.giphy.com/media/26BkMadvsqSlAJdkY/giphy.gif",
            "https://media.giphy.com/media/NhjPhBQIIxdxm/giphy.gif",
            "https://media.giphy.com/media/3og0IyIg2UoCdFF5QI/giphy.gif",
            "https://media.giphy.com/media/aHOY4460FDyvu/giphy.gif",
            "https://media.giphy.com/media/jcFDdElMC76iA/giphy.gif",
            "https://media.giphy.com/media/3ornk0ndWxpVYILAVq/giphy.gif",
            "https://media.giphy.com/media/3oriNWfntn0yXfOW6A/giphy.gif",
            "https://media.giphy.com/media/xT0Gqne4C3IxaBcOdy/giphy.gif",
            "https://media.giphy.com/media/l0HlGe44Eb5RbCGrK/giphy.gif",
            "https://media.giphy.com/media/l0IydkaUjXhILjAfS/giphy.gif",
            "https://media.giphy.com/media/3o85xnPtjqvRGaXcv6/giphy.gif",
            "https://media.giphy.com/media/3o7TKIPzE4QzCzL5C0/giphy.gif",
            "https://media.giphy.com/media/SKElG8dQWhPdS/giphy.gif",
            "https://media.giphy.com/media/YXgI86hgbKwZW/giphy.gif",
            "https://media.giphy.com/media/26tPdTuK5IwvzmUz6/giphy.gif",
            "https://media.giphy.com/media/26AHPeO7icaHU0pVK/giphy.gif",
            "https://media.giphy.com/media/W4NKtcOqK2kYo/giphy.gif",
            "https://media.giphy.com/media/3o72F89yqg2Q75Bq1i/giphy.gif",
            "https://media.giphy.com/media/3ofT5JY1nmKwm3u0PC/giphy.gif",
            "https://media.giphy.com/media/3o8doQ4HDvWDKejY7m/giphy.gif",
            "https://media.giphy.com/media/3ohA2FDfxocCRYTlrW/giphy.gif",
            "https://media.giphy.com/media/l2JHYixjdiaZ1rpew/giphy.gif",
            "https://media.giphy.com/media/26BRsVk2noIIPHjKU/giphy.gif",
            "https://media.giphy.com/media/RwqaViy1n3c4w/giphy.gif",
            "https://media.giphy.com/media/l0ExvoBUC5Sq3elSo/giphy.gif",
            "https://media.giphy.com/media/LqiOcbtrCyIDK/giphy.gif",
            "https://media.giphy.com/media/l2JJGBWmyUECYAcow/giphy.gif",
            "https://media.giphy.com/media/3o6Ztq7hsXVqxRoi9q/giphy.gif",
            "https://media.giphy.com/media/l0MYtcuISl3Q3PRsc/giphy.gif",
            "https://media.giphy.com/media/3oEjHMOEwz9Ji9dzfG/giphy.gif",
            "https://media.giphy.com/media/119epKNTouzlja/giphy.gif",
            "https://media.giphy.com/media/xT9DPnO0AcSsGZD46A/giphy.gif",
            "https://media.giphy.com/media/26uf4f6qaPEQeLm5a/giphy.gif",
            "https://media.giphy.com/media/3o7qDJpspsEznXugcU/giphy.gif",
            "https://media.giphy.com/media/dlzRdFxyrpaLe/giphy.gif",
            "https://media.giphy.com/media/3o7qE3XoM5ddZv5lUQ/giphy.gif",
            "https://media.giphy.com/media/3o7ZeAHVnyJ0Q0DOqA/giphy.gif",
            "https://media.giphy.com/media/xT4uQiIjIKBQg5pwXK/giphy.gif",
            "https://media.giphy.com/media/8vt1JRJWRFxZK/giphy.gif",
            "https://media.giphy.com/media/urcKa6ejXaRb2/giphy.gif",
            "https://media.giphy.com/media/l3Ucgqgf8iDHwadMs/giphy.gif",
            "https://media.giphy.com/media/3o6Yg5fZCGeFArIcbm/giphy.gif",
            "https://media.giphy.com/media/2Yvyg3Ipk7UIg/giphy.gif"
        ]
		const result = Math.floor((Math.random() * huggles.length) + 0)
		const hugThis = message.mentions.users.first()
		if(!hugThis) {
			message.channel.send('Aw, that\'s sad... You don\'t have anyone to hug...')
		} else if(hugThis.id == Bot.user.id) {
			const embed = new Discord.RichEmbed()
			.setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
			.setImage(huggles[result])
			message.channel.send('Yay, huggles :D')
			message.channel.send(embed)
		} else if(hugThis.id == message.author.id) {
			message.channel.send('Aw, you\'re lonely....')
		} else {
			const embed = new Discord.RichEmbed()
			.setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
			.setImage(huggles[result])
			message.channel.send(`:heart: ${hugThis} was hugged by ${message.author}! :heart:`)
			message.channel.send(embed)
		}
    }
    
        if(msg.toLowerCase().startsWith(prefix + 'dab')) {
            const DabList = [
                "https://media.giphy.com/media/l0K4mbH4lKBhAPFU4/giphy.gif",
                "https://media.giphy.com/media/A4R8sdUG7G9TG/giphy.gif",
                "https://media.giphy.com/media/bXvwCQglnTGKs/giphy.gif",
                "https://media.giphy.com/media/3oz8xODcLLAxb8Qyju/giphy.gif",
                "https://media.giphy.com/media/l1J9ODTGkF996dNzG/giphy.gif",
                "https://media.giphy.com/media/eOOcHWaaJnTwc/giphy.gif",
                "https://media.giphy.com/media/lae7QSMFxEkkE/giphy.gif",
                "https://media.giphy.com/media/3o6Mb4ZTsllteGKWVq/giphy.gif",
                "https://media.giphy.com/media/5zKGCHBd8x5GE/giphy.gif",
                "https://media.giphy.com/media/Iy3HZTfCpP02c/giphy.gif",
                "https://media.giphy.com/media/3oz8xwNOctTuV8msN2/giphy.gif",
                "https://media.giphy.com/media/l46CySTsO9JqWL8di/giphy.gif",
                "https://media.giphy.com/media/SoshjAcfNsOsw/giphy.gif",
                "https://media.giphy.com/media/d4blihcFNkwE3fEI/giphy.gif",
                "https://media.giphy.com/media/l0Iy0re0QAYULZvPy/giphy.gif",
                "https://media.giphy.com/media/26FLgxx3IjGmBCfuw/giphy.gif",
                "https://media.giphy.com/media/SnKo5rxnQjqkU/giphy.gif",
                "https://media.giphy.com/media/3oEjI7M0cOXG0j4HWU/giphy.gif",
                "https://media.giphy.com/media/l3vRfiK5kaT1N5ZLy/giphy.gif",
                "https://media.giphy.com/media/26FPpIxroCqzJzi7K/giphy.gif",
                "https://media.giphy.com/media/l4q85IhLTYdayg99e/giphy.gif",
                "https://media.giphy.com/media/3oriO4KVqa0ocGyxXy/giphy.gif",
                "https://media.giphy.com/media/26wktVzRki2I24jIc/giphy.gif",
                "https://media.giphy.com/media/26CaMgZQ2Sg0INyGk/giphy.gif",
                "https://media.giphy.com/media/9Ma22CCxAaimk/giphy.gif",
                "https://media.giphy.com/media/mqwyAKjHz612w/giphy.gif",
                "https://media.giphy.com/media/3o7TKSsU7mNv8xbsHK/giphy.gif",
                "https://media.giphy.com/media/xT0Gqv0vuw1nl10vMQ/giphy.gif",
                "https://media.giphy.com/media/xUA7b6sGSBjVd6GgaA/giphy.gif",
                "https://media.giphy.com/media/lehU5TTIVJJCM/giphy.gif",
                "https://media.giphy.com/media/l2JhKgiMHmZtNktXO/giphy.gif",
                "https://media.giphy.com/media/3ohfFzTZ8DObi2eO4g/giphy.gif",
                "https://media.giphy.com/media/XmgbcmQvLEThS/giphy.gif",
                "https://media.giphy.com/media/l0IygGo908KaG2LD2/giphy.gif",
                "https://media.giphy.com/media/oqJrPBk7UzhIc/giphy.gif",
                "https://media.giphy.com/media/3oKIP6AYztSrFZ0AoM/giphy.gif",
                "https://media.giphy.com/media/3o7abKleh5LNyLg7AY/giphy.gif",
                "https://media.giphy.com/media/UiQGTTjmUeqJy/giphy.gif",
                "https://media.giphy.com/media/l1J3zBbN5oEDMiO2I/giphy.gif",
                "https://media.giphy.com/media/T0PRVtBrgZhy8/giphy.gif",
                "https://media.giphy.com/media/3o6ZtgXpRIinw5JZe0/giphy.gif",
                "https://media.giphy.com/media/26uf6YHiFOB33bTPi/giphy.gif",
                "https://media.giphy.com/media/55axqWdn0ASJ2/giphy.gif",
                "https://media.giphy.com/media/l4FGjSchwgytlFtHW/giphy.gif",
                "https://media.giphy.com/media/hNahVvxcVA9Og/giphy.gif",
                "https://media.giphy.com/media/3og0IE5emI1jx4WPDO/giphy.gif",
                "https://media.giphy.com/media/xT8qBj3drOxUAKdpFS/giphy.gif",
                "https://media.giphy.com/media/3o6ZsT6WxOY4eZw8fK/giphy.gif",
                "https://media.giphy.com/media/kkRfBeFJgpgNa/giphy.gif",
                "https://media.giphy.com/media/3og0IJjjwkzqXq5GKs/giphy.gif",
                "https://media.giphy.com/media/l3vRkTAAM7Ueumd3y/giphy.gif",
                "https://media.giphy.com/media/3o84UfL9HZ6OJBgNeE/giphy.gif",
                "https://media.giphy.com/media/l0Ex2iSJw15ycaOyc/giphy.gif",
                "https://media.giphy.com/media/l2YWiQxvaa9Q7k3Pa/giphy.gif",
                "https://media.giphy.com/media/BSWDs1DUqbMQw/giphy.gif",
                "https://media.giphy.com/media/xT9KVqwOVcFwqnvgxa/giphy.gif",
                "https://media.giphy.com/media/d4aTwfm2ZfHlKB2M/giphy.gif",
                "https://media.giphy.com/media/FyGANosamR6Pm/giphy.gif",
                "https://media.giphy.com/media/3o6wrDk2hoDHgdExUs/giphy.gif",
                "https://media.giphy.com/media/l3vR0jxzwdP3EN9Be/giphy.gif",
                "https://media.giphy.com/media/l2SpOX97Q4f7hku9a/giphy.gif",
                "https://media.giphy.com/media/3o6ZtdulyqqoJjWB6U/giphy.gif",
                "https://media.giphy.com/media/26mkhMcajBm6yQLza/giphy.gif",
                "https://media.giphy.com/media/3o6Zt29f2F6QlEQK08/giphy.gif",
                "https://media.giphy.com/media/3o7TKy7uHGC4pLODh6/giphy.gif",
                "https://media.giphy.com/media/BjxbFYQ1JIPZu/giphy.gif",
                "https://media.giphy.com/media/hRDu4lNEfUm76/giphy.gif",
                "https://media.giphy.com/media/3o6ZtaHeBZLANye2Na/giphy.gif",
                "https://media.giphy.com/media/l0MYGPkhcBUcnX9OE/giphy.gif",
                "https://media.giphy.com/media/xUA7b7pULEAqyT4ddm/giphy.gif",
                "https://media.giphy.com/media/3ofSBmqMGmrjb20OSA/giphy.gif",
                "https://media.giphy.com/media/l41lSWc7SsM0xWTEQ/giphy.gif",
                "https://media.giphy.com/media/3o6vXH0PFrnEy71zMI/giphy.gif",
                "https://media.giphy.com/media/26gsgLz6QUqn48pkA/giphy.gif",
                "https://media.giphy.com/media/3o7WTPQIJWZZPYVYvS/giphy.gif",
                "https://media.giphy.com/media/SQuTJclcn3iaQ/giphy.gif",
                "https://media.giphy.com/media/l396HsTkd279UAdnW/giphy.gif",
                "https://media.giphy.com/media/3og0Ivw8GVooEoFhLy/giphy.gif",
                "https://media.giphy.com/media/3oz8xPyx3qgq5jAmMo/giphy.gif",
                "https://media.giphy.com/media/PVzJzobKS4YEw/giphy.gif",
                "https://media.giphy.com/media/xT0xeo8GgIKPCrXITC/giphy.gif",
                "https://media.giphy.com/media/l0Iy14knH1nNCACxa/giphy.gif",
                "https://media.giphy.com/media/3o7aCUUS8NM41JSCPe/giphy.gif",
                "https://media.giphy.com/media/Ibp2QROwwsvL2/giphy.gif",
                "https://media.giphy.com/media/3o7TKtyQghltWsfnEI/giphy.gif",
                "https://media.giphy.com/media/l0HUqbvkdpSxxr9Ac/giphy.gif",
                "https://media.giphy.com/media/3oriNKRgfIhBEXheog/giphy.gif",
                "https://media.giphy.com/media/8L0za6Xs6oKgRJG8Et/giphy.gif",
                "https://media.giphy.com/media/3oKIPftfxXPwJFkvba/giphy.gif",
                "https://media.giphy.com/media/3o6gE5nhk4pNuMSwOk/giphy.gif",
                "https://media.giphy.com/media/xUOwFVRE3cKDHXOy88/giphy.gif",
                "https://media.giphy.com/media/39hu1EBERXbUJpDG09/giphy.gif",
                "https://media.giphy.com/media/fbaq24PMgsCqY/giphy.gif",
                "https://media.giphy.com/media/l0FhCVbfFMXXOT1hm/giphy.gif",
                "https://media.giphy.com/media/26DN6T9jHaYSl8uxW/giphy.gif",
                "https://media.giphy.com/media/l378dCdI2UiKf2C7m/giphy.gif",
                "https://media.giphy.com/media/l378qGxjJ9jWIMs9y/giphy.gif",
                "https://media.giphy.com/media/l4pSX8SejRHibyVTG/giphy.gif",
                "https://media.giphy.com/media/El90CHvywA3p6/giphy.gif",
                "https://media.giphy.com/media/3o6ZsX25jOVmTvX0Ag/giphy.gif",
                "https://media.giphy.com/media/Rdb75l8nVU4Hm/giphy.gif"
            ]
            const result = Math.floor((Math.random() * DabList.length) + 0)
            const DabThis = {};
                const embed = new Discord.RichEmbed()
                .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)
                .setImage(DabList[result])
                message.channel.send(`${message.author} IS DABBING ON THEM HATERS!`)
                message.channel.send(embed)
        }
    

	if(msg.toLowerCase().startsWith(prefix + '8ball')) {
		var sayings = ["It is certain",
										"It is decidedly so",
										"Without a doubt",
										"Yes, definitely",
										"You may rely on it",
										"As I see it, yes",
										"Most likely",
										"Outlook good",
										"Yes",
										"Signs point to yes",
										"Reply hazy try again",
										"Ask again later",
										"Better not tell you now",
										"Cannot predict now",
										"Concentrate and ask again",
										"Don't count on it",
										"My reply is no",
										"My sources say no",
										"Outlook not so good",
										"Very doubtful"];

			var result = Math.floor((Math.random() * sayings.length) + 0);
			message.channel.send(`The Magical 8ball Says...\n__**${sayings[result]}**__`);
	}
	
})

Bot.on('message', (message) => {
	const msg = message.content.trim()
	if(msg.toLowerCase().startsWith(prefix + 'quote')) {
		var sayings = ["“Don\'t cry because it\'s over, smile because it happened.”  **― Dr. Seuss**",
    "“Be yourself; everyone else is already taken.” **― Oscar Wilde**",
    "“So many books, so little time.” ― Frank Zappa",
    "“Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.” **― Albert Einstein**",
    "“Be who you are and say what you feel, because those who mind don\'t matter, and those who matter don\'t mind.” **― Bernard M. Baruch**",
    "“You\'ve gotta dance like there\'s nobody watching,Love like you\'ll never be hurt,Sing like there\'s nobody listening,And live like it\'s heaven on earth.” **― William W. Purkey**",
    "“A room without books is like a body without a soul.” **― Marcus Tullius Cicero**",
    "“You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams.” **― Dr. Seuss**",
    "“You only live once, but if you do it right, once is enough.” **― Mae West**",
    "“Be the change that you wish to see in the world.” **― Mahatma Gandhi**",
    "“In three words I can sum up everything I\'ve learned about life: it goes on.”** ― Robert Frost**",
    "“If you want to know what a man\'s like, take a good look at how he treats his inferiors, not his equals.” **― J.K. Rowling, Harry Potter and the Goblet of Fire**",
    "“Friendship ... is born at the moment when one man says to another \'What! You too? I thought that no one but myself . . .” **― C.S. Lewis, The Four Loves**",
    "“Don\'t walk in front of me… I may not follow, Don\’t walk behind me… I may not lead, Walk beside me… just be my friend” **― Albert Camus**",
    "“No one can make you feel inferior without your consent.” **― Eleanor Roosevelt, This is My Story**",
    "“If you tell the truth, you don\'t have to remember anything.” **― Mark Twain**",
    "“A friend is someone who knows all about you and still loves you.” **― Elbert Hubbard**",
    "“I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.” **― Maya Angelou**",
    "“Always forgive your enemies; nothing annoys them so much.” **― Oscar Wilde**",
    "“Live as if you were to die tomorrow. Learn as if you were to live forever.” **― Mahatma Gandhi**",
    "“To live is the rarest thing in the world. Most people exist, that is all.” **― Oscar Wilde**",
    "“Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.” **― Martin Luther King Jr., A Testament of Hope: The Essential Writings and Speeches**",
    "“I am so clever that sometimes I don\'t understand a single word of what I am saying.” **― Oscar Wilde, The Happy Prince and Other Stories**",
    "“Without music, life would be a mistake.” **― Friedrich Nietzsche, Twilight of the Idols**",
    "“To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.” **― Ralph Waldo Emerson**",  
    "“We accept the love we think we deserve.” **― Stephen Chbosky, The Perks of Being a Wallflower**", 
    "“Insanity is doing the same thing, over and over again, but expecting different results.” **― Narcotics Anonymous**",
    "“I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell don\'t deserve me at my best.” **― Marilyn Monroe**",
    "“It is better to be hated for what you are than to be loved for what you are not.” **― André Gide, Autumn Leaves**",
    "“Imperfection is beauty, madness is genius and it\'s better to be absolutely ridiculous than absolutely boring.” **― Marilyn Monroe**",
    "“It is our choices, Harry, that show what we truly are, far more than our abilities.” **― J.K. Rowling, Harry Potter and the Chamber of Secrets**",
    "“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.” **― Jane Austen, Northanger Abbey**",
    "“There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.” **― Albert Einstein**",
    "“It does not do to dwell on dreams and forget to live.” **― J.K. Rowling, Harry Potter and the Sorcerer\'s Stone**",
    "“As he read, I fell in love the way you fall asleep: slowly, and then all at once.” **― John Green, The Fault in Our Stars**",
    "“Good friends, good books, and a sleepy conscience: this is the ideal life.” **― Mark Twain**",
    "“It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.” **― Maurice Switzer**",
    "“Life is what happens to us while we are making other plans.” **― Allen Saunders**",
    "“The fool doth think he is wise, but the wise man knows himself to be a fool.” **― William Shakespeare, As You Like It**",
    "“Whenever you find yourself on the side of the majority, it is time to reform (or pause and reflect).” **― Mark Twain**",
    "“We are all in the gutter, but some of us are looking at the stars.” **― Oscar Wilde, Lady Windermere\'s Fan**",
    "“Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.” **― Bil Keane**",
    "“A woman is like a tea bag; you never know how strong it is until it\'s in hot water.” **― Eleanor Roosevelt**",
    "“Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.” **― Neil Gaiman, Coraline**",
    "“I have not failed. I've just found 10,000 ways that won\'t work.” **― Thomas A. Edison**",
    "“The man who does not read has no advantage over the man who cannot read.” **― Mark Twain**",
    "“If you don\'t stand for something you will fall for anything.” **― Gordon A. Eadie**",
    "“The opposite of love is not hate, it\'s indifference. The opposite of art is not ugliness, it\'s indifference. The opposite of faith is not heresy, it\'s indifference. And the opposite of life is not death, it\'s indifference.” **― Elie Wiesel**",
    "“It is not a lack of love, but a lack of friendship that makes unhappy marriages.” **― Friedrich Nietzsche**",
    "“I may not have gone where I intended to go, but I think I have ended up where I needed to be.” **― Douglas Adams, The Long Dark Tea-Time of the Soul**",
    "“I solemnly swear that I am up to no good.” **― J.K. Rowling, Harry Potter and the Prisoner of Azkaban**",
    "“Outside of a dog, a book is man\'s best friend. Inside of a dog it\'s too dark to read.” **― Groucho Marx, The Essential Groucho: Writings For By And About Groucho Marx**",
    "“I am enough of an artist to draw freely upon my imagination. Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.” **― Albert Einstein**",
    "“I love you without knowing how, or when, or from where. I love you simply, without problems or pride: I love you in this way because I do not know any other way of loving but this, in which there is no I or you, so intimate that your hand upon my chest is my hand, so intimate that when I fall asleep your eyes close.” **― Pablo Neruda, 100 Love Sonnets**",
    "“I like nonsense, it wakes up the brain cells. Fantasy is a necessary ingredient in living.” **― Dr. Seuss**",
    "“Everything you can imagine is real.” **― Pablo Picasso**",
    "“Sometimes the questions are complicated and the answers are simple.” **― Dr. Seuss**",
    "“You love me. Real or not real? I tell him, Real.” **― Suzanne Collins, Mockingjay**",
    "“We read to know we\'re not alone.” **― William Nicholson, Shadowlands**",
    "“We don\'t see things as they are, we see them as we are.” **― Anaïs Nin**",
    "“You may not be her first, her last, or her only. She loved before she may love again. But if she loves you now, what else matters? She\'s not perfect—you aren\'t either, and the two of you may never be perfect together but if she can make you laugh, cause you to think twice, and admit to being human and making mistakes, hold onto her and give her the most you can. She may not be thinking about you every second of the day, but she will give you a part of her that she knows you can break—her heart. So don\'t hurt her, don\'t change her, don\'t analyze and don\'t expect more than she can give. Smile when she makes you happy, let her know when she makes you mad, and miss her when she\'s not there.” **― Bob Marley**",
    "“All you need is love. But a little chocolate now and then doesn\'t hurt.” **― Charles M. Schulz**",
    "“Sometimes, you read a book and it fills you with this weird evangelical zeal, and you become convinced that the shattered world will never be put back together unless and until all living humans read the book.” **― John Green, The Fault in Our Stars**",
    "“Beauty is in the eye of the beholder and it may be necessary from time to time to give a stupid or misinformed beholder a black eye.” **― Jim Henson**",
    "“Never trust anyone who has not brought a book with them.” **― Lemony Snicket, Horseradish**",
    "“If you only read the books that everyone else is reading, you can only think what everyone else is thinking.” **― Haruki Murakami, Norwegian Wood**",
    "“Today you are You, that is truer than true. There is no one alive who is Youer than You.” **― Dr. Seuss, Happy Birthday to You!**",
    "“You can never get a cup of tea large enough or a book long enough to suit me.” **― C.S. Lewis**",
    "“It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all - in which case, you fail by default.” **― J.K. Rowling**",
    "“Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?” **― J.K. Rowling, Harry Potter and the Deathly Hallows**",
    "“I\'m not afraid of death; I just don\'t want to be there when it happens.” **― Woody Allen**",
    "“If you want your children to be intelligent, read them fairy tales. If you want them to be more intelligent, read them more fairy tales.” **― Albert Einstein**",
    "“To the well-organized mind, death is but the next great adventure.” **― J.K. Rowling, Harry Potter and the Sorcerer\'s Stone**",
    "“Whenever I feel the need to exercise, I lie down until it goes away.” **― Paul Terry**",
    "“If one cannot enjoy reading a book over and over again, there is no use in reading it at all.” **― Oscar Wilde**",
    "“Logic will get you from A to Z; imagination will get you everywhere.” **― Albert Einstein**",
    "“You don\'t get to choose if you get hurt in this world...but you do have some say in who hurts you. I like my choices.” **― John Green, The Fault in Our Stars**",
    "“The more that you read, the more things you will know. The more that you learn, the more places you\'ll go.” **― Dr. Seuss, I Can Read With My Eyes Shut!**",
    "“Life isn\'t about finding yourself. Life is about creating yourself.” **― George Bernard Shaw**",
    "“One good thing about music, when it hits you, you feel no pain.” **― Bob Marley**",
    "“Folks are usually about as happy as they make their minds up to be.” **― Abraham Lincoln**",
    "“Sometimes people are beautiful.Not in looks.Not in what they say.Just in what they are.” **― Markus Zusak, I Am the Messenger**",
    "“The truth is, everyone is going to hurt you. You just got to find the ones worth suffering for.” **― Bob Marley**",
    "“If you live to be a hundred, I want to live to be a hundred minus one day so I never have to live without you.” **― Joan Powers, Pooh\'s Little Instruction Book**",
    "“Love looks not with the eyes, but with the mind,And therefore is winged Cupid painted blind.” **― William Shakespeare, A Midsummer Night\'s Dream**",
    "“Do what you can, with what you have, where you are.” **― Theodore Roosevelt**",
    "“Not all of us can do great things. But we can do small things with great love.” **― Mother Teresa**",
    "“Love is like the wind, you can\'t see it but you can feel it.” **― Nicholas Sparks, A Walk to Remember**",
    "“I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.” **― Groucho Marx**",
    "“There is no friend as loyal as a book.” **― Ernest Hemingway**",
    "“You don’t have a soul, Doctor. You are a soul. You have a body, temporarily.” **― Walter M. Miller Jr., A Canticle for Leibowitz**",
    "“When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.” **― Helen Keller**",
    "“The difference between genius and stupidity is: genius has its limits.” **― Alexandre Dumas fils**",
    "“If you can make a woman laugh, you can make her do anything.” **― Marilyn Monroe**",
    "“I would venture to guess that Anon, who wrote so many poems without signing them, was often a woman.” **― Virginia Woolf**",
    "“It matters not what someone is born, but what they grow to be.” **― J.K. Rowling, Harry Potter and the Goblet of Fire**",
    "“You don\'t love someone because they\'re perfect, you love them in spite of the fact that they\'re not.” **― Jodi Picoult, My Sister\'s Keeper**",
    "“We’re all a little weird. And life is a little weird. And when we find someone whose weirdness is compatible with ours, we join up with them and fall into mutually satisfying weirdness—and call it love—true love.” **― Robert Fulghum, True Love**",
    "“Some infinities are bigger than other infinities.” **― John Green, The Fault in Our Stars**",
    "“Life is like riding a bicycle. To keep your balance, you must keep moving.” **― Albert Einstein**",
    "“Success is not final, failure is not fatal: it is the courage to continue that counts.” **― Winston S. Churchill**",
    "“So, this is my life. And I want you to know that I am both happy and sad and I\'m still trying to figure out how that could be.” **― Stephen Chbosky, The Perks of Being a Wallflower**",
    "“Do one thing every day that scares you.” **― Eleanor Roosevelt**",
    "“There is nothing I would not do for those who are really my friends. I have no notion of loving people by halves, it is not my nature.” **― Jane Austen, Northanger Abbey**",
    "“Some people never go crazy. What truly horrible lives they must lead.” **― Charles Bukowski**",
    "“The real lover is the man who can thrill you by kissing your forehead or smiling into your eyes or just staring into space.” **― Marilyn Monroe**",
    "“Time you enjoy wasting is not wasted time.” **― Marthe Troly-Curtin, Phrynette Married**",
    "“He\'s like a drug for you, Bella.” **― Stephenie Meyer, Eclipse**",
    "“The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.” **― Terry Pratchett, Diggers**",
    "“If I had a flower for every time I thought of you...I could walk through my garden forever.” **― Alfred Tennyson**",
    "“It is what you read when you don\'t have to that determines what you will be when you can\'t help it.” **― Oscar Wilde**",
];

			var result = Math.floor((Math.random() * sayings.length) + 0);
			message.channel.send(`${sayings[result]}`);
	}
	
})

Bot.on("disconnected", () => {
    console.log("The Bot Has Been Disconnected! Exiting...");
	process.exit(1);

});

Bot.on('ready', () => {
    Bot.user.setUsername("🎀 ❝MERA❞");
});


//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------


Bot.login(process.env.BOT_TOKEN);
