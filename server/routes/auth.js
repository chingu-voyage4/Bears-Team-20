const router = require('express').Router(); // eslint-disable-line new-cap

router.get('/login', (req, res) => {
        res.render('login');
});

router.get('logout', (req, res) => {
    res.send('logging out');
});

router.get('/google', (req, res) => {
    res.send('loggin in with google');
});

module.exports = router;
