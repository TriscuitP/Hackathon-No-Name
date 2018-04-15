var express = require('express');
var app = express();

// var LocalStorage = require('node-localstorage').LocalStorage;
// localStorage = new LocalStorage('./scratch');

/******************************
 * Home GET and POST requests *
 ******************************/
app.get('/', function(request, response) {
    console.log("Got a Get request for home.");
    response.sendFile(__dirname + "/home.html");
    // response.send('Hello GET');
})

app.post('/', function(request, response) {
    console.log("Got a POST request for home.");
    response.sendFile(__dirname + "/home.html");
})

app.get('/home', function(request, response) {
    console.log("Got a Get request for home.");
    response.sendFile(__dirname + "/home.html");
    // response.send('Hello GET');
})

app.post('/home', function(request, response) {
    console.log("Got a POST request for home.");
    response.sendFile(__dirname + "/home.html");
})

/*******************************
 * Login GET and POST requests *
 *******************************/
app.get('/login', function(request, response) {
    console.log("Got a Get request for login.");
    response.sendFile(__dirname + "/login.html");
    // response.send('./login.html');
})

app.get('/register', function(request, response) {
    console.log("Got a Get request for register.");
    response.sendFile(__dirname + "/createAccount.html");
})

app.get('/leaderboard', function(request, response) {
    console.log("Got a Get request for leaderboard.");
    response.sendFile(__dirname + "/leaderboard.html");
    // response.send('./login.html');
})

app.get('/about', function(request, response) {
    console.log("Got a Get request for about.");
    response.sendFile(__dirname + "/about.html");
    // response.send('./login.html');
})

/****************
 * Server stuff *
 ****************/

var server = app.listen(1337, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("listening at http://%s:%s", host, port)
})
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
