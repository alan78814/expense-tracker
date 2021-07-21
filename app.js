const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const Record = require('./models/record')
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
app.get('/filter', async (req, res) => {
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

app.listen(3000, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
