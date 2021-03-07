const { Router } = require("express");
const express = require("express");
const Manage_Blog = require('../models/manage_blogs');   // const Article = require("../models/article.js");
const Blog = require('../models/blogs');   // const Article = require("../models/article.js");
const router = express.Router();

router.get("/", async (req, res) => {
   const blogs = await Manage_Blog.find().sort({ createdAt: "desc" });
   try {
    res.render("blogs/", {  blogs:blogs });
   }
   catch (e){
     console.log(e);
     res.send(e);
   };
    
    // res.send('Sucessful!');
});

router.get("/:slug", async (req, res) => {
  const blog = await Manage_Blog.findOne({ slug: req.params.slug });
  if (blog == null) res.redirect("/");
  res.render("blogs/show", { blog: blog });
});

module.exports = router;
