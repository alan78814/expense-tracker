const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// 按下 login
router.get('/login', (req, res) => {
  res.render('login')
})

// login 頁面送出資料
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 按下 register 切換頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// register 頁面送出資料
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      // 有註冊帳號，返回原本畫面
      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        // 如果還沒註冊：寫入資料庫
        return User.create({
          name,
          email,
          password
        })
      }
    })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('errorPage', { err }) //簡易錯誤面板，傳送 err 到使用者端
    })
})

module.exports = router