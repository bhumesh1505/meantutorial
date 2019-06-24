var express 	= require('express');
var app 		= express();
const port 		= 8000 || process.env.PORT;
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var User 		= require('./app/models/user');
var bodyParser	= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

mongoose.connect('mongodb+srv://bhumesh1998:bhumesh1998@cluster0-ubi02.mongodb.net/test?retryWrites=true&w=majority',function(err){
	if(err){
		console.log("failed to connect to database: " + err);
	}
	else
	{
		console.log("Successfully connected to MongoDB");
	}
});

app.post('/users', function(req,res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if(req.body.username == null || req.body.password == null || req.body.email == null ||req.body.username == '' || req.body.password == '' || req.body.email == '' ){
		res.send('Ensure username, email, and password were provided');
	}
	else{
		user.save(function(err){
			if(err) {
				res.send("username or email is already exists !");
			}
			else{
				res.send("user created !");
			}
		});
	}
});

app.listen(port ,function() {
	console.log("Running server at port : ",port);
}); 