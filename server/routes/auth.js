
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

	app.get('/api/auth/profile', (req, res) => {
		if (req.isAuthenticated()) {
			return res.json(req.user);
		}
		return res.sendStatus(401);
	});

	app.post('/api/auth/login', passport.authenticate('local-login'), (req, res) => {
		res.json(req.user);
	});

	app.post('/api/auth/signup', passport.authenticate('local-signup'), (req, res) => {
		res.json(req.user);
	});
};

