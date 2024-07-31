require('dotenv').config()

let PORT = process.env.PORT
let MONGOURL = process.env.MONGOURL

module.exports = {
    PORT,
    MONGOURL
}