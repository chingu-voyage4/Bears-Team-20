// Const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	(username, password, done) => {
		User.getUserByUserName(username, (err, user) => {
			if (err) {
				throw err;
			}
			if (!user) {
				return done(null, false);
			}
			if (!user.validPassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		});
	}));

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		((req, email, password, done) => {
		// Asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(() => {
			// Find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			User.findOne({email}, (err, user) => {
				// If there are any errors, return the error
				if (err) {
					return done(err);
				}
				// Check to see if theres already a user with that email
				if (user) {
					return done(null, false);
				}
				// If there is no user with that email
				// create the user
				const newUser = new User();

				// Set the user's local credentials
				newUser.username = req.body.username;
				newUser.email = email;
				newUser.password = newUser.generateHash(password);

					// Save the user
					newUser.save(err => {
						if (err) {
							throw err;
						}
						return done(null, newUser);
					});
			});
		});
		})));
};

