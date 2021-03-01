const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles.js");
const methodOverride = require('method-override') ;
const route = require('./routes');
const path = require ('path');
const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


route(app);

app.listen(5000, ()=> { console.log(`Server is running on http://localhost:5000`)});
