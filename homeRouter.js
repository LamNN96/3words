const express = require('express');
const usersController = require('./moudles/users/usersModel');
const Router = express.Router();

Router.get('/', (req, res) => {
  usersController.getAllImage((err, images) => {
    if(err == null) {
      if(images.length === 0){
        res.render('home', {
          images : " No images "
        });
      } else {
        res.render('home',{
          images : urlImages
        }
        );
      }
    }
  })
})

module.exports = Router;
