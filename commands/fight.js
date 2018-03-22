exports.run = (Bot, message, args) => {
    console.log(message.author.username, "Used Fight");
    var emote = (Math.random() > 0.9)?"**ʕ ง•ᴥ•ʔ ง**":"**(ง'̀-'́)ง**";
    message.channel.sendMessage(emote);
}