import { CommandInteraction, MessageActionRow, MessageSelectMenu } from "discord.js";
import ICommand from "../interfaces/ICommand";

const { SlashCommandBuilder } = require('@discordjs/builders');

export const command: ICommand = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('This is a menu!'),
	async execute(interaction: CommandInteraction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		await interaction.reply({ content: 'Menu!', components: [row] });
	},
};