const articleRouter = require('./articles');

function route(app) {    
    app.get('/',(req,res)=>{
        res.render('home');
    });

    app.use("/articles", articleRouter);
}

module.exports = route;
