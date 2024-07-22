const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    category: 'events',
    name: Events.GuildMemberAdd,
    async execute(member) {
        // Gets the newcomers channel
        const channel = member.guild.channels.cache.find(channel => channel.name === 'newcomers');
        if (!channel) return;
        
        // Get all the roles in the server and puts the names in an array
        const roles = await member.guild.roles.fetch();
        let roleNames = [];
        roles.forEach(role => roleNames.push(role.name));

        member.roles.add(`${roleNames['Pup']}`);
        
        // Creating the embed that will host the welcome message
        const welcomeEmbed = new EmbedBuilder()
        .setColor('F14D4D')
        .setTitle(`Welcome ${member.user.username}`)
        .setThumbnail(`${member.displayAvatarURL()}`)
        .setDescription('Hope you enjoy your stay!')
        .addFields(
            {name : '\u200B', value: '\u200B'},
            {name: 'Rules', value: 'will be button', inline: true},
            {name: 'Tell us about yourself', value: 'React to this message with the emoji that corresponds to you', inline: true}
        )

        // Sending the embed message and adds the reactions
        // that will be used to add the roles
        channel.send({embeds: [welcomeEmbed]}).then(async message => {
            try {
                await message.react('👍');
                await message.react('👦');
                await message.react('👩‍🦰');
                await message.react('🚁');
                await message.react('🎦');
                await message.react('🖌️');
            } catch (e) {
                console.log('An emoji didn\'t react:', e);
            }
        });

        
    }
}