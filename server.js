//https://git.heroku.com/agile-scrubland-90205.git!

const express = require("express");
const path = require("path");
const app = express();
const service = require("./blog-service.js");


app.use(express.static(__dirname +"/public"))


app.get("/", (req,res)=> {
  res.redirect("/about")
})

app.get("/about", (req, res) => {
  res.sendFile(__dirname+"/views/about.html") //CHECK 
})

app.get("/blog",(req,res)=>{
  service.getPublishedPosts().them(publishedPosts =>{
    res.json({publishedPosts})
  }).catch(err =>{
    res.json({ message: err })
  })
})//




app.get("/posts", (req, res) => {
  service.getAllPosts().then(posts => {
      res.json({ posts })
  }).catch(err => {
      res.json({ message: err })
  })
})

app.get("/categories", (req, res) => {
  service.getCategories().then(categories => {
      res.json({ categories })
  }).catch(err => {
      res.json({ message: err })
  })
})

// ERROR 404-500
app.use((req, res) => {
  res.status(404).send("NOT A REAL PLACE");
});


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("ERROR! :|")
});




const HTTP_PORT = process.env.PORT || 8080;
     service.initialize().then(()=>{
     app.listen(HTTP_PORT,()=>{
       console.log('Express http server listening on', HTTP_PORT)
     });

}).catch(err=> {
  console.log(err)
})
