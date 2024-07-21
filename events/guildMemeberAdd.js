const { Events } = require("discord.js");

module.exports = {
    category: 'events',
    name: Events.GuildMemberAdd,
    async execute(guildMember) {
        console.log(guildMember.client);
        const channel = guildMember.guild.channels.cache.find(channel => channel.name === 'newcomers');
        if (!channel) return;
        
        channel.send(`Welcome to The Server ${guildMember.user.username}!\n\nNow probe me, touch me, experiment on me so you can get to know me better.`);
    }
}