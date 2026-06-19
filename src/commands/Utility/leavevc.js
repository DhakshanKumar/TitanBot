import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('leavevc')
        .setDescription('Disconnect from the voice channel'),

    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return InteractionHelper.safeReply(interaction, {
                embeds: [
                    createEmbed({
                        title: 'Not Connected',
                        description: 'I am not in a voice channel.',
                        color: 'error'
                    })
                ]
            });
        }

        connection.destroy();

        return InteractionHelper.safeReply(interaction, {
            embeds: [
                createEmbed({
                    title: 'Disconnected',
                    description: 'Left the voice channel.'
                })
            ]
        });
    }
};
