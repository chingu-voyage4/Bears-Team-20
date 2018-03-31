const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Playlist = require('./playlist');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type: String, required: true},
	email: {type: String},
	password: {type: String},
	createdAt: Date,
	updatedAt: Date,
	playlists: [{type: Schema.Types.ObjectId, ref: 'Playlist'}],
	googleId: {type: String},
	picture: {type: String},
	admin: {type: Boolean, default: false}
});

userSchema.statics.getUsersPlaylists = function (username, cb) {
	return this.findOne({username})
		.populate('playlists')
		.exec((err, user) => {
			if (err) {
				return cb(err);
			}
		cb(null, user.playlists);
		});
};

userSchema.statics.getUsersPlaylist = function (username, playlistID, cb) {
	return this.findOne({username})
		.populate('playlists')
		.exec((err, user) => {
			if (err) {
				return cb(err);
			}
		cb(null, user.playlists.find(e => e._id === playlistID));
		});
};

userSchema.statics.getPublicPlaylists = function (cb) {
	return this.find({}, (err, users) => {
		if (err) {
			return cb(err);
		}
		cb(null, users.reduce((acc, user) => {
			const publicPlaylists = user.playlists.filter(playlist => playlist.public);
			return acc.concat(publicPlaylists);
		}, [])
		);
	});
};

userSchema.statics.createNewPlaylist = function (username, playlistData, cb) {
	return this.findOne({username})
		.populate('playlists')
		.exec((err, user) => {
			if (err) {
				return cb(err);
			}

			const newPlaylist = new Playlist({
				...playlistData,
				creator: user._id
			});

			newPlaylist.save(err => {
				if (err) {
					return cb(err);
				}
				return cb(null, newPlaylist);
			});
		});
};

userSchema.statics.getUserByUserName = function (username, callback) {
	return this.findOne({username}, callback);
};

userSchema.statics.updateUsersPassword = function (user, credentials, cb) {
	const {currentPassword, nextPassword, repeatPassword} = credentials;
	if (!currentPassword || !nextPassword || !repeatPassword) {
		return cb(new Error('Bad request'));
	}
	try {
		if (nextPassword !== repeatPassword) {
			return cb(new Error('password mismatch'));
		}
		this.findOne({
			username: user.username
		}, (err, user) => {
			if (err) {
				return cb(err);
			}
			if (!user.validPassword(currentPassword)) {
				return cb(new Error('invalid password'));
			}

			user.password = user.generateHash(nextPassword);
				user.save((err, updatedUser) => {
					if (err) {
						return cb(err);
					}
					cb(null, updatedUser);
				});
		});
	} catch (err) {
		cb(err);
	}
};

userSchema.statics.updateUsersPicture = function (user, newPicture, cb) {
	if (!newPicture) {
		return cb(new Error('Bad request'));
	}
	try {
		this.findOne({
			username: user.username
		}, (err, user) => {
			if (err) {
				return cb(err);
			}

			user.picture = newPicture;
			user.save((err, updatedUser) => {
				if (err) {
					return cb(err);
				}
				cb(null, updatedUser);
			});
		});
	} catch (err) {
		cb(err);
	}
};

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
