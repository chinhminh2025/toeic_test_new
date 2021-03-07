const { Router } = require("express");
const express = require("express");
const Manage_Blog = require('../models/manage_blogs');   // const Article = require("../models/article.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const manage_blogs = await Manage_Blog.find().sort({ createdAt: "desc" });
  res.render("manage_blogs/index", { manage_blogs: manage_blogs });
});

router.get("/new", (req, res) => {
  res.render("manage_blogs/new", { manage_blog: new Manage_Blog() });  // res.render("manage_blogs/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const manage_blog = await Manage_Blog.findById(req.params.id);// const article = await Article.findById(req.params.id);
  res.render("manage_blogs/edit", {  manage_blog:  manage_blog });
});

router.get("/:slug", async (req, res) => {
  const manage_blog = await Manage_Blog.findOne({ slug: req.params.slug });
  if (manage_blog == null) res.redirect("/");
  res.render("manage_blogs/show", { manage_blog: manage_blog });
});

router.post(
  "/",
  async (req, res, next) => {
    req.manage_blog = new Manage_Blog();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.manage_blog = await Manage_Blog.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Manage_Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let manage_blog = req.manage_blog;
    (manage_blog.title = req.body.title),
      (manage_blog.description = req.body.description),
      (manage_blog.markdown = req.body.markdown);
    try {
      manage_blog = await manage_blog.save();
      res.redirect(`/manage_blogs/${manage_blog.slug}`);
    } catch (e) {
      res.render(`manage_blogs/${path}`, { manage_blog: manage_blog });
    }
  };
}
module.exports = router;
