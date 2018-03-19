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
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(morgan('combined'));

mongoose.connect(process.env.DB_PROD_URL)
	.then(() => {
    console.log('Connected DB successfully ');
	})
	.catch(err => {
  console.log(err);
	});


require('./middleware/passport')(passport);

app.use('/auth', authRoutes);
app.use('/api/search', searchRoutes);

app.use(session({secret: "musicalhub"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser());

require('./routes/auth')(app,passport);



//Passport

app.listen(port, () => {
  console.log('Listening port ' + port);
});

