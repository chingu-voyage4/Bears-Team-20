
module.exports = function (router, passport) {
    router.get('/api/auth/logout', (req, res) => {
        req.logout();
        res.sendStatus(200);
    });

    router.get('/api/auth/google', (req, res) => {
         res.send('loggin in with google. Not implemented yet :( ');
    });

    router.post('/api/auth/login', passport.authenticate('local-login'), (req, res) => {
        res.json(req.user);
    });

    router.post('/api/auth/signup', passport.authenticate('local-signup'), (req, res) => {
        res.json(req.user);
    });
};

