const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// 首頁
router.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.name] = category.icon)

  async function test() {
    const records = await Record.find().lean()
    try {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        records[i].category = categoryData[records[i].category]
        totalAmount = totalAmount + records[i].amount
      }
      res.render('index', { records, categories, totalAmount })
    } catch (error) {
      console.error(error)
      res.render('errorPage', { err }) //簡易錯誤面板，傳送 err 到使用者端
    }
  }

  test()

  // original data
  // Record.find()
  //   .lean()
  //   .then(records => {
  //     let totalAmount = 0
  //     for (let i = 0; i < records.length; i++) {
  //       records[i].category = categoryData[records[i].category]
  //       totalAmount = totalAmount + records[i].amount
  //     }
  //     res.render('index', { records, categories, totalAmount })
  //   })
  //   .catch(error => console.error(error))
  // original data
})

module.exports = router
