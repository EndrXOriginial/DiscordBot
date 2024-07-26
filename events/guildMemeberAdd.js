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

        const reactionEmoji = {
            '👦': member.guild.roles.cache.find(role => role.name === 'He/Him'),
            '👩‍🦰': member.guild.roles.cache.find(role => role.name === 'She/Her'),
            '🚁': member.guild.roles.cache.find(role => role.name === 'They/Them'),
            '🎦': member.guild.roles.cache.find(role => role.name === 'Streamer'),
            '🖌️': member.guild.roles.cache.find(role => role.name === 'Artist'),
            '💻': member.guild.roles.cache.find(role => role.name === 'Programmer'),
            '👍': 'Rules',

        }

        const rulesEmbeded = new EmbedBuilder()
            .setColor('538083')
            .setTitle('The Rules')
            .setDescription('The rules of the server. Please read them properly.')
            .addFields(
                {name : '\u200e', value: '\u200e'},
                {name: 'No Racisim', value: 'Please no rascisim in the server please.\nSadly we have to mention it everytime.'},
                {name : '\u200e', value: '\u200e'},
                {name: 'English Only', value: 'Please only use english in the server.\nThere can be exceptions but most of the time, english will be the only language used.'},
                {name : '\u200e', value: '\u200e'},
                {name: 'Be Friendly', value: 'We are a community, be nice, kind and so on to everyone in the server.\nAny threat will be deleted and will resolve in a timeout. On the second time, a ban will be given.\nPlease don\'t tempt it or try to be funny, joke or not you will be banned.'},
                {name : '\u200e', value: '\u200e'},
                {name: 'No Spamming', value: 'Don\'t spam message in an abusive way. If a spam is spotted or reported, a timeout will be issued.\nSame goes for bot commands, don\'t spam commands.'},
            )
        
        // Creating the embed that will host the welcome message
        const welcomeEmbed = new EmbedBuilder()
            .setColor('F14D4D')
            .setTitle(`Welcome ${member.user.username}`)
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription(`Hope you enjoy your stay!`)
            .addFields(
                {name : '\u200B', value: '\u200B'},
                {name: 'Tell us about yourself', value: 'Select the emojis that describe you\nYou can only select one gender but as many hobbies as you want.', inline: true},
                {name: 'Rules', value: 'Once you have chosen your reactions, click on the thumbs up to get the rules and have access to the server.', inline: true},
                {name : '\u200B', value: '\u200B'},
            )


        for (const [key, value] of Object.entries(reactionEmoji)) {
            let name = typeof value === 'object' ? value.name : value;
            welcomeEmbed.addFields({name: key, value: name, inline: true});
        }


        // Sending the embed message and adds the reactions
        // that will be used to add the roles
        channel.send({content: `<@${member.user.id}>`, embeds: [welcomeEmbed]}).then(async message => {
            try {
                for (const r of Object.keys(reactionEmoji)) {
                    await message.react(r);
                }

                // Filters the reactions to see if they are used from the new user. If not it removes it.
                const collectorFilter = async (reaction, user) => {
                    const newUser = message.mentions.users.first().id;
                    const reactionName = reaction.emoji.name;

                    if (!(reactionName in reactionEmoji)) message.reactions.cache.get(reactionName).remove();
                    if (user.id !== newUser) {
                        const userReaction = message.reactions.cache.filter(r => r.users.cache.has(user.id));
                        for (const r of userReaction.values()) {
                            r.users.remove(user.id);
                        }
                    }

                    return user.id === newUser && reactionName in reactionEmoji;
                }
        
                const collector = message.createReactionCollector({filter: collectorFilter, time: 300000});
        
                collector.on('collect', (reaction, user) => {
                    const reactionName = reaction.emoji.name;
                    const newUser = member.guild.members.cache.find(m => m.id === user.id);
                    const newUserRoles = newUser.roles.cache;
                    const newUserMessageReaction = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                    const emojiRole = reactionEmoji[reactionName];

                   switch (reactionName) {
                    case '👦':
                        if (newUserRoles.some(role => role.id === reactionEmoji['👩‍🦰'].id)) {
                            newUser.roles.remove(reactionEmoji['👩‍🦰']);
                            newUserMessageReaction.get('👩‍🦰').users.remove(newUser);
                        } else if (newUserRoles.some(role => role.id === reactionEmoji['🚁'].id)) {
                            newUser.roles.remove(reactionEmoji['🚁']);
                            newUserMessageReaction.get('🚁').users.remove(newUser);
                        }
                        newUser.roles.add(emojiRole);
                        break;
                    case '👩‍🦰':
                        if (newUserRoles.some(role => role.id === reactionEmoji['👦'].id)) {
                            newUser.roles.remove(reactionEmoji['👦']);
                            newUserMessageReaction.get('👦').users.remove(newUser);
                        } else if (newUserRoles.some(role => role.id === reactionEmoji['🚁'].id)) {
                            newUser.roles.remove(reactionEmoji['🚁']);
                            newUserMessageReaction.get('🚁').users.remove(newUser);
                        }
                        newUser.roles.add(emojiRole);
                        break;
                    case '🚁':
                        if (newUserRoles.some(role => role.id === reactionEmoji['👦'].id)) {
                            newUser.roles.remove(reactionEmoji['👦']);
                            newUserMessageReaction.get('👦').users.remove(newUser);
                        } else if (newUserRoles.some(role => role.id === reactionEmoji['👩‍🦰'].id)) {
                            newUser.roles.remove(reactionEmoji['👩‍🦰']);
                            newUserMessageReaction.get('👩‍🦰').users.remove(newUser);
                        }
                        newUser.roles.add(emojiRole);
                        break;
                    case '🎦':
                        newUser.roles.add(emojiRole);
                        break;
                    case '🖌️':
                        newUser.roles.add(emojiRole);
                        break;
                    case '💻':
                        newUser.roles.add(emojiRole);
                        break;
                    case '👍':
                        message.client.users.send(user.id, {embeds: [rulesEmbeded]});
                        newUser.roles.add(message.guild.roles.cache.find(r => r.name === 'Pup'));
                   }
                });
        
                collector.on('end', collected => {
                    console.log('The collection has ended');
                });
            } catch (e) {
                console.log('An emoji didn\'t react:', e);
            }
        });    
    }
}