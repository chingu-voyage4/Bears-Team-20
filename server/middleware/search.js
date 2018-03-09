/* eslint-disable no-mixed-spaces-and-tabs */
const YouTube = require('youtube-node');

const youTube = new YouTube();
youTube.setKey(process.env.KEY_YOUTUBE);

function mwYoutubeSearch(req, res, next) {
	const {searchQuery, maxResults} = req.body;
    youTube.search(searchQuery, maxResults, (error, result) => {
    	if (error) {
            console.log(error);
            res.locals.searchResults = {
    			...res.locals.searchResults,
    			youtube: null
    		};
    	} else {
    		res.locals.searchResults = {
    			...res.locals.searchResults,
    			youtube: result
    		};
    	}
        next();
    });
}

module.exports = {
	mwYoutubeSearch
};
