const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
	link: {type: String, required: true},
	title: {type: String, required: true, default: 'untitled'},
	artist: {type: String, required: true, default: 'unknown'},
	service: {type: String, required: true},
	description: {type: String},
	thumbnail: {type: String}
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
