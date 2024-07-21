const { SlashCommandBuilder } = require('discord.js');

const serverCommand = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information on the server');

const execute = async (interaction) => {
    await interaction.reply({content: `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} people in it!`, ephemeral: true});
}


module.exports = {
    category: 'utility',
    cooldown: 15,
    data: serverCommand,
    execute
}