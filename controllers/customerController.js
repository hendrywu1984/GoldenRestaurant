const Model = require('../models');
const CustomerModel = Model.Customer;
const MembershipModel = Model.Membership;

class CustomerController{
    static getAdd(req, res){
        MembershipModel.findAll()
                        .then(members => {
                            res.render('customerRegistration.ejs', {members})
                        })
                        .catch( err => {
                            res.res(err)
                        })
    }

    

    static postAdd(req, res){
        CustomerModel.create(req.body)
          .then(data => res.redirect('/'))
          .catch(err => console.log(err))
    }

    static getAll(req, res) {
        CustomerModel.findAll()
          .then(data => res.render('customer', { data }))
          .catch(err => console.log(err))
    }

    static find(req, res) {
        CustomerModel.find(req.params.id, (err, cust) => {
            if (err) res.send(err)
            // else res.render('customer', { data: cust })
          })
    }

    static postEdit(req, res) {
        // const data = {
        //     id: req.body.id,            
        //     name: req.body.name,
        //     dob: req.body.dob,
        //     MembershipId: req.body.membershipId,
        //     email: req.body.email
        // }

        CustModel.update(req.body, (err, success) => {
            if (err) res.send(err)
            else res.send('Edited')
        })
    }

    static postDelete(req, res) {
        // const data = {
        //     id: req.body.id,
        //     name: req.body.name,
        //     dob: req.body.dob,
        //     MembershipId: req.body.membershipId,
        //     email: req.body.email
        // }

        CustomerModel.update(req, (err, success) => {
            if (err) res.send(err)
            else res.send('Edited')
        })
    }
}

module.exports = CustomerController;