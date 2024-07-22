const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    category: 'events',
    name: Events.GuildMemberAdd,
    async execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.name === 'newcomers');
        if (!channel) return;

        // console.log(member.displayAvatarURL());
        
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