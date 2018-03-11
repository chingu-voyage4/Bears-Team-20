/* eslint-disable no-mixed-spaces-and-tabs */
const YouTube = require('youtube-node');

const youTube = new YouTube();
youTube.setKey(process.env.KEY_YOUTUBE);

/**
 * Parameters:
 * 	-query: text to be searched
 * 	-maxResults: max qty of results
 *
 * Return: res.locals.searchResults[service]
 *
 * Return format:
 * {
 * 		title: String
 * 		serviceSource: String
 * 		link: String
 * 		description: String || null
 * 		thumbnail: String || null
 * }
 *
 */

function mwYoutubeSearch(req, res, next) {
	const {query, maxResults} = req.query;
	if (!res.locals.searchResults) {
		res.locals.searchResults = {};
	}

    youTube.search(query, maxResults || 10, {type: 'video'}, (error, result) => {
    	if (error) {
            console.log(error);
            res.locals.searchResults = {
    			...res.locals.searchResults,
    			youtube: []
    		};
    	} else {
    		res.locals.searchResults = {
    			...res.locals.searchResults,
    			youtube: result.items.map(e => ({
    				title: e.snippet.title,
    				serviceSource: 'youtube',
    				link: 'https://www.youtube.com/watch?v=' + e.id.videoId,
    				description: e.snippet.description,
    				thumbnail: e.snippet.thumbnails.default.url
    			}))
    		};
    	}
        next();
    });
}

module.exports = {
	mwYoutubeSearch
};
