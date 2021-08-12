const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// 首頁篩選
router.get('/filter', async (req, res) => {
  const categories = await Category.find().lean()
  const category = req.query.category
  // test
  const categoryData = {}
  categories.forEach(category => categoryData[category.name] = category.icon)
  // /test
  if (!category) return res.redirect('/')
  Record.find({ category })
    .lean()
    .then(records => {
      let totalAmount = 0
      // test
      for (let i = 0; i < records.length; i++) {
        records[i].category = categoryData[records[i].category]
        totalAmount = totalAmount + records[i].amount
      }
      // /test

      // //original code
      // for (let n = 0; n < records.length; n++) {
      //   for (let i = 0; i < categories.length; i++) {
      //     if (records[n].category === categories[i].name) {
      //       records[n].category = categories[i].icon
      //       totalAmount = totalAmount + records[n].amount
      //     }
      //   }
      // }
      // // /original code

      res.render('index', { records, categories, category, totalAmount })
    })
    .catch(error => console.error(error))
})
// 首頁新增支出進入new.hbs
router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  res.render('new', { categories })
})
// 新增支出頁送出
router.post('/', (req, res) => {
  const record = req.body
  const { name, category, date, amount, merchant } = record
  Record.create({ name, category, date, amount, merchant })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 首頁修改進入edit.hbs
router.get('/:id/edit', async (req, res) => {
  const categories = await Category.find().lean()
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => {
      const category = record.category
      res.render('edit', { record, id, categories, category })
    })
    .catch(error => console.log(error))
})
// edit.hbs送出資料  原先 router.post('/records/:id/edit'
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editedRecord = req.body
  Record.findById(id)
    .then(record => {
      record._id = id
      record.name = editedRecord.name
      record.category = editedRecord.category
      record.date = editedRecord.date
      record.amount = editedRecord.amount
      record.merchant = editedRecord.merchant
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 首頁刪除資料  原先 router.post('/records/:id/delete'
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
