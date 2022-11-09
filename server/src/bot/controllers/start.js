const { keyboard } = require('../keyboards/mainKeyboard')

exports.start = async (bot, firstName, lastName, chatId) => {
   try {
      const fullName = firstName + ' ' + (lastName ? lastName : '')
      const message = `Assalomu alaykum! Xush kelibsiz hurmatli <b>${fullName}!</b>

<b>Perfect Buxgalter Group</b> ning o'quv kurslariga masofadan turib ro'yxatdan o'ting.

Ma'lumotlaringizni to'g'ri va aniq kiritganingizdan so'ng, biz sizga tez orada bog'lanamiz va o'quv kurslari haqida yana ham ko'proq ma'lumot beramiz!`

      await bot.api.sendPhoto(chatId, 'https://t.me/youngproger/318', {
         reply_markup: keyboard,
         caption: message,
         parse_mode: "HTML"
      })
   } catch (err) {
      new Error(err)
   }
}

exports.backHome = async (bot, firstName, lastName, chatId, messageId) => {
   try {
      const fullName = firstName + ' ' + (lastName ? lastName : '')

      const message = `Assalomu alaykum! Xush kelibsiz hurmatli <b>${fullName}!</b>

<b>Perfect Buxgalter Group</b> ning o'quv kurslari va xizmatlariga masofadan ro'yxatdan o'ting.

Ma'lumotlaringizni to'g'ri va aniq kiritganingizdan so'ng, biz sizga tez orada bog'lanamiz o'quv kurslar va xizmatlar haqida yana ham ko'proq ma'lumot beramiz!`
      await bot.api.deleteMessage(chatId, messageId)
      await bot.api.sendPhoto(chatId, "https://t.me/youngproger/318", {
         reply_markup: keyboard,
         caption:  message,
         parse_mode: "HTML"
      })
   } catch (err) {
      new Error(err)
   }
}