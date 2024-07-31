const { Events, EmbedBuilder, roleMention } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
const { getRoleByName } = require('../helperFunctions/roleFunctions');

module.exports = {
    category: 'events',
    name: Events.GuildMemberAdd,
    async execute(member) {
        // Gets the newcomers channel
        const channel = await member.guild.channels.cache.find(channel => channel.name === 'newcomers');
        if (!channel) return;

        const welcomeMessage = new EmbedBuilder()
            .setColor('F14D4D')
            .setTitle(`Welcome to the Server ${member.user.username}`)
            .setDescription('I hope you enjoy the server and what it has to offer! Feel free to try out a few commands')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setFields(
                {name: '\u200e', value: '\u200e'},
                {name: 'Channels & Roles', value: 'Go to the "channels & roles" to answer a few questions to personalize your server profile.', inline: true},
                {name: '\u200e', value: '\u200e', inline: true},
                {name: 'Make sure to read the rules', value: 'When you are ready, read the full rules in the info category and press the thumbs up to access the full server', inline: true},
            )

        channel.send({embeds: [welcomeMessage]});
    }
}