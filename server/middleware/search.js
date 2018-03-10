/* eslint-disable no-mixed-spaces-and-tabs */
const YouTube = require('youtube-node');

const youTube = new YouTube();
youTube.setKey(process.env.KEY_YOUTUBE);

function mwYoutubeSearch(req, res, next) {
	const {searchQuery, maxResults} = req.body;
	if (!res.locals.searchResults) {
		res.locals.searchResults = {};
	}

    youTube.search(searchQuery, maxResults, (error, result) => {
    	if (error) {
            console.log(error);
            res.locals.searchResults = {
    			...res.locals.searchResults,
    			youtube: []
    		};
    	} else {
    		res.locals.searchResults = {
    			...res.locals.searchResults,
    			youtube: result.items
    		};
    	}
        next();
    });
}

module.exports = {
	mwYoutubeSearch
};
