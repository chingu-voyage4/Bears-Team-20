const mongoose = require('mongoose');
const SongSchema = require('./song').schema;

const Schema = mongoose.Schema;

const playlist = new Schema({
	name: {type: String, required: true},
	description: {type: String},
	public: {type: Boolean, required: true, default: false},
	creator: {type: String, required: true},
	songs: [SongSchema]
});

const Playlist = mongoose.model('Playlist', playlist);

module.exports = Playlist;
