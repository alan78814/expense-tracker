const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// 首頁篩選 此段改寫成全async/awit 目前進度 
router.get('/filter', async (req, res) => {
  const categories = await Category.find().lean()
  // 當選擇 Category or date為空白時，{ $ne: '' } 使後面 $match 不出錯。因為{ $ne: '' } 表示不等於空白皆可
  const inputCategory = req.query.category ? req.query.category : { $ne: '' }
  const inputdate = req.query.month ? req.query.month : { $ne: '' }
  const categoryData = {}
  const filteredData = await Record.aggregate([
    { $project: { name: 1, amount: 1, category: 1, date: { $substr: ["$date", 0, 7] }, day: { $substr: ["$date", 7, 9] } } },
    { $match: { 'category': inputCategory, 'date': inputdate } }
  ])
  // 產出 category icon 對應名字一物件，res.render中使用渲染出icon
  categories.forEach(category => categoryData[category.name] = category.icon)

  async function getFilterData() {
    try {
      if (!filteredData) return res.redirect('/')
      const records = filteredData // home.js使用records
      const date = []
      const rawRecords = await Record.find().lean()
      let totalAmount = 0
      // 在篩選欄顯示 db 中有的月份
      for (let i = 0; i < rawRecords.length; i++) {
        if (!date.includes(rawRecords[i].date.slice(0, 7))) {
          date.push(rawRecords[i].date.slice(0, 7))
        }
      }
      // 顯示篩選資料 icon/totalAmount
      for (let i = 0; i < records.length; i++) {
        records[i].category = categoryData[records[i].category]
        totalAmount = totalAmount + records[i].amount
      }

      res.render('index', { records, categories, inputCategory, totalAmount, date, inputdate })
    } catch (error) {
      console.error(error)
      res.render('errorPage', { err }) //簡易錯誤面板，傳送 err 到使用者端
    }
  }

  getFilterData()
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
