// start with 6 items: glass/bottles, plastic/bottles, cardboard, paper, metal/cans

// var items = [glass, plastic, cardboard, paper, metal];
// var amount = [0, 0, 0, 0, 0];
// var prices = [0, 0, 0, 0, 0];

// var user = {items: items, amount: amount, prices: prices};

var express = require('express');
var app = exress();

function addUser() {
	var name = document.getElementById("name").value;
	var pw = document.getElementById("newPassword").value;
	var pwCheck = document.getElementById("passwordCheck").value;

	// document.write(name);

	var text = localStorage.getItem(name);
	var obj = JSON.parse(text);

	if(obj != null) {
		// document.write(false);
		document.getElementById("exists").innerHTML = "Username " + obj.username + 
		" already exists! Please choose another username.";
	} else {
		// if(pw === pwCheck) {
			var userObj = { "username":name, 
								"password":pw };
			var userJSON = JSON.stringify(userObj);
			localStorage.setItem(name, userJSON);

			document.getElementById("exists").innerHTML = "Successfully created account!";
		// } else {
		// 	document.getElementById("exists").innerHTML = "Passwords do not match. Please try again";
		// }
		// document.write(true);
	}
}

function login() {
	var name = document.getElementById("username").value;
	var pw = document.getElementById("password").value;

	var text = localStorage.getItem(name);
	var obj = JSON.parse(text);

	// document.getElementById("exists").innerHTML = obj.password;

	// if(obj.password == pw) {
	// 	document.getElementById("exists").innerHTML = "Login successful!";
	// }
}

