const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const likesSchema = new Schema({
    userID: {type: ObjectID},
    likeDate: {type: Date, default: Date.now()}
});

const imageSchema = new Schema({
    imageUrl: {type: String, require: true},
    likes: {type: [{type: likesSchema}], default: []},
    userID: {type: ObjectID, ref : 'users', default: null},
    views: {type: Number, default: 0},
    imageStatus : {type : Boolean}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});


const imagesModel = mongoose.model('images', imageSchema);