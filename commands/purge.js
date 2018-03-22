const config = require("../config.json", "utf-8");

exports.run = (client, message, args) => {
	message.delete();
	console.log(message.author.username, "Used Purge");
	if(message.author.id !== config.ownerID) return;
	async function purge() {
		if (isNaN(args[0])) return;
        const fetched = await message.channel.fetchMessages({limit: args[0]});
            message.channel.bulkDelete(fetched)
				.catch(error => message.channel.send(`**Error: ${error}**`));
        }
        purge();
}