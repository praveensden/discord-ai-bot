import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { Client, GatewayIntentBits } from "discord.js";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
  organization: process.env.OPENAI_ORG,
});
const openai = new OpenAIApi(configuration);

client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) return;
    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message.author.username} : ${message.content}`,
      temperature: 0.9,
      max_tokens: 3000,
    });
    message.reply(`${gptResponse.data.choices[0].text}`);
    return;
  } catch (err) {
    console.log(err);
  }
});
client.login(process.env.DISCORD_TOKEN);
