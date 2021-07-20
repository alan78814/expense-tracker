const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Expense'
const db = mongoose.connection

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db