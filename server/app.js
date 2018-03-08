const express = require('express');
const dotenv = require('dotenv');
const webtoken = require('jsonwebtoken');
const monoose = require('mongoose');
const passport = require('passport');
const google = require('passport-google');
const mongodb = require('mongodb').MongoClient();

const app = express();
const authRoutes = require('./auth-router');
app.use('/auth',authRoutes);




app.get('/',function(req,res){
	res.send("Port 3000");
});

app.listen(3000,()=>{
  console.log("Port listening");
});

var localURL = "mongodb://localhost:127.0.0.1:27017/musichub";
var mlabURL = "mongodb://vitof:bear20@ds245548.mlab.com:45548/musichub";


mongodb.connect(mlabURL,function(err,db){
      if(!err){
          console.log("WE ARE CONNECTED");
      }else{
        console.log("Something happend");
      }

});

