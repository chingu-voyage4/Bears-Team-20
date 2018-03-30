const User = require('../models/user');

module.exports = function (app, passport) {
	app.get('/api/auth/logout', (req, res) => {
		req.logout();
		res.sendStatus(200);
	});

	app.get(
		'/api/auth/google',
		passport.authenticate('google', {scope: ['profile']})
	);

	app.get(
		'/api/auth/google/callback',
		passport.authenticate('google', {failureRedirect: '/login'}),
		(req, res) => {
			res.redirect('/');
		}
	);

	app.post('/api/auth/login', passport.authenticate('local-login'), (req, res) => {
		res.json(req.user);
	});

	app.post('/api/auth/signup', passport.authenticate('local-signup'), (req, res) => {
		res.json(req.user);
	});

	app.get('/api/auth/profile', passport.myAuthenticate, (req, res) => {
		return res.json(req.user);
	});

	app.post('/api/auth/profile/picture', passport.myAuthenticate, (req, res) => {
		User.updateUsersPicture(req.user, req.body.picture, (err, updatedUser) => {
			if (err) {
				console.log(err);
				return res.status(400).send(err.message);
			}
			return res.json(updatedUser);
		});
	});

	app.post('/api/auth/profile/password', passport.myAuthenticate, (req, res) => {
		User.updateUsersPassword(req.user, req.body, (err, updatedUser) => {
			if (err) {
				console.log(err);
				return res.status(400).send(err.message);
			}
			return res.json(updatedUser);
		});
	});
};

