var User 		= require('../models/user');

module.exports = function(router){

    // register users
    router.post('/users', function(req,res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if(req.body.username == null || req.body.password == null || req.body.email == null ||req.body.username == '' || req.body.password == '' || req.body.email == '' ){
            res.json({success:false,msg:'Ensure username, email, and password were provided'});
        }
        else{
            user.save(function(err){
                if(err) {
                    res.json({success:false,msg:'username or email is already exists !'});
                }
                else{
                    res.json({success:true,msg:'user created !'});
                }
            });
        }
    });

    // login user
    router.post('/login', function(req,res){
        if(req.body.username == null || req.body.password == null || req.body.username == '' || req.body.password == ''){
            res.json({success:false,msg:'Ensure username and password were provided'});
        }
        else{
            User.findOne({username:req.body.username}).select('email username password').exec(function(err, user) {
                if(err) throw err;
                if(!user){
                    res.json({success:false, msg:'Could not authenticate user'})
                }
                else if(user){
                    var validPassword = user.comparePassword(req.body.password);
                    if(!validPassword){
                        res.json({success:false, msg: 'Could not authenticate password'})
                    }
                    else{
                        res.json({success:true, msg: 'User authenticate!'})
                    }
                }
            });
        }
    });



    return router;
}