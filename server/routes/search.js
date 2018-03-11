const router = require('express').Router(); // eslint-disable-line new-cap
const mwSearch = require('../middleware/search');

router.get('/', mwSearch.youtube, (req, res) => {
    res.json(res.locals.searchResults);
});

module.exports = router;
