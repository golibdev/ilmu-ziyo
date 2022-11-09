const dotenv = require('dotenv')
dotenv.config()

const { env } = process
const api = "https://api.perfectbuxgalter.uz/api/v1/"

module.exports = {
   TOKEN: env.TOKEN,
   API: api
}