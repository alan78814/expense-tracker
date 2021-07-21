const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const db = require("./config/mongoose")
const Category = require('./models/category')
const helpers = require('handlebars-helpers')()

require('./config/mongoose')

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//首頁
app.get('/', async (req, res) => {
    const categories = await Category.find().lean()
    Record.find()
        .lean()
        .then(records => {
            let totalAmount = 0
            for (let n = 0; n < records.length; n++) {
                for (let i = 0; i < categories.length; i++) {
                    if (records[n].category === categories[i].name) {
                        records[n].category = categories[i].icon
                        totalAmount = totalAmount + records[n].amount
                    }
                }
            }
            res.render('index', { records, categories, totalAmount})
        })
        .catch(error => console.error(error))
})
//首頁篩選
app.get('/categories/filter', async (req, res) => {
    const categories = await Category.find().lean()
    const category = req.query.category
    if (!category) return res.redirect('/')
    Record.find({ category })
        .lean()
        .then(records => {
            let chosenRecord
            let totalAmount = 0
            for (let n = 0; n < records.length; n++) {
                for (let i = 0; i < categories.length; i++) {
                    if (records[n].category === categories[i].name) {
                        chosenRecord = records[n].category
                        records[n].category = categories[i].icon
                        totalAmount = totalAmount + records[n].amount
                    }
                }
            }
            res.render('index', { records, categories, chosenRecord, totalAmount})
        })
        .catch(error => console.error(error))
})
// 首頁新增支出進入new.hbs
app.get('/records/new', (req, res) => {
    res.render('new')
})
// 新增支出頁送出
app.post('/records', (req, res) => {
    const record = req.body
    const {name, category, date, amount} = record
    return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})
// 首頁修改進入edit.hbs
app.get('/records/edit', (req, res) => {
    res.render('edit')
})
// edit.hbs送出資料
app.post('/records/edit', (req, res) => {
    res.render('edit')
})

app.listen(3000, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
