exports.run = (client, message, args) => {
	console.log(message.author.username, "Used Servers");
	var servers = (client.guilds.size);
	if (servers > 1) {
    message.channel.send("**I Am In " + servers + " Servers**").catch(console.error);
	}
	else {
		message.channel.send("**I Am In " + servers + " Server**").catch(console.error);
	}
}