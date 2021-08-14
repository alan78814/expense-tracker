const db = require('../../config/mongoose.js')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const seedRecord = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021-07-23',
    amount: 60,
    merchant: "便當店"
  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2021-08-23',
    amount: 60,
    merchant: "麵店"
  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2021-08-23',
    amount: 120,
    merchant: "捷運"
  },
  {
    name: '電影-驚奇隊長',
    category: '休閒娛樂',
    date: '2021-07-23',
    amount: 120,
    merchant: "威秀"
  },
  {
    name: '租金',
    category: '家居物業',
    date: '2021-06-23',
    amount: 25000,
    merchant: "房東"
  }
]
const seedUser = {
  name: 'user1',
  email: 'user1@example.com',
  password: '123'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(seedUser.password, salt))
    .then(hash => User.create({
      name: seedUser.name,
      email: seedUser.email,
      password: hash,
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(
        Array.from({ length: seedRecord.length }, (_, i) =>
          Record.create({
            name: seedRecord[i].name,
            category: seedRecord[i].category,
            date: seedRecord[i].date,
            amount: seedRecord[i].amount,
            merchant: seedRecord[i].merchant,
            userId
          })
        )
      )
    })
    .then(() => {
      console.log('recordSeeder done!')
      return db.close()
    })
    .catch((err) => console.error(err))
})

