const router = require('express').Router(); // eslint-disable-line new-cap
const User = require('../models/user');
const Playlist = require('../models/playlist');

/**
* GET /api/playlist/public -> Get all public playlists
* GET /api/playlist&id=? -> Get a playlist by the user or all of them if id not present
*
* POST /api/playlist -> Add or modify a playlist (owned by current user)
*	required body params: name, description, public
*
* DELETE /api/playlist -> Delete a playlist (owned by current user)
*	required query params: id
*
* POST /api/playlist/song -> Add song to playlist
*	required body params: link, service, playlistId
*
* DELETE /api/playlist/song -> Delete song from playlist
*	required body params: playlistId, songId
*/

router.get('/public', (req, res) => {
	User.getPublicPlaylists((err, publicPlaylists) => {
		if (err) {
			return res.sendStatus(400);
		}
		res.json(publicPlaylists);
	});
});

router.get('/', (req, res) => {
	const id = req.query.id;
	if (id) {
		Playlist.getUsersPlaylist(req.user._id, id, (err, playlist) => {
			if (err) {
				return res.sendStatus(400);
			}
			if (!playlist) {
				return res.status(400).send('Playlist not found');
			}
			res.json(playlist);
		});
	} else {
		Playlist.getUsersPlaylists(req.user._id, (err, playlists) => {
			if (err) {
				return res.sendStatus(400);
			}
			res.json(playlists);
		});
	}
});

router.post('/', (req, res) => {
	const data = {
		name: req.body.name,
		description: req.body.description,
		public: req.body.public
	};
	User.createNewPlaylist(req.user.username, data, (err, newPlaylist) => {
		if (err) {
			return res.status(400).send(err.message);
		}
		res.json(newPlaylist);
	});
});

router.post('/all', (req, res) => {
	const {playlists} = req.body;
	Playlist.setUserPlaylists(req.user._id, playlists, (err, newPlaylists) => {
		if (err) {
			return res.status(400).send(err.message);
		}
		res.json({
			playlists: newPlaylists
		});
	});
});

router.delete('/', (req, res) => {
	Playlist.deletePlaylist(req.user._id, req.query.id, err => {
		if (err) {
			return res.status(400).send(err.message);
		}
		res.sendStatus(200);
	});
});

router.post('/song', (req, res) => {
	const songData = {
		link: req.body.link,
		title: req.body.title,
		artist: req.body.artist,
		service: req.body.service,
		descripcion: req.body.description,
		thumbnail: req.body.thumbnail
	};
	Playlist.addSong(req.user._id, req.body.playlistId, songData, (err, playlist) => {
		if (err) {
			return res.status(400).send(err.message);
		}
		res.json(playlist);
	});
});

router.delete('/song', (req, res) => {
	Playlist.deleteSong(req.user._id, req.body.playlistId, req.body.songId, err => {
		if (err) {
			return res.status(400).send(err.message);
		}
		res.sendStatus(200);
	});
});

module.exports = router;
