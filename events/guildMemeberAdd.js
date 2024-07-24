const { Events, EmbedBuilder, roleMention } = require("discord.js");
const { getRoleByName } = require('../helperFunctions/roleFunctions');

module.exports = {
    category: 'events',
    name: Events.GuildMemberAdd,
    async execute(member) {
        // Gets the newcomers channel
        const channel = await member.guild.channels.cache.find(channel => channel.name === 'newcomers');
        if (!channel) return;

        const reactionEmoji = {
            '👦': 'He/Him',
            '👩‍🦰': 'She/Her',
            '🚁': 'They/Them',
            '🎦': 'Streamer',
            '🖌️': 'Artist',
            '💻': 'Programmer',
            '👍': 'Rules',

        }
        
        // Get all the roles in the server and puts the names in an array
        const roles = await member.guild.roles.fetch();
        let roleNames = [];
        roles.forEach(role => roleNames.push(role));

        let baseRole = await getRoleByName(member, 'Pup');
        member.roles.add(baseRole);
        
        // Creating the embed that will host the welcome message
        const welcomeEmbed = new EmbedBuilder()
            .setColor('F14D4D')
            .setTitle(`Welcome ${member.user.username}`)
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription(`Hope you enjoy your stay!`)
            .addFields(
                {name : '\u200B', value: '\u200B'},
                {name: 'Tell us about yourself', value: 'React to this message with the emoji that corresponds to you', inline: true},
                // {name : '\u200B', value: '\u200B', inline: true},
                {name: 'Rules', value: 'will be button', inline: true},
                {name : '\u200B', value: '\u200B'},
            )


        let tempIndex = 0;
        for (const [key, value] of Object.entries(reactionEmoji)) {
            const boolInline = tempIndex == 0 ? true : tempIndex % 3 === 0;
            console.log(!boolInline);
            welcomeEmbed.addFields({name: key, value: value, inline: true});
            tempIndex++;
        }


        // Sending the embed message and adds the reactions
        // that will be used to add the roles
        channel.send({content: `<@${member.user.id}>`, embeds: [welcomeEmbed]}).then(async message => {
            try {
                await message.react('👦');
                await message.react('👩‍🦰');
                await message.react('🚁');
                await message.react('🎦');
                await message.react('🖌️');
                await message.react('💻');
                await message.react('👍');
            } catch (e) {
                console.log('An emoji didn\'t react:', e);
            }
        });

        
        
    }
}