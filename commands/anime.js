const config = require("../config.json", "utf-8");
const popura = require('popura');
const malScraper = require('mal-scraper');

exports.run = (client, message, args) => {
	console.log(message.author.username, "Used Anime");
	 return new Promise(async(resolve, reject) => {
            const malClient = popura(config.myAnimeList.user, config.myAnimeList.password);
            try {
                if (!args.length) return resolve(await message.channel.send("**You Did Not Enter An Anime To Search For.**"));
                let animeName = args.join(" ");
                const res = await malClient.searchAnimes(animeName);
                if (!res[0]) return resolve(await message.channel.send("**Your Search Did Not Returned Any Result.**"));
                let embedFields = [];
                let selectedAnime = res[0];
                if (res.length > 1) {
                    let i = 1;
                    let resultList = res.map(a => `[${i++}] ${a.title}`).join('\n').replace(/undefined/gim, "");
                    if (resultList.length > 2030) resultList = resultList.substr(0, 2030) + '..';
                    const reply = 1;
                    selectedAnime = res[Math.round(reply - 1)];
                }
                const anime = await malScraper.getInfoFromName(selectedAnime.title);
                if (anime.genres.length > 0) {
                    embedFields.push({
                        name: 'Genres',
                        value: anime.genres.join(', '),
                        inline: true
                    });
                }
                if (selectedAnime.episodes) {
                    embedFields.push({
                        name: 'Episodes',
                        value: selectedAnime.episodes.toString(),
                        inline: true
                    });
                }
                if (selectedAnime.score) {
                    embedFields.push({
                        name: 'Score',
                        value: selectedAnime.score.toString(),
                        inline: true
                    });
                }
                if (selectedAnime.status) {
                    embedFields.push({
                        name: 'Status',
                        value: selectedAnime.status,
                        inline: true
                    });
                }
                if (selectedAnime.start_date) {
                    embedFields.push({
                        name: 'Start date',
                        value: selectedAnime.start_date.replace(/-/g, "/"),
                        inline: true
                    });
                }
                if (selectedAnime.end_date && selectedAnime.end_date !== '0000-00-00') {
                    embedFields.push({
                        name: 'End date',
                        value: selectedAnime.end_date.replace(/-/g, "/"),
                        inline: true
                    });
                }
                if (selectedAnime.synopsis) {
                    if (selectedAnime.synopsis.length > 1024) selectedAnime.synopsis = selectedAnime.synopsis.substr(0, 1021) + '..';
                    embedFields.push({
                        name: 'Synopsis',
                        value: selectedAnime.synopsis.replace(/(&quot;|&mdash;|&rsquo;|&#039;|\[i]|\[\/i])/gim, ""),
                    });
                }
                return resolve(await message.channel.send({
                    embed: {
						color: `${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`,
						author: {
							name: selectedAnime.title,
							url: anime.url || 'https://MyAnimeList.net/',
						},
						thumbnail: {
							url: selectedAnime.image
						},
                        fields: embedFields,
                        footer: {
                            text: (anime.scoreStats || "") +
                                " | Popularity: " + (anime.popularity || 'None') + " | Members: " + (anime.members || 'None') + " | Ranking: " + (anime.ranked || 'None') + " | Rating: " + (anime.rating || 'None')
                        }
                    }
                }));
            } catch (err) {
                reject(err);
            }
        });
    }