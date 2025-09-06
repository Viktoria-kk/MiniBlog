import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];
let idCounter = 1;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/create", (req, res) => {
  res.render("create.ejs");
});
app.get("/view", (req, res) => {
  res.render("view.ejs", { posts});
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/index", (req, res) => {
  res.render("index.ejs");
});
app.post("/submit", (req, res) => {
  const { title, description } = req.body;
  posts.push({ id: idCounter++, title, description });
  res.redirect("/view");
})
app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Feedback received:", name, email, message);
  res.send("Thank you for your feedback!");
});
app.post("/delete", (req, res) => {
  const id = parseInt(req.body.id);
  posts = posts.filter(post => post.id !== id);
  res.redirect("/view");
});
app.get("/edit", (req, res) => {
  const id = parseInt(req.query.id);
  const post = posts.find(p => p.id === id);
  res.render("edit.ejs", { post });
});
app.post("/update", (req, res) => {
  const { id, title, description } = req.body;
  const post = posts.find(p => p.id === parseInt(id));
  if (post) {
    post.title = title;
    post.description = description;
  }
  res.redirect("/view");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});