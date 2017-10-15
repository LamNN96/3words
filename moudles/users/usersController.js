const express = require ('express');
const Router = express.Router();
const userModel = require('./usersModel');
Router.post('/', (req, res)=>{
    let newUser = {
        username : req.body.username,
        password : req.body.password,
        fullname:req.body.fullname,
        email: req.body.email,
        dob : req.body.dob,
        image : req.body.image
    };
    userModel.createUser(newUser, (err, doc)=>{
        if (err){
            console.log(err);
            // callback(err);
            res.send(err);
        }else {
            res.send(doc);
        }
    })
});

Router.post('/signIn', (req, res)=>{
    console.log(req.body);
    userModel.loginUser(req.body, (err, doc)=> {
        if (err){
            console.log(err);
            res.send(err);
        } else {
            // if(req.body.remember){
            //     res.session.cookie.username = doc.username;
            // }
            req.session.username = doc.username;
            res.send(doc);
        }
    })
})


module.exports = Router;
