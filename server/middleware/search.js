/* eslint-disable no-mixed-spaces-and-tabs */
const YouTube = require('youtube-node');

const youTube = new YouTube();
youTube.setKey(process.env.KEY_YOUTUBE);

/**
 * Parameters:
 * 	-query: text to be searched
 * 	-maxResults: max qty of results
 */

function mwYoutubeSearch(req, res, next) {
	const {query, maxResults} = req.query;
	if (!res.locals.searchResults) {
		res.locals.searchResults = {};
	}

    youTube.search(query, maxResults || 10, (error, result) => {
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
