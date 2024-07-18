const { Events, Collection } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const cooldowns = interaction.client;
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.log(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        };

        const now = Date.now();
        const timestamp = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) + 1000;

        if (timestamp.has(interaction.user.id)) {
            const expirationTime = timestamp.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                interaction.reply({content: `You have already used this command. You can again at ${expiredTimestamp}`});
            }
        }

        timestamp.set(interaction.user.id, now);
        setTimeout(() => timestamp.delete(interaction.user.id), cooldownAmount);

        try {
            await command.execute(interaction);
        } catch (e) {
            console.log(e);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
            } else {
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }
    }
}