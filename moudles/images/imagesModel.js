const mongoose = require('mongoose');
const imagesSchema = require('./imagesSchema')

let imageModel = mongoose.model('images', imagesSchema);


//Upload image, many time / 1 user, can change
const uploadImage = (image, callback)=>{
    imageModel.create(image, (err, doc)=>{
        if(err){
            callback(err);
        } else {
            callback(null, doc);
        }
    });
};


