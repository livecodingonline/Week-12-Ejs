const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();


var db = {
    zeyd: {
      "email": "zydustglu@gmail.com",
      "password": "1234",
      "items" : []
    },
    angela: {
      "email": "angela@gmail.com",
      "password": "5678",
      "items" : []
    }
  };

var isTrue = true;
var userName = ''
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.redirect("/login");
});

app.get("/login", function(req, res) {
  const num = date.getNum();
  const month = date.getMonth();
  const day = date.getDay();
  const name = "";
  
  res.render("login", { listTitle: num + " " + month + " " + day, isTrue });
});

app.post("/login", function(req, res) {
  var name = req.body.inputName;
  var email = req.body.inputEmail;
  var pass = req.body.inputPassword;    

  const dbNames = Object.keys(db)
    var result = ''
      for (let i = 0; i < dbNames.length; i++) {
        var dbName = dbNames[i]
        
        if (
            dbName === name &&
            db[dbName]["email"] === email &&
            db[dbName]["password"] === pass
            
          ) {
              userName = name;
              result = '1'
              res.redirect("/todo");
          } 
            
        }
        if(result === ''){
            isTrue = false;
            res.redirect("/login");
        }        

  });

app.get("/todo", function(req, res) {    

  res.render("todo", {      
    newListItems: db[userName]["items"],
    name: userName,
    imgSrc: `/image/${userName}.png`
  });
});

app.post("/todo", function(req, res) {
  const item = req.body.newItem;
 
  db[userName]["items"].push(item);
  res.redirect("/todo");
});


app.listen(5000, function() {
  console.log("Server started on port 5000");
});
