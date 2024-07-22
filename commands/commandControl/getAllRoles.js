const { SlashCommandBuilder } = require("discord.js");

const getAllRoles = new SlashCommandBuilder()
    .setName('getallroles')
    .setDescription('you will get all the roles in the server')

const execute = async interaction => {
    const roles = await interaction.guild.roles.fetch();
    let roleNames = [];

    console.log(roles);
    // roles.forEach(role => console.log(`name of the role: ${role}`));

    roles.forEach(role => {
        roleNames.push(role.name);
    });

    await interaction.reply(`There is ${roleNames.length} roles in the server.\nThey are: ${roleNames.join(', ')}`);
}

module.exports = {
    category: 'commandControl',
    data: getAllRoles,
    execute
}