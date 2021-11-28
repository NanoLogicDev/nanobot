import { CommandInteraction, MessageActionRow, MessageButton } from "discord.js";
import ICommand from "../interfaces/ICommand";

const { SlashCommandBuilder } = require('@discordjs/builders');

export const command: ICommand = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('This command should show a button'),
	async execute(interaction: CommandInteraction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
    
		await interaction.reply({ content: 'Pong!', components: [row] });
	},
};