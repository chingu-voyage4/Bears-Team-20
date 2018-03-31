
function authenticate(req, res, next) {
	if (!req.isAuthenticated) {
		return res.sendStatus(401);
	}
	if (!req.isAuthenticated()) {
		return res.sendStatus(401);
	}
	return next();
}

module.exports = {
	authenticate
};
