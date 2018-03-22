
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

    router.get('/succ',(req,res)=> {
        res.send('Success login!!!');
    });

    router.post('/signup', passport.authenticate('local', {
        successRedirect : '/succ', // si es exitosa 
        failureRedirect : '/fail', // si no lo es
        failureFlash : true // allow flash messages
    }));
    
    router.post('/test',(req,res)=>{
        console.log(req.body);
    });
}


