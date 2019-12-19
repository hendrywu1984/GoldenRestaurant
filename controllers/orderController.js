const Model = require('../models');
const CustomerModel = Model.Customer;
const MembershipModel = Model.Membership;
const OrderModel = Model.Order;
const MenuModel = Model.Menu;

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
        OrderModel.create(req.body)
          .then(data => res.redirect('/'))
          .catch(err => console.log(err))
    }
}

module.exports = OrderCont;