import { SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction, Emoji } from "discord.js";
import ICommand from "../interfaces/ICommand";

const { SlashCommandBuilder } = require('@discordjs/builders');

export const command: ICommand = {
	data: new SlashCommandBuilder()
		.setName('emoji')
		.setDescription('Get the ID of an emoji')
		.addStringOption((option: SlashCommandStringOption) =>
			option.setName('emoji')
				.setDescription('Emoji')
				.setRequired(true)),
	async execute(interaction: CommandInteraction) {
		const emoji: Emoji = interaction.options.getString('emoji') as unknown as Emoji;
		await interaction.reply(`ID: ${emoji.name}`);
	},
};