
module.exports = function (router, passport) {
    router.get('/api/auth/logout', (req, res) => {
        res.send('logging out');
    });

    router.get('/api/auth/google', (req, res) => {
         res.send('loggin in with google');
    });

    router.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
        res.json(req.user);
    });

    router.post('/api/auth/signup', passport.authenticate('local'), (req, res) => {
        res.json(req.user);
    });
};

