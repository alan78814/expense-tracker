const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.get('/', (req, res) => {
    res.render('edit')
})
app.listen(3000, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
