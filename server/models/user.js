
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const playlist = require('./playlist');


const Schema = mongoose.Schema;

const userSchema = new Schema({
<<<<<<< HEAD
	username: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: Boolean,
	createdAt: Date,
	updatedAt: Date,
	playlists:[playlist]
=======
	username: {type: String},
	email: {type: String},
	password: {type: String},
	googleId: {type: String},
	admin: {type: Boolean, default: false}
>>>>>>> 13a785f316ee8905a8ef2c9ccb725aba6efd4d59
});

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.statics.getUserByUserName = function (username, callback) {
	return this.findOne({username}, callback);
};

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
