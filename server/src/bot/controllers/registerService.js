const { Keyboard } = require('grammy')
const axios = require('axios')
const { API } = require('../config/config')

exports.register = async (router, ctx, id) => {
   try {
      await ctx.reply('Ism familiyangizni kiriting!');
         ctx.session.step = "name"

         const name = router.route('name')

         name.on("message:text", async (ctxx) => {
            const fullName = ctxx.msg.text;

            if(fullName.length < 3) {
               await ctxx.reply("Kamida 3ta belgidan iborat bo'lishi kerak")
               return   
            }

            ctxx.session.fullName = fullName;

            ctxx.session.step = "phone";

            const keyboard = new Keyboard().requestContact('📞 Telefon')
               .resized().oneTime()

            await ctxx.reply("Telefon raqamingizni jo'nating", {
               reply_markup: keyboard
            })
         })

         name.use((ctxx) => ctxx.reply("Ism familiyangizni kiriting!"))

         const phone = router.route('phone')
         phone.on('message', async (ctxx) => {
            const name = ctxx.session.fullName

            if(name === undefined) {
               await ctxx.reply("Ism familiyangizni kiriting!")
               ctxx.session.step = "name";
               return
            }

            let phone = ctxx.message?.contact?.phone_number
               ? ctxx.message.contact.phone_number
               : ctxx.msg.text

            const phoneArr = phone.split('');

            const plusIndex = phoneArr.findIndex(item => item == '+');

            if(plusIndex != -1) {
               phone = +phoneArr.slice(1, phoneArr.length).join('');
            }

            const pattern = /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/

            if(!pattern.test(phone)) {
               await ctxx.reply(`Telefon raqamni xato kiritdingiz! Qayta urunib ko'ring! Misol uchun <b>998901234567</b>`, {
                  parse_mode: 'HTML'
               })
               return
            }

            ctxx.session.phone = phone;

            const users = {
               phoneNumber: ctxx.session.phone,
               fullName: ctxx.session.fullName,
               serviceId: id
            }

            const api = `${API}user/register`;

            await axios.post(api, users)

            await ctxx.reply(`Rahmat. ${users.fullName}, siz ro'yhatga olindingiz.\nAgar qayta ro'yhatdan o'tmoqchi bo'lsangiz /start buyurg'ini yuboring`, {
               reply_markup: {
                  remove_keyboard: true
               }
            })
            ctxx.session.step = "start";
         })

   } catch (err) {
      console.log(err)
   }
}