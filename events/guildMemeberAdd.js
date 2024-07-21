const { Events } = require("discord.js");

module.exports = {
    category: 'events',
    name: Events.GuildMemberAdd,
    async execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.name === 'newcomers');
        if (!channel) return;

        console.log(member);

        channel.send(`Welcome to The Server ${member.user.username}!\n\nNow probe me, touch me, experiment on me so you can get to know me better.`);
    }
}