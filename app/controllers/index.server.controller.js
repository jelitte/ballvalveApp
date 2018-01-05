exports.render = function(req,res){
    /*
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    */
    //go to index.ejs file
    res.render('index',{
        title : 'Hello World',
        //userFullName : req.user ? req.user.fullName : ''
        user:JSON.stringify(req.user)
        
    });
};