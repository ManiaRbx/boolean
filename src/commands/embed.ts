const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js') 
const superagent = require('superagent')
const nob = require('noblox.js')
import { IBotCommand } from "../types";

export const command: IBotCommand = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Sends a embed')
        .addChannelOption((option: any) => option.setName('destination').setDescription('Select a channel').setRequired(true))
        .addStringOption((option: any) => option.setName('title').setDescription('Select a channel').setRequired(true))
        .addStringOption((option: any) => option.setName('footer').setDescription('Select a channel').setRequired(false))
        .addStringOption((option: any) => option.setName('image').setDescription('Select a channel').setRequired(false))

        ,async execute(interaction: any) {
        if (!interaction.isCommand()) return;

    if (interaction.commandName === 'embed') {
        if(!interaction.member.permissions.has(discord.Permissions.FLAGS.ADMINISTRATOR)){
            const embed = new discord.MessageEmbed()
            .setTitle('Invaild permission')
            .setColor()
            await interaction.reply({embeds:[embed]})
        }else{
            const tit = interaction.options.getString('title');
            const foot = interaction.options.getString('footer');
            const img = interaction.options.getString('image');
            const channel = interaction.options.getChannel('destination');
            const questions = ["Description?"]
            const filter = (use: any) => use.member.id == interaction.member.id
                const collecter = interaction.channel.createMessageCollector({filter, time: 69696990 });
                let i = 0
                let answers = [];
                let answer = ""

                interaction.reply(questions[0])
                collecter.on('collect', async(q: any)=> {
                    if(questions.length == i) return collecter.stop('max');
                    answer = q.content
                    answers.push({answer});
                    i++;
                    if(questions.length == i) return collecter.stop('max');
                    else{
                        interaction.reply(questions[i])
                    }
                })
                collecter.on('end', async(reason: any, collected: any) => { 
                if(reason === "time"){
                    return
                }
            const embed = new discord.MessageEmbed()

            .setTitle(tit)
            .setDescription(answer)
            .setColor()
            if(foot){
                embed.setFooter(foot)
            }
            if(img){
                embed.setImage(img)
            }

            channel.send({embeds:[embed]})

            const embe2d = new discord.MessageEmbed()

            .setTitle("Sent!")
            .setColor()

            await interaction.editReply({embeds:[embe2d]})
            return
        })
        }
    }
   }
}