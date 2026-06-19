import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('joinvc')
        .setDescription('Join your current voice channel'),

    async execute(interaction) {
        const channel = interaction.member?.voice?.channel;

        if (!channel) {
            return InteractionHelper.safeReply(interaction, {
                embeds: [
                    createEmbed({
                        title: 'Voice Channel Required',
                        description: 'Join a voice channel first.',
                        color: 'error'
                    })
                ]
            });
        }

        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false
        });

        return InteractionHelper.safeReply(interaction, {
            embeds: [
                createEmbed({
                    title: 'Connected',
                    description: `Joined **${channel.name}**`
                })
            ]
        });
    }
};
