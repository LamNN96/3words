const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types;
const bcrypt = require('bcrypt');

const keyWordsSchema = new Schema({
   keyWord : {type:String, required: true},
   numOfKeyWord : {type: Number, default: 0}
});
const commentSchema = new Schema({
    userId: {type: ObjectId}, //id nguoi comment
    cmtDate: {type: Date, default: Date.now()},
    content : {type: [{type: keyWordsSchema}], default: []}
});

const followSchema = new Schema({
    userId: {type: ObjectId}, //id nguoi comment
    followDate: {type: Date, default: Date.now()}
});

const usersSchema = new Schema({
    uid : {type: String},
    username: {type: String, required: false, unique: true},
    password: {type: String, required: false},
    fullname: {type: String, required: false},
    dob: {type: Date},
    activeImage: {type: String},
    listPostedImage : [{type: String}],
    email: {type: String},
    userStatus: {type: Boolean},
    comments: {type: [{type: commentSchema}], default: []},
    follows : {type : [{type : followSchema}], default : []}
    // profile : {type:ObjectId}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

usersSchema.pre('save', function (next) {
    let user = this;
    if(user){
        bcrypt.genSalt(10, function (err, salt) {
            console.log(salt);
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                next();
            });
        });
    }

});


module.exports = usersSchema;