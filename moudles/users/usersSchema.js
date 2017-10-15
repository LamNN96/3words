const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types;
const bcrypt = require('bcrypt');

const commentSchema = new Schema({
    userId: {type: ObjectId}, //id nguoi comment
    otherId: {type: ObjectId}, //id nguoi duoc comment
    cmtDate: {type: Date, default: Date.now()},
    cmt1: {type: String}, //
    cmt2: {type: String}, //
    cmt3: {type: String} //

});
const followSchema = new Schema({
    userId: {type: ObjectId}, //id nguoi comment
    followId: {type: ObjectId}, //id nguoi duoc comment
    // userFollowId: [{type: ObjectId}], //id nguoi duoc comment
    followDate: {type: Date, default: Date.now()}
});

const usersSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
    dob: {type: Date},
    activeImage: {type: String},
    listPostedImage : [{type: String}],
    email: {type: String},
    userStatus: {type: Boolean},
    comment: {type: [{type: commentSchema}], default: []},
    follow : {type : [{type : followSchema}], default : []}
    // profile : {type:ObjectId}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

userSchema.pre('save', function (next) {
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