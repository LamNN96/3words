const express = require ('express');
const Router = express.Router();
const userModel = require('./usersModel');
Router.post('/login/facebook', (req, res)=>{
    console.log('body',req.body);
    var newUser = {
        fullname : req.body.fullname,
        activeImage : req.body.activeImage,
        uid : req.body.uid
    };
    console.log("new user",newUser);
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

            req.session.username = doc.username;
            res.send(doc);
        }
    })
});




module.exports = Router;
