const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const MenuCont = require('./controllers/menuController')
const CustomerCont = require('./controllers/customerController')
const MembershipCont = require('./controllers/membershipController')
const orderCont = require('./controllers/orderController');
var Sequelize = require('sequelize');
const Model = require('./models')
const Membership = Model.Membership
const Menu = Model.Menu


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  Menu.findAll()
      .then(menu => {
        res.render('index.ejs', {menu})
      })
})

app.get('/customer/registration', CustomerCont.getAdd)

app.post('/customer/registration', CustomerCont.postAdd)

// orderCont.postAdd({
//     body: 
//     {
//         date: new Date,
//         CustomerId: 2,
//         MenuId: 4,
//         qty:5
//     }
// },);
orderCont.getMenuFavorite();
app.listen(port)




 