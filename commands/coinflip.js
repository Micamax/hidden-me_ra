exports.run = (client, message, args) => {
    console.log(message.author.username, "Used Coinflip");
    var flip = Math.floor((Math.random() * 100) + 1);
    if (flip < 50) return message.channel.send("**The Coin Landed On Heads!**");
    if (flip > 50) return message.channel.send("**The Coin Landed On Tails!**");
    if (flip === 50) return message.channel.send("**The Coin Landed Dead Center And Rolled Into A Sewer Drain... Whoops.**");
  };