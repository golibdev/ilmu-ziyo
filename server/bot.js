const { Bot, Context, session, Keyboard } = require('grammy');
const { Router } = require('@grammyjs/router')
const { TOKEN } = require('./src/bot/config/config');
const { getAll, getOne } = require('./src/bot/controllers/getCourses');
const { start, backHome } = require('./src/bot/controllers/start');
const { register } = require('./src/bot/controllers/registerStudent');

const bot = new Bot(TOKEN);

bot.use(session({ initial: () => ({ step: "start" }) }));

bot.command('start', async (ctx) => {
   const firstName = ctx.message.from.first_name
   const lastName = ctx.message?.from.last_name
   const chatId = ctx.message.chat.id
   await start(bot, firstName, lastName, chatId)
})

const router = new Router((ctx) => ctx.session.step);

bot.on('callback_query', async (ctx) => {
   const firstName = ctx.from.first_name
   const lastName = ctx.from?.last_name
   const queryData = ctx.callbackQuery.data
   const chatId = ctx.callbackQuery.message.chat.id
   const messageId = ctx.callbackQuery.message.message_id;

   const query = queryData.split('_')[0];
   const id = queryData.split('_')[1];

   switch(query) {
      case 'courses':
         await getAll(bot, chatId, messageId);
      break;
      case 'course':
         await getOne(bot, id, chatId, messageId);
      break;
      case 'start':
         await backHome(bot, firstName, lastName, chatId, messageId)
      break;
      case 'enrollCourse':
         await register(router, ctx, id)
      break
   }
})

bot.use(router)

bot.start()