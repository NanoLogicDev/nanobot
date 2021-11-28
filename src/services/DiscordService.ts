const token = require('../../botconfig.json').token;
const clientId = require('../../botconfig.json').clientId;
const guildId = require('../../botconfig.json').guildId;
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types';
import { Client, Collection, Emoji, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import ICommand from '../interfaces/ICommand';
import { commandInteraction } from '../interactions/commandInteraction';
import { selectMenuInteraction } from '../interactions/selectMenuInteraction';
import { buttonInteraction } from '../interactions/buttonInteraction';

export default class DiscordService {
    private client: Client;
    private commands: Collection<string, ICommand>;

    constructor() {
        this.client = new Client({ intents: Intents.FLAGS.GUILDS });
        this.commands = new Collection();
    }

    private registerEvents(): void {
        // InteractionCreate has to stay here because it uses private variables from the DiscordService.
        this.client.on('interactionCreate', async interaction => {
            if (interaction.isCommand()) {
                commandInteraction(this.commands, interaction);
            } else if (interaction.isSelectMenu()) {
                selectMenuInteraction(interaction);
            } else if (interaction.isButton()) {
                buttonInteraction(interaction);
            }
        });

        const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.ts'));

        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }

    private registerCommands(): void {
        const jsonCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];

        fs.readdir('./src/commands', (err, files) => {
            files.forEach(file => {
                const commandFile = require(`../commands/${file}`);
                this.commands.set(commandFile.command.data.name, commandFile.command);
                jsonCommands.push(commandFile.command.data.toJSON());
            });

            const rest = new REST({ version: '9' }).setToken(token);

            rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: jsonCommands })
                .then(() => console.log('Successfully registered application commands.'))
                .catch(console.error);
        });
    }

    public init(): void {
        this.registerEvents();
        this.registerCommands();

        this.client.login(token);

        console.log('DiscordService started');
    }
}