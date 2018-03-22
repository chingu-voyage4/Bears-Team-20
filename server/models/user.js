
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: Boolean,
	createdAt: Date,
	updatedAt: Date
});

userSchema.methods.getUserByUserName = function(username,callback){
	 return this.findOne({username:username},callback);		
}

userSchema.methods.verifyPassword = function(password,hash,callback){
			bcrypt.compare(password,hash,function(err,match){
				if(err) throw err;
				callback(null,match);
			})
}
var User = mongoose.model('User', userSchema);

module.exports =  User;
