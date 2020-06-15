const mongoose = require('mongoose');

const Dishes = require('./modules/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connent = mongoose.connect(url);

connent.then((db)=>{
    console.log('connected correctly to server');
    var newDish = Dishes({
        name : "Monzer",
        description : "Test"
    });
    newDish.save()
    .then((dish)=>{
        console.log(dish);

       return Dishes.find({}).exec();
    })
    .then((dishes)=>{
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    });
});