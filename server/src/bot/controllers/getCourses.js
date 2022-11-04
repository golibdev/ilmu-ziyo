const axios = require('axios');
const { backKeyboard } = require('../keyboards/mainKeyboard')
const { InlineKeyboard, InputFile } = require('grammy');

exports.getAll = async (bot, chatId, messageId) => {
   try {
      const api = 'https://api.perfectbuxgalter.uz/api/v1/course';
      const res = await axios.get(api);

      const courses = res.data.courses;

      if(courses.length === 0) {
         await bot.api.deleteMessage(chatId, messageId)

         await bot.api.sendPhoto(chatId, "https://t.me/youngproger/318", {
            reply_markup: backKeyboard,
            caption: "🚫 Yo'nalishlar mavjud emas",
            parse_mode: 'HTML'
         })
         return
      }

      const keyboard = new InlineKeyboard();

      courses.forEach((course, index) => {
         if(index % 1 === 0) {
            keyboard.row();
         }
         keyboard.text(`📚 ${course.title}`, `course_${course.id}`);
      })

      keyboard.row();
      keyboard.text('🔝 Bosh menyu', 'start');

      await bot.api.deleteMessage(chatId, messageId);

      const message = `<b>Perfect Buxgalter Group</b> o'quv markazidagi mavjud o'quv kurslar. O'quv kursiga ariza qoldirish uchun kursni tanlab, kursga yozilish tugmasiga bosing!
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
      const api = `https://api.perfectbuxgalter.uz/api/v1/course/${id}`
      const res = await axios.get(api)
      const course = res.data.course;

      const image = course.image.split('http://api.perfectbuxgalter.uz')[1]

      const path = new InputFile(`public${image}`)
      const keyboard = new InlineKeyboard()
         .text('✍️ Kursga yozilish', `enrollCourse_${id}`).row()
         .text('🔝 Bosh menyu', 'start')

      await bot.api.deleteMessage(chatId, messageId);

      await bot.api.sendPhoto(chatId, path, {
         caption: course.description,
         reply_markup: keyboard
      })
   } catch (err) {
      console.log(err)
   }
}