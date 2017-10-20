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

}



module.exports = {
    createUser,
    loginUser
}