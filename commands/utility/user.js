const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { category } = require("../commandControl/resetCommand");


const userCommand = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides info on the user')
    .addBooleanOption(option => 
        option.setName('visibility')
            .setDescription('Do you want the message to be only visible to you?')
            .setRequired(true)
    )

const execute = async (interaction) => {
    const ephem = interaction.options.getBoolean('visibility');

    const userEmbed = new EmbedBuilder()
    .setColor(`${interaction.member.displayHexColor}`)
    .setThumbnail(interaction.member.displayAvatarURL())
    .setTitle(`${interaction.user.username}`)
    .setDescription(`You joined the server on the ${interaction.member.joinedAt.toString().split(' ').slice(1, 4).join(' ')}. `)
    .setFields(
        {name: '\u200e', value: '\u200e'},
        {name: 'Roles', value: `${interaction.member.roles.cache.map(role => {
            if (role.name === '@everyone') return;
            return role.name;
        }).slice(0, -1).join(', ')}`, inline: true},
        {name: '\u200e', value: '\u200e', inline: true},
        {name: 'smt', value: 'smtsmt', inline: true},
    )

    await interaction.reply({embeds: [userEmbed], ephemeral: ephem});
}


module.exports = {
    category: 'utility',
    cooldown: 10,
    data: userCommand,
    execute
}