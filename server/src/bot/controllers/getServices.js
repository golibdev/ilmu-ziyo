const axios = require('axios');
const { backKeyboard } = require('../keyboards/mainKeyboard')
const { InlineKeyboard, InputFile } = require('grammy');
const { API } = require('../config/config');

exports.getAll = async (bot, chatId, messageId) => {
   try {
      const api = `${API}service`
      const res = await axios.get(api);

      const services = res.data.services;

      if(services.length === 0) {
         await bot.api.deleteMessage(chatId, messageId)

         await bot.api.sendPhoto(chatId, "https://t.me/youngproger/318", {
            reply_markup: backKeyboard,
            caption: "🚫 Yo'nalishlar mavjud emas",
            parse_mode: 'HTML'
         })
         return
      }

      const keyboard = new InlineKeyboard();

      services.forEach((service, index) => {
         if(index % 1 === 0) {
            keyboard.row();
         }
         keyboard.text(`📚 ${service.title}`, `service_${service.id}`);
      })

      keyboard.row();
      keyboard.text('🔝 Bosh menyu', 'start');

      await bot.api.deleteMessage(chatId, messageId);

      const message = `<b>Perfect Buxgalter Group</b>dagi mavjud xizmatlar. Xizmatlarga ariza qoldirish uchun xizmatni tanlab, xizmatga yozilish tugmasiga bosing!
      `

      await bot.api.sendPhoto(chatId, "https://t.me/youngproger/318", {
         reply_markup: keyboard,
         caption: message,
         parse_mode: "HTML"
      })
   } catch (err) {
      console.log(err.message)
   }
}

exports.getOne = async (bot, id, chatId, messageId) => {
   try {
      const api = `${API}service/${id}`
      const res = await axios.get(api)
      const service = res.data.service;

      const image = service.image

      const path = new InputFile(`public${image}`)
      const keyboard = new InlineKeyboard()
         .text('✍️ Xizmatga yozilish', `enrollService_${id}`).row()
         .text('🔝 Bosh menyu', 'start')

      await bot.api.deleteMessage(chatId, messageId);

      await bot.api.sendPhoto(chatId, path, {
         caption: service.description,
         reply_markup: keyboard
      })
   } catch (err) {
      console.log(err)
   }
}