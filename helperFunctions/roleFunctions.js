const getRoleByName = async (interaction, name = 'Pup') => {
    if (!typeof name === 'string') {
        console.log('name has to be a string');
        return
    }

    return await interaction.guild.roles.cache.find(role => role.name === name);
}

const getRoleById = async (interaction, id) => {
    id = Number(id);
    let role = await interaction.guild.roles.find(id);

    return role
}

module.exports = {
    getRoleByName,
    getRoleById,
}