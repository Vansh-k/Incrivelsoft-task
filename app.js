const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://Admin-vansh:V@nshk@p00r@cluster0.jb0li.mongodb.net/studentDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = {
    name : String,
    email : String
}

const User = mongoose.model("User", userSchema);

app.get("/", function(req,res){
    res.render("index");
})

app.post("/",function(req,res){
    
  const user = new User({
    name : req.body.name,
    email : req.body.email
  });

  user.save(); 
  console.log("user details saved");
  res.redirect("/user");
});

app.get("/user/",function(req,res){

    User.find({},function(err,foundObject){
        if (err){
            console.log(err);
        }else{
            res.render("user",{data : foundObject});
        }
    })

})

let port = process.env.PORT;
if (port == null||port == ""){
  port=3000;
};

app.listen(port, function() {
  console.log("Server has started sucessfully");
});
