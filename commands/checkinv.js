exports.run = (client, msg, args) => {
    console.log(message.author.username, "Used CheckInv");
    const members = msg.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
    return msg.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || ".");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ci"]
  };
  
  exports.help = {
    name: 'checkinvites',
    description: 'Returns a list of members with an invite as their game.',
    usage: 'checkinvites'
  };