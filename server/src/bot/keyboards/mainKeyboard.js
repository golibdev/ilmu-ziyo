const { InlineKeyboard } = require('grammy')

exports.keyboard = new InlineKeyboard()
   .text("📕 Kurslar", "courses")
   .url("💬 Telegram", "https://t.me/ilmuziyo2010")

exports.backKeyboard = new InlineKeyboard()
   .text('🔝 Bosh menyu', 'start')