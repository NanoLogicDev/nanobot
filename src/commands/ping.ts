import { CommandInteraction } from "discord.js";
import ICommand from "../interfaces/ICommand";

const { SlashCommandBuilder } = require('@discordjs/builders');

export const command: ICommand = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply('Pong!');
	},
};