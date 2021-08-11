const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const helpers = require('handlebars-helpers')()
const methodOverride = require('method-override')
const routes = require('./routes/index')
const session = require('express-session')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})