var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

var name;
/******************************
 * Home GET and POST requests *
 ******************************/
app.get('/', function(req, res) {
    console.log("Got a Get request for home.");
    //do this for every time the user needs to move to a page
    res.sendFile(__dirname + "/home.html");
});

app.post('/', function(req, res) {
    console.log("Got a POST request for home.");
    res.sendFile(__dirname + "/home.html");
});

app.get('/home', function(req, res) {
    console.log("Got a Get request for home.");
    res.sendFile(__dirname + "/home.html");
});

app.post('/home', function(req, res) {
    console.log("Got a POST request for home.");
    res.sendFile(__dirname + "/home.html");
});

/*******************************
 * Login GET and POST requests *
 *******************************/
app.get('/login', function(req, res) {
    console.log("Got a GET request for login.");
    res.sendFile(__dirname + "/login.html");
});

/*
 * Creates a POST request for loging in. Gets the user's name and pw
 */
app.post('/login', function(req, res) {
    console.log("Got a POST request from " + req.body.username + ".");

    /* gets username from the body input box by name="username" */
    name = req.body.username;
    var pw = req.body.password;

    console.log("pw "+pw);

    var text = localStorage.getItem(name);
    //if there was no json to parse, then username was not found
    if(!JSON.parse(text)){
        res.sendFile(__dirname + "/login.html");

        console.log("User not found. Please try again. If you do not have an account, please create one");

        req.body.exists
        = "User not found. Please try again. If you do not have an account, please create one";
    } else {
        var obj = JSON.parse(text);
        var pass = obj.password;

        console.log("pass " + pass);

        if(pw == pass) {
            res.sendFile(__dirname + "/home.html");

            // res.send({ exists: "Login successful!"});
            // res.render(__dirname + "/home.html",  { exists: "Login successful!" }, function(err, html) {
            //      res.send(html);
            // });

            console.log("Login successful");
            //need to get text to actually display when login/registering
            req.body.exists = "Login successful!";
            console.log("Exists: " + req.body.exists);
        } else {
            res.sendFile(__dirname + "/login.html");

            console.log("Password is invalid. Please try again.");
            req.body.exists = "Password is invalid. Please try again.";
        }
    }
});

/**********************************
 * Register GET and POST requests *
 **********************************/

app.get('/register', function(req, res) {
    console.log("Got a GET request for register.");
    res.sendFile(__dirname + "/createAccount.html");
});

app.post('/register', function(req, res){
    console.log("Got a POST request for register.");

    //gets username from the input box by name="name", pw by name="newPassword"
    name = req.body.name;
    var pw = req.body.newPassword;
    var pwCheck = req.body.passwordCheck;

    console.log("name = " + name);

    var text = localStorage.getItem(name);
    var obj = JSON.parse(text);
    if(name.length === 0 || name.trim()) {
        console.log("Username is invalid! Please choose another username.");
    } else {
        if(obj != null) {
            console.log("Username " + obj.username + " already exists! Please choose another username.");
            // document.getElementById("exists").innerHTML = "Username " + obj.username + 
            // " already exists! Please choose another username.";
        } else {
            //passwords should not include \", and should not be blank or consist of just whitespace
            if(pw === pwCheck && !pw.includes("\"") && pw.length !== 0 && !pw.trim()) {
                var userObj = { "username":name, "password":pw };
                console.log("userObj = " + userObj);
                var userJSON = JSON.stringify(userObj);
                localStorage.setItem(name, userJSON);

                res.sendFile(__dirname + "/home.html");
                console.log("Successfully created account!");
                // document.getElementById("exists").innerHTML = "Successfully created account!";
            } else {
                res.sendFile(__dirname + "/createAccount.html");
                console.log("Password is invalid, or passwords don't match. Please try again");
                // document.getElementById("exists").innerHTML = "Passwords do not match or is invalid. Please try again";
            }
        }
    }
});

/*******************************
 * Etc GET and POST requests *
 *******************************/

app.get('/leaderboard', function(req, res) {
    console.log("Got a GET request for leaderboard.");
    res.sendFile(__dirname + "/leaderboard.html");
});

app.get('/about', function(req, res) {
    console.log("Got a GET request for about.");
    res.sendFile(__dirname + "/about.html");
});

/****************
 * Server stuff *
 ****************/

var server = app.listen(1337, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("listening at http://%s:%s", host, port)
});
