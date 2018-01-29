var users = require('../../app/controllers/user.server.controller');
var passport = require('passport');


module.exports = function(app){
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local',{
            //successRedirect :'/',
            //failureRedirect :'/signin',
            successRedirect :'/#!/monitor',
            failureRedirect :'/',
            failureFlash : true
        }));
    
    app.get('/signout',users.signout);
    
    
    // Commander form -> localhost:port/users  
    app.route('/users')
        .post(users.create)
        .get(users.list);
        
    
    app.route('/users/:userID')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
    
    
    app.param('userID', users.userByID);
    
}