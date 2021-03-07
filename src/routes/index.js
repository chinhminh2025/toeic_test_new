const  manage_blogsRouter = require('./manage_blogs');
const  blogsRouter = require('./blogs');

function route(app) {    
    app.get('/',(req,res)=>{
        res.render('home');
    });

    app.use("/manage_blogs", manage_blogsRouter);
    app.use("/blogs", blogsRouter);
}

module.exports = route;
