import { ButtonInteraction } from "discord.js";

export const buttonInteraction = async (interaction: ButtonInteraction) => {
    if (interaction.customId === 'primary') {
		await interaction.update({ content: 'A button was clicked!', components: [] });
	}
}