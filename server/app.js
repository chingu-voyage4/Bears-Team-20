const express = require('express');
const dotenv = require('dotenv');
const webtoken = require('jsonwebtoken');
const monoose = require('mongoose');
const passport = require('passport');
const google = require('passport-google');

const app = express();

app.get('/',function(req,res){
	res.send("Port 3000");
});


app.listen(3000,()=>{
  console.log("Port listening");
});



