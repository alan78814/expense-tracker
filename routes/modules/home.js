const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// 首頁
router.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  // test
  const categoryData = {}
  categories.forEach(category => categoryData[category.name] = category.icon)
  // /test
  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      // test
      for (let i = 0; i < records.length; i++) {
        records[i].category = categoryData[records[i].category]
        totalAmount = totalAmount + records[i].amount
      }
      // /test
      
      // original code
      // for (let n = 0; n < records.length; n++) {
      //   for (let i = 0; i < categories.length; i++) {
      //     if (records[n].category === categories[i].name) {
      //       records[n].category = categories[i].icon
      //       totalAmount = totalAmount + records[n].amount
      //     }
      //   }
      // }
      // /original code
      res.render('index', { records, categories, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router
