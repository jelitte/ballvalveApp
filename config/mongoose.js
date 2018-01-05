var config = require('./config'),
    mongoose = require('mongoose');

console.log(config.db);

module.exports = function(){
    var db = mongoose.connect(config.db,{
        useMongoClient: true,
    });
    require('../app/models/user.server.model');
   
    return db;
};