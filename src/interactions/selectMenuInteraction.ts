import { SelectMenuInteraction } from "discord.js";

export const selectMenuInteraction = async (interaction: SelectMenuInteraction) => {
    if (interaction.customId === 'select') {
		await interaction.update({ content: `Value0: ${interaction.values[0]}\nValue1: ${interaction.values[1]}`, components: [] });
	}
}