const { InlineKeyboard } = require('grammy')

exports.keyboard = new InlineKeyboard()
   .text("📕 Kurslar", "courses")
   .url("💬 Telegram", "https://t.me/buxgalter_karshi")

exports.backKeyboard = new InlineKeyboard()
   .text('🔝 Bosh menyu', 'start')