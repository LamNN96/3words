const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = require('./usersSchema');

let userModel = mongoose.model('users', userSchema);

const createUser = (user, callback )=>{
    userModel.create(user, (err, doc)=>{
        if(err){
            console.log(err);
            callback(err);
        } else {
            callback(null, doc);
        }
    });
};

//Login
const loginUser = (user, callback) => {
    userModel.findOne({"username": user.username}, (err, doc) => {
        bcrypt.compare(user.password, doc.password, (err, res) => {
            if (res) {
                callback(null, doc);
            } else {
                callback('Username or password invalid!');
            }
        });
    });
};

const submitComment = (cmtList, callback )=>{

};

const getAllImage = (callback) => {
  userModel.find({}, (err, images) => {
    if(err) {
      console.log(" ERROR getAllImage : ", err);
    } else {
      var desImages = [];
      for (i=0; i<images.length; i++) {
        let item = {
          activeImage : images[i].activeImage,
          fullname    : images[i].fullname
        };
        desImages[i] = item;
      };
      console.log(desImages);
      callback(null, desImages);
      };
    });
  };



module.exports = {
    createUser,
    loginUser,
    getAllImage
}
