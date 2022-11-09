const { Bot, session } = require('grammy');
const { Router } = require('@grammyjs/router')
const { TOKEN } = require('./src/bot/config/config');
const courses = require('./src/bot/controllers/getCourses');
const services = require('./src/bot/controllers/getServices');
const { start, backHome } = require('./src/bot/controllers/start');
const course = require('./src/bot/controllers/registerStudent');
const service = require('./src/bot/controllers/registerService');

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
         await courses.getAll(bot, chatId, messageId);
      break;
      case 'course':
         await courses.getOne(bot, id, chatId, messageId);
      break;
      case 'services':
         await services.getAll(bot, chatId, messageId);
      break;
      case 'service':
         await services.getOne(bot, id, chatId, messageId);
      break;
      case 'start':
         await backHome(bot, firstName, lastName, chatId, messageId)
      break;
      case 'enrollCourse':
         await course.register(router, ctx, id)
      break
      case 'enrollService':
         await service.register(router, ctx, id)
      break
   }
})

bot.use(router)

bot.start()