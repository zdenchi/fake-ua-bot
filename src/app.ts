import { Telegraf } from 'telegraf';
import { validate } from 'deep-email-validator';
import { message } from 'telegraf/filters';

const bot = new Telegraf(process.env.TOKEN as string);

bot.start((ctx) => ctx.reply('Welcome'));

bot.on(message('text'), async (ctx) => {
  const email = ctx.message.text;
  const { valid } = await validate(email);
  if (valid) {
    ctx.reply('Email is valid');
  } else {
    ctx.reply('Email is invalid');
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
