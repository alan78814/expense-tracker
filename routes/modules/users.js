const express = require('express')
const router = express.Router()

// 按下 login
router.get('/login', (req, res) => {
  res.render('login')
})

// login 頁面送出資料
router.post('/login', (req, res) => {
})

// 按下 register
router.get('/register', (req, res) => {
  res.render('register')
})


module.exports = router