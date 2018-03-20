
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: Boolean,
	createdAt: Date,
	updatedAt: Date
});

let User = mongoose.model('User', userSchema);

module.exports.getUserByUserName = function(username,callback){
		let query = {username:username};
		User.findOne(query,callback);		
}

module.exports.comparePassword = function(password,hash,callback){
			console.log("PASSWORD");
			bcrypt.compare(password,hash,function(err,match){
				if(err) throw err;
				callback(null,match);
			})
}
module.exports = User;
