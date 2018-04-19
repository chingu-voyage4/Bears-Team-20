/* eslint-disable no-mixed-spaces-and-tabs */
// import axios from 'axios';
const axios = require('axios');
const YouTube = require('youtube-node');
const SC = require('node-soundcloud');
const each = require('async/each');

/**
 * Parameters:
 * 	-query: text to be searched
 * 	-maxResults: max qty of results
 *
 * Return: res.locals.searchResults => Array[ Objects ]
 *
 * Return format:
 * {
 * 		title: String
 * 		service: String
 * 		link: String
 * 		description: String || null
 * 		thumbnail: String || null
 * }
 *
 */

// Youtube initialization
const youTube = new YouTube();
youTube.setKey(process.env.YOUTUBE_KEY);

// Soundcloud initialization
/* SC.init({
	id: process.env.SOUNDCLOUD_ID,
	secret: process.env.SOUNDCLOUD_SECRET,
	//uri: 'your SoundCloud redirect URI',
	accessToken: process.env.SOUNDCLOUD_TOKEN
}); */

function __youtube(req, res, next) {
	const {query, maxResults} = req.query;
	if (!res.locals.searchResults) {
		res.locals.searchResults = [];
	}

    youTube.search(query, maxResults || 10, {type: 'video'}, (error, result) => {
    	if (error) {
            console.log(error);
    	} else {
    		res.locals.searchResults = [
    			...res.locals.searchResults,
    			...result.items.map(e => ({
    				title: e.snippet.title,
    				service: 'Youtube',
    				link: 'https://www.youtube.com/watch?v=' + e.id.videoId,
    				description: e.snippet.description,
    				thumbnail: e.snippet.thumbnails.default.url
    			}))
    		];
    	}
        next();
    });
}

async function __deezer(req, res, next) {
	const DEEZER_URL = 'https://api.deezer.com/search/track?q=';
	const {query} = req.query;
	if (!res.locals.searchResults) {
		res.locals.searchResults = [];
	}
	try {
		const response = await axios.get(`${DEEZER_URL}${query}&limit=10`);
		const tracks = response.data.data;
		res.locals.searchResults = [
			...res.locals.searchResults,
			...tracks.map(t => ({
			  title: t.title,
			  service: 'Deezer',
			  link: t.link,
			  description: t.artist.name,
			  thumbnail: t.album.cover_small
			}))
		];
	} catch (err) {
		console.error('err at __deezer call', err);
	} finally {
		next();
	}
}

/**
 * DO NOT USE THIS MIDDLEWARE YET.
 * Soundcloud is not giving API keys for the time being.
 * Therefore soundcloud integration will be on hold until this is solved
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function __soundcloud(req, res, next) {
	const {query} = req.query;
	if (!res.locals.searchResults) {
		res.locals.searchResults = [];
	}

	SC.get('/tracks', {
		q: query
	})
		.then(tracks => {
		console.log(tracks);
		next();
		})
		.catch(console.log);
}

// Dailymotion API call

async function __dailymotion(req, res, next) {
	 const {query} = req.query;
	const url = `https://api.dailymotion.com/videos?fields=description,thumbnail_60_url,title,url,&search=${query}&limit=10`;
	 if (!res.locals.searchResults) {
		 res.locals.searchResults = [];
	 }

	 try {
		const response = await axios.get(url);
		const tracks = response.data.list;
		res.locals.searchResults = [
			...res.locals.searchResults,
			...tracks.map(t => ({
				title: t.title,
				service: 'Dailymotion',
				link: t.link,
				description: t.description,
				thumbnail: t.thumbnail_60_url
			}))
		];
	 } catch (err) {
		console.log('err at __dailymotion', err);
	 } finally {
		 next();
	 }
}

/**
 * Middleware that handles all the different services in parallel
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function parallelSearch(req, res, next) {
	const middlewares = [__youtube, __dailymotion];
	each(middlewares, (mw, cb) => {
		mw(req, res, cb);
	}, next);
}

module.exports = {
	parallelSearch,
	__youtube,
	__soundcloud,
	__deezer,
	__dailymotion
};
