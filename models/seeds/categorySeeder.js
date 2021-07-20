const db = require("../../config/mongoose.js")
const Category = require("../category")
const seedCategory = [
    {
        name: '家居物業',
        icon: 'fas fa-home'
    },
    {
        name: '交通出行',
        icon: 'fas fa-shuttle-van'
    },
    {
        name: '休閒娛樂',
        icon: 'fas fa-grin-beam'
    },
    {
        name: '餐飲食品',
        icon: 'fas fa-utensils'
    },
    {
        name: '其他',
        icon: 'fas fa-pen'
    },
]

db.once('open', () => {
    Category
        .create(seedCategory)
        .then(() => {
            console.log('categorySedder.js done')
            return db.close()
        })
        .catch(error => console.error(error))
})