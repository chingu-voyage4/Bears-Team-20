require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = process.env.ENV === 'prod' ? process.env.DB_PROD_URL : process.env.DB_LOCAL_URL;

app.use(morgan('combined'));

mongoose.connect(dbUrl)
	.then(() => {
    console.log('Connected DB successfully ');
	})
	.catch(err => {
  console.log(err);
	});

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	res.send('Port 3000');
});

app.listen(port, () => {
  console.log('Listening port ' + port);
});
