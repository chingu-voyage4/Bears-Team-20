const mongoose = require('mongoose');
const Song = require('./song');

const Schema = mongoose.Schema;

const playlistSchame = new Schema({
	name: {type: String, required: true},
	description: {type: String},
	public: {type: Boolean, required: true, default: false},
	creator: {type: String, required: true},
	songs: [Song]
});

const Playlist = mongoose.model('Playlist', playlistSchame);

module.exports = Playlist;
