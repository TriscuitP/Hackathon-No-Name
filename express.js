var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/******************************
 * Home GET and POST requests *
 ******************************/
app.get('/', function(req, res) {
    console.log("Got a Get request for home.");
    res.sendFile(__dirname + "/home.html");
    // response.send('Hello GET');
});

app.post('/', function(req, res) {
    console.log("Got a POST request for home.");
    res.sendFile(__dirname + "/home.html");
});

app.get('/home', function(req, res) {
    console.log("Got a Get request for home.");
    res.sendFile(__dirname + "/home.html");
    // response.send('Hello GET');
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

app.post('/login', function(req, res) {
    // console.log("Got a POST request for login.");
    console.log("Got a POST request from " + req.body.username + ".");
    console.log("Got a POST request from " + req.body.password + ".");

    var name = req.body.username;
    var pw = req.body.password;

    var text = localStorage.getItem(name);
    //if there was no json to parse, then username was not found
    if(!JSON.parse(text)){
        res.sendFile(__dirname + "/login.html");
        console.log("User not found. Please try again. If you do not have an account, please create one");
        req.body.exists
        = "User not found. Please try again. If you do not have an account, please create one";
    } else {
        var obj = JSON.parse(text);
        //gets pw with quotations, this will do a crude removal of \" as passwords will not contain \"
        var pass = obj.password.split("\"")[1];

        if(pw == pass) {
            res.sendFile(__dirname + "/home.html");
            console.log("Login successful");
            req.body.exists = "Login successful!";
        } else {
            res.sendFile(__dirname + "/login.html");
            console.log("Password is invalid. Please try again.");
            req.body.exists = "Password is invalid. Please try again.";
        }
    }
});

app.get('/register', function(req, res) {
    console.log("Got a GET request for register.");
    res.sendFile(__dirname + "/createAccount.html");
});

app.post('/register', function(req, res){
    console.log("Got a POST request for register.");

    var name = req.body.username;
    var pw = req.body.newPassword;
    var pwCheck = req.body.passwordCheck;

    var text = localStorage.getItem(name);
    var obj = JSON.parse(text);

    if(obj != null) {
        console.log("Username " + obj.username + " already exists! Please choose another username.");
        // document.getElementById("exists").innerHTML = "Username " + obj.username + 
        // " already exists! Please choose another username.";
    } else {
        //passwords should not include \"
        if(pw === pwCheck && !pw.includes("\"")) {
            var userObj = { "username":name, "password":pw };
            var userJSON = JSON.stringify(userObj);
            localStorage.setItem(name, userJSON);

            res.sendFile(__dirname + "/home.html");
            console.log("Successfully created account!");
            // document.getElementById("exists").innerHTML = "Successfully created account!";
        } else {
            res.sendFile(__dirname + "/login.html");
            console.log("Passwords do not match or is invalid. Please try again");
            // document.getElementById("exists").innerHTML = "Passwords do not match or is invalid. Please try again";
        }
    }
});

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


    // var http = require('http');
    // var LocalStorage = require('node-localstorage').LocalStorage,
    // localStorage = new LocalStorage('');

    // var fs = require('fs');

    // var server = http.createServer();

    //     server.listen(1337, function(){
    //        console.log('服务器正在端口号：1337上运行......');
    //    })


    //     server.on('request',function(request,response){

    //         var url = request.url;
    //         if(url ==='/'){

    //         response.writeHead(200,{'Content-Type':'text/html'})

    //         fs.readFile('./home.html','utf-8',function(err,data){
    //             if(err){
    //                 throw err ;
    //             }
    //             response.end(data);
    //         });

    //     }else if(url === '/login'){
            
    //         response.writeHead(200,{'Content-Type':'text/html'});

    //         fs.readFile('./login.html','utf-8',function(err,data){
 




    //             if(err){
    //                 throw err ;
    //             }
    //             response.end(data);
    //         });
    //     }else if(url === '/register'){
    //         response.writeHead(200,{'Content-Type':'text/html'});

    //         fs.readFile('./createAccount.html','utf-8',function(err,data){
    //             if(err){
    //                 throw err ;
    //             }
    //             response.end(data);
    //         });
    //     }else if(url === '/leaderboard'){
    //         response.writeHead(200,{'Content-Type':'text/html'});

    //         fs.readFile('./leaderboard.html','utf-8',function(err,data){
    //             if(err){
    //                 throw err ;
    //             }
    //             response.end(data);
    //         });
    //     }else if(url === '/about'){
    //         response.writeHead(200,{'Content-Type':'text/html'});

    //         fs.readFile('./about.html','utf-8',function(err,data){
    //             if(err){
    //                 throw err ;
    //             }
    //             response.end(data);
    //         });
    //     }else{
    //         response.writeHead(200,{'Content-Type':'text/html'});

    //         fs.readFile('./home.html','utf-8',function(err,data){
    //             if(err){
    //                 throw err ;
    //             }
    //             response.end(data);
    //         });
    //     }
        
    // });
