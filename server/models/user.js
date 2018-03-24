
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

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.statics.getUserByUserName = function (username, callback) {
	return this.findOne({username}, callback);
};

userSchema.methods.validPassword = function (password) {
	const ret = bcrypt.compareSync(password, this.password);
	console.log('IS PASSWORD' + password + ' valid: ', ret);
	return ret;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
