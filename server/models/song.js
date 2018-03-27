const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
	link: {type: String, required: true},
	title: {type: String, required: true},
	artist: {type: String, required: true},
	service: {type: String, required: true},
	descripcion: {type: String},
	thumbnail: {type: String}

});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
