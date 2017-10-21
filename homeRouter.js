const express = require('express');
const usersController = require('./moudles/users/usersModel');
const Router = express.Router();

Router.get('/', (req, res) => {
  usersController.getAllImage((err, desImages) => {
    if(err == null) {
      if(desImages.length === 0){
        res.render('home', {
          desImages : " No images "
        });
      } else {
        res.render('home',{
          desImages   : desImages
        }
        );
      }
    }
  })
})

module.exports = Router;
