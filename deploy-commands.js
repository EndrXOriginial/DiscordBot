require('dotenv/config');
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

let commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder in commandsFolders) {
    const commandsPath = path.join(foldersPath, commandsFolders[folder]);
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file in commandsFiles) {
        const filePath = path.join(commandsPath, commandsFiles[file]);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
        }
    }
}

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands},
        )

        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (e) {
        console.log(e);
    }
})();