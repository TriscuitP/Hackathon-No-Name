// start with 6 items: glass/bottles, plastic/bottles, cardboard, paper, metal/cans

// var items = [glass, plastic, cardboard, paper, metal];
// var amount = [0, 0, 0, 0, 0];
// var prices = [0, 0, 0, 0, 0];

// var user = {items: items, amount: amount, prices: prices};

// var express = require('express');
// var app = exress();

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
		//passwords should not include \"
		if(pw === pwCheck && !pw.includes("\"")) {
			var userObj = { "username":name, "password":pw };
			var userJSON = JSON.stringify(userObj);
			localStorage.setItem(name, userJSON);

			document.getElementById("exists").innerHTML = "Successfully created account!";
		} else {
			document.getElementById("exists").innerHTML = "Passwords do not match or is invalid. Please try again";
		}
	}
}

function login() {
	var name = document.getElementById("username").value;
	var pw = document.getElementById("password").value;

	var text = localStorage.getItem(name);
	//if there was no json to parse, then username was not found
	if(!JSON.parse(text)){
		document.getElementById("exists").innerHTML 
		= "User not found. Please try again. If you do not have an account, please create one";
	} else {
		var obj = JSON.parse(text);
		//gets pw with quotations, this will do a crude removal of \" as passwords will not contain \"
		var pass = obj.password.split("\"")[1];

		if(pw == pass) {
			document.getElementById("exists").innerHTML = "Login successful!";
		} else {
			document.getElementById("exists").innerHTML = "Password is invalid. Please try again.";
		}
	}
}

