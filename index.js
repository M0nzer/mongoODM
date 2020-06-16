const mongoose = require('mongoose');

const Dishes = require('./modules/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id,{
                $set : {description: "updated text"}
            },{
                new : true
            }).exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comment.push({
                reating : 5,
                comment : "hi im monzer",
                auther : "monzer too"
            });
            return dish.save();
        })
        .then((dish)=>{
            console.log(dish);
            return Dishes.remove({});
        }) 
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });

});