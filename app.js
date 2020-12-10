const express = require("express") // here  were are taking express module from node packages using require
const app = express();
let multer =  require("multer");


var PORT = process.env.PORT || 3000;

/* This is for how we want to store the image name */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
})
   //
var upload = multer({ storage: storage })

const getExt  = (MimeType) => {
    switch(MimeType) {
        case "image/png":
            return ".png"
        case "image/jpeg":
            return ".jpeg"    
    }
}
  


const Post = require("./api/models/posts.js");
const postsData = new Post();


app.use(express.json());

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    next();
})
 
app.use('/uploads' , express.static('uploads'));

app.use("/", (req, res)=>{
    res.status(200).send("Hello World");
})


app.get("/api/posts/", (req , res) => {
    // For get request we are sending response
    res.status(200).send(postsData.get())
})


app.get("/api/posts/:post_id" , (req , res) => {
   const postId = req.params.post_id;
   const foundPost = postsData.getIndividualBlog(postId);
   if (foundPost){
       res.status(200).send(foundPost);
   } else {
       res.status(404).send("Not Found");
   }
})

app.post("/api/posts/" , upload.single("post_image"), (req,res) => {
     
    // console.log(req.file);
    // var path = req.file.path
    // console.log(path)
    const newPost = {
        "id" : `${Date.now()}`,
        "title" : req.body.title,
        "content" : req.body.content,
        "post_image" : req.file.path,
        "added_date" : `${Date.now()}`
    }
    postsData.add(newPost);
    res.status(201).send("ok");
})

app.listen(PORT ,() => {
    console.log(`Listening on PORT ${PORT}`);
});

/*
This app starts a server and listens on port 3000 for connections. The app responds with “Hello World!” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.

The example above is actually a working server: Go ahead and click on the URL shown. You’ll get a response, with real-time logs on the page, and any changes you make will be reflected in real time. This is powered by RunKit, which provides an interactive JavaScript playground connected to a complete Node environment that runs in your web browser. Below are instructions for running the same app on your local machine.
*/