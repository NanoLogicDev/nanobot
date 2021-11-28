import Collection from "@discordjs/collection";
import { CommandInteraction } from "discord.js";
import ICommand from "../interfaces/ICommand";

export const commandInteraction = async (commands: Collection<string, ICommand>, interaction: CommandInteraction) => {
    const command = commands.get(interaction.commandName);
        
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}