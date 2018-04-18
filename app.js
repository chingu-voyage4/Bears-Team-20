/* eslint-disable import/no-unassigned-import */
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

// Load models before router
require('./models/song');
require('./models/playlist');
require('./models/user');

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.ENV === 'prod' ? process.env.DB_PROD_URL : process.env.DB_LOCAL_URL;
const session = require('express-session');
const bodyParser = require('body-parser');
const {authenticate} = require('./middleware/auth');

mongoose.connect(dbUrl)
	.then(() => {
		console.log('Connected DB successfully', dbUrl);
	})
	.catch(err => {
	console.log(err);
	});

require('./middleware/passport')(passport);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); // Set up ejs for templating

app.use(session({
	secret: 'musicalhub',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app, passport);

app.use('/api/search', require('./routes/search'));

app.use('/api', authenticate);
app.use('/api/playlist', require('./routes/playlist'));

// Serve react app
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
	console.log('Listening port ' + port);
});

