const router = require('express').Router(); // eslint-disable-line new-cap
const User = require('../models/user');

/**
* GET /api/playlist/public -> Get all public playlists
* GET /api/playlist/:id? -> Get a playlist by the user or all of them if id not present
*
* POST /api/playlist -> Add or modify a playlist (owned by current user)
* DELETE /api/playlist -> Delete a playlist (owned by current user)
*
* POST /api/playlist/song -> Add song to playlist
* DELETE /api/playlist/song -> Delete song from playlist
*/

router.get('/public', (req, res) => {
	User.getPublicPlaylists((err, publicPlaylists) => {
		if (err) {
			return res.sendStatus(400);
		}
		res.json(publicPlaylists);
	});
});

router.get('/:id?', (req, res) => {
	const id = req.params.id;
	if (id) {
		User.getUsersPlaylist(req.user.username, id, (err, playlist) => {
			if (err) {
				return res.sendStatus(400);
			}
			if (!playlist) {
				return res.status(400).send('Playlist not found');
			}
			res.json(playlist);
		});
	} else {
		User.getUsersPlaylists(req.user.username, (err, playlists) => {
			if (err) {
				return res.sendStatus(400);
			}
			res.json(playlists);
		});
	}
});

router.post('/', (req, res) => {
	res.sendStatus(200);
});

router.delete('/', (req, res) => {
	res.sendStatus(200);
});

router.post('/song', (req, res) => {
	res.sendStatus(200);
});
router.delete('/song', (req, res) => {
	res.sendStatus(200);
});

module.exports = router;
