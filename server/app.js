require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = process.env.ENV === 'prod' ? process.env.DB_PROD_URL : process.env.DB_LOCAL_URL;

app.use(morgan('combined'));

mongoose.connect(process.env.DB_PROD_URL)
	.then(() => {
    console.log('Connected DB successfully ');
	})
	.catch(err => {
  console.log(err);
	});

app.use('/auth', authRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
	res.send('Port 3000');
});


//Passport
app.post('/login',
   passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

app.listen(port, () => {
  console.log('Listening port ' + port);
});
