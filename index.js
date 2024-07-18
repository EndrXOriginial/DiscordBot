const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

dotenv.config();

const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder in commandsFolders) {
    const commandsPath = path.join(foldersPath, commandsFolders[folder]);
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file in commandsFiles) {
        const filePath = path.join(commandsPath, commandsFiles[file]);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath);
for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.BOT_TOKEN);