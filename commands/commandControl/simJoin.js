<<<<<<< HEAD
const { SlashCommandBuilder, GuildMember } = require("discord.js");

const simjoin = new SlashCommandBuilder()
    .setName('simjoin')
    .setDescription('Will simulate a member joining')

const execute = async interaction => {
    console.log(interaction.member);
    interaction.client.emit('guildMemberAdd', interaction.member);
    interaction.reply('Emitted a member add');
}

module.exports = {
    category: 'commandControl',
    data: simjoin,
=======
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
>>>>>>> 1a2da665d8ec55fdde79b773ee39bbe43bffac5d
    execute
}