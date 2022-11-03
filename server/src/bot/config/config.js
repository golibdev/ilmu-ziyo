const dotenv = require('dotenv')
dotenv.config()

const { env } = process

module.exports = {
   TOKEN: env.TOKEN
}