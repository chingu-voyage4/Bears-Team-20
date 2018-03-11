require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const webtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const google = require('passport-google');
const mongodb = require('mongodb').MongoClient();
=======
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');

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
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
	res.send('Port 3000');
});

<<<<<<< HEAD


var mlabURL = "mongodb://vitof:bear20@ds245548.mlab.com:45548/musichub";


var User = mongoose.model("user", {
  username: String,
  password: String
})



mongoose.connect(mlabURL, () => {
  console.log("DB is connected");
})






/*
var localURL = "mongodb://localhost:127.0.0.1:27017/musichub";
var mlabURL = "mongodb://vitof:bear20@ds245548.mlab.com:45548/musichub";


mongodb.connect(mlabURL,function(err,db){
      if(!err){
          console.log("WE ARE CONNECTED");
      }else{
        console.log("Something happend");
      }

});
*/
=======
app.listen(port, () => {
  console.log('Listening port ' + port);
});
>>>>>>> 30db9b829d45d2de7e6076c557bf6bc63b6a3f2b
