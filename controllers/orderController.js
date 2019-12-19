const Model = require('../models');
const CustomerModel = Model.Customer;
const MembershipModel = Model.Membership;
const OrderModel = Model.Order;
const MenuModel = Model.Menu;
var sequelize = require('sequelize');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hospital.db');


class OrderController{
    // static getAdd(req, res){
    //     MembershipModel.findAll()
    //         .then(members => {
    //             res.render('customerRegistration.ejs', {members})
    //         })
    //         .catch( err => {
    //             res.res(err)
    //         })
    // }

    static getAdd(custId, req, res){
        let data ={};

        CustomerModel.findByPk(custId)
            .then(customer => {
                data.customer = customer;
                return MembershipModel.findByPk(customer.id)
            })
            .then(membership => {
                data.membership = membership;
                return MenuModel.findAll()        
            })
            .then(menu => {
                data.menu = menu;
                res.render('', data)
            })
            .catch(err => console.log(err))
    }

    static postAdd(req, res){
        console.log(req.body);
        
        OrderModel.create(req.body)
          .then(data => res.redirect('/'))
          .catch(err => console.log(err))
    }

    static getMenuFavorite(req,res){
        const data = [];
        const result = [];
        OrderModel.findAll({
            attributes: ['MenuId', [sequelize.fn('sum', sequelize.col('qty')), 'total']],
            group: ['Order.MenuId'],
            limit: 3,
            raw: true,
            order: sequelize.literal('total DESC')
        })
        .then (menu=> {
            menu.forEach(element => {
                data.push(element.MenuId);
            });
            return data
        })
        .then(items => {
            // console.log(items);
            const favMenu= `
                    SELECT  *
                    FROM    Menus
                    WHERE   id IN ?
                `

            db.serialize(function(){
                db.all(favMenu, data, function(err) {
                    if (err) console.log('Create table contact error');
                    else console.log('Create table contact successfully');
                });
            })

            console.log(data);
            
//              MenuModel.findAll({
//                 attributes: ['id', items.id]
              
//               .then(item=> {
// console.log(item);

//               })
//             });
//             // for (let i=0; i< items.length; i++) {
//             //     console.log(MenuModel.findByPk(items[i]));
                
//             //     result.push(MenuModel.findByPk(items[i]));
//             // }
//             // console.log(result);
            
//             // items.forEach(item => {
//             //     console.log(1, item);
                
//             //     const prod = MenuModel.findByPk(item);
//             //      console.log(prod);
                 
//             // })

            
            
        })
        
        
        .catch(err => console.log(err))
    }
}

module.exports = OrderController;