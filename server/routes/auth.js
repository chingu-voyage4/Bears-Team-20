
module.exports = function(router,passport){

    router.get('/', (req, res) => {

        res.render('../views/index.ejs')
        
    });

    router.get('logout', (req, res) => {
        res.send('logging out');
    });

    
    router.get('/google', (req, res) => {
         res.send('loggin in with google');
    });

    router.get('/fail',(req,res) =>{
            res.send("fail login");
    });

    router.post('/signup', passport.authenticate('local', {
        successRedirect : '/succ', // redirect to the secure profile section
        failureRedirect : '/fail', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    router.get('/succ',(req,res)=> {
            res.send('Success login!!!');
    });


}


