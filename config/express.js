var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    config =require('./config'),
    flash = require('connect-flash'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(session),
    http = require('http'),
    socketio = require('socket.io');

    

module.exports = function(db){
    
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server);
    
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(bodyParser.json());
    
    app.use(methodOverride());
    console.log(config.db);
    var mongoStore = new MongoStore({
       //db : db.connection.db
        url : config.db,
        //host :'localhost',
        //collection : 'mean-user'
    });
    
    //Session
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));
    
    // View Engine
    app.set('views','./app/views');    
    app.set('view engine','ejs');
    
    //use Passport
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/user.server.routes.js')(app);
    
    app.use(express.static('./public'));
    //app.use(express.static('./public/monitor/views/css'));
    //app.use(express.static('./app/views/css'));
    //app.use(express.static('./public/lib/bootstrap/dist/css'));
    
    require('./socketio')(server,io,mongoStore);
    
    
    return server;
};