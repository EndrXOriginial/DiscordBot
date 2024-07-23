const { SlashCommandBuilder } = require("discord.js");

const simJoin = new SlashCommandBuilder()
    .setName('simjoin')
    .setDescription('Will simulate a member joining the server')

const execute = async interaction => {
    await interaction.client.emit('guildMemberAdd', interaction.member);
    await interaction.reply('Simulated a new member joining');
}

module.exports = {
    category: 'commandControl',
    data: simJoin,
    execute
}