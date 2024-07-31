const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const serverCommand = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information on the server');

const execute = async (interaction) => {
    const noneAssignableRoles = ['@everyone', 'TestBot 1.0', 'Bot', 'Pingcord', 'Streamcord', 'Dyno', 'Pancake'];
    // console.log([...interaction.guild.roles.cache.values()].filter(role => !noneAssignableRoles.includes(role.name)).map(role => role.name).join(', '));

    const serverEmbed = new EmbedBuilder()
        .setColor('F14D4D')
        .setThumbnail(interaction.guild.iconURL())
        .setTitle(interaction.guild.name)
        .setDescription('This is the server of the normal Rey. Hope you\'ve been enjoying your stay so far!')
        .setFields(
            {name: '\u200e', value: `\u200e`},
            {name: 'Members', value: `${interaction.guild.memberCount}`, inline: true},
            {name: '# of roles', value: `${[...interaction.guild.roles.cache].length}`, inline: true},
            {name: 'The Roles', value: `${[...interaction.guild.roles.cache.values()].filter(role => !noneAssignableRoles.includes(role.name)).map(role => role.name).join(', ')}`, inline: true},
        )


    await interaction.reply({embeds: [serverEmbed]});
}


module.exports = {
    category: 'utility',
    cooldown: 15,
    data: serverCommand,
    execute
}