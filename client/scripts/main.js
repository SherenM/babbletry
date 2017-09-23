"use strict";
//localStorage.clear();
/*
if (window.performance) {
	console.info("window.performance work's fine on this browser");
}
if (performance.navigation.type == 1) {
	if (localStorage.getItem("babble") != null && localStorage.getItem("babble") != "{}") {
		var b = localStorage.getItem("babble");
		var updatedLocal = {
			currentMessage: JSON.parse(localStorage.babble).currentMessage,
			userInfo: {
				name: JSON.parse(b).userInfo.name,
				email: JSON.parse(b).userInfo.email
			},
			refr: 1,
			cnt: JSON.parse(b).cnt
		}
		localStorage.setItem("babble", JSON.stringify(updatedLocal));
	}
} 
document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
	var keyCode = e.keyCode;
	if (keyCode == 116) {
		if (localStorage.getItem("babble") != null || localStorage.getItem("babble") != "{}") {
			var b = localStorage.getItem("babble");
			var updatedLocal = {
				currentMessage: JSON.parse(localStorage.babble).currentMessage,
				userInfo: {
					name: JSON.parse(b).userInfo.name,
					email: JSON.parse(b).userInfo.email
				},
				refr: 1,
				cnt: JSON.parse(b).cnt
			}
			localStorage.setItem("babble", JSON.stringify(updatedLocal));
		}
	}
}*/
/*var isunl
var cls = 0;
if (performance.navigation.type == 1) {
	cls = 1;
} else {
	cls = 0;
	var b = localStorage.babble;
	if (b != null && b != "{}") {

		var updatedLocal = {
			currentMessage: JSON.parse(localStorage.babble).currentMessage,
			userInfo: {
				name: JSON.parse(b).userInfo.name,
				email: JSON.parse(b).userInfo.email
			},
			cnt: JSON.parse(b).cnt + 1
		}
		localStorage.setItem("babble", JSON.stringify(updatedLocal));
	}
}*/

/*console.info("This page is reloaded");
var b = localStorage.getItem("babble");
if (b === null || b === "{}") {
	console.log("is null 111");
	localStorage.setItem("babble", "{}");
} else {
	console.log("P");

	document.getElementsByClassName('email-input')[0].value = '';
	document.getElementsByClassName('modal')[0].style.display = 'none';
	document.getElementsByClassName('username-input')[0].value = '';
	document.getElementsByClassName('modal')[0].style.visibility = 'hidden';
	document.getElementsByClassName('modal')[0].setAttribute("aria-hidden", "true");
	messagesPolling();
	statsPolling();
}
} else {
var b = JSON.parse(localStorage.babble);
if (b.cnt === 1) {
	navigator.sendBeacon("/log", { email: b.userInfo.email });
	localStorage.removeItem("babble");
	localStorage.clear();
	//navigator.sendBeacon("/log", { email: b.userInfo.email });
} else {
	var updatedLocal = {
		currentMessage: JSON.parse(localStorage.babble).currentMessage,
		userInfo: {
			name: b.userInfo.name,
			email: b.userInfo.email
		},
		cnt: b.cnt - 1
	}
	localStorage.setItem("babble", JSON.stringify(updatedLocal));
}
}
var cls;
if (performance.navigation.type == 1) {
	cls = 1;
} else {
	cls = 0;
}
*/
window.addEventListener('load', function () {
	//localStorage.clear();
	var b = localStorage.getItem("babble");

	//localStorage.clear();
	if (b === null || b === "{}" || b === "null") {
		console.log("is null");
		localStorage.setItem("babble", "{}");
		//cls = 0;

	} else {
		statsPolling();
		console.log(b);
		console.log("exists");
		var r;
		//if (cls === 1) {
		//	r = JSON.parse(b).cnt;
		//} else {
		r = JSON.parse(b).cnt + 1;
		//}
		//console.log("r=" + r);
		console.log("name: " + JSON.parse(b).userInfo.name);
		//JSON.parse(localStorage.babble).cnt = r;
		console.log("before : " + JSON.parse(localStorage.babble).cnt);
		var updatedLocal = {
			currentMessage: JSON.parse(localStorage.babble).currentMessage,
			userInfo: {
				name: JSON.parse(b).userInfo.name,
				email: JSON.parse(b).userInfo.email
			},
			cnt: r
		}
		localStorage.setItem("babble", JSON.stringify(updatedLocal));
		console.log("after : " + JSON.parse(localStorage.babble).cnt);
		var container = document.querySelector('.js-growable');
		var area = container.querySelector('textarea');
		var clone = container.querySelector('span');
		area.value = JSON.parse(localStorage.babble).currentMessage;
		clone.textContent = JSON.parse(localStorage.babble).currentMessage;
		//document.getElementsByTagName('textarea')[0].innerText=JSON.parse(localStorage.babble).currentMessage;
		console.log("textarea val: " + document.getElementsByTagName('textarea')[0].value);
		document.getElementsByClassName('email-input')[0].value = '';
		document.getElementsByClassName('modal')[0].style.display = 'none';
		document.getElementsByClassName('username-input')[0].value = '';
		document.getElementsByClassName('modal')[0].style.visibility = 'hidden';
		document.getElementsByClassName('modal')[0].setAttribute("aria-hidden", "true");
		messagesPolling();



	}
	//cls = 0;
	//messagesPolling();
	//statsPolling();
}, false);

//window.addEventListener('onbeforeunload ', logData, false);


window.addEventListener('unload', logData, false);

function logData() {
	var b = localStorage.babble;

	if (b != null && b != "null" && b != "{}") {
		if (JSON.parse(b).cnt === 1) {
			console.log("closed");
			console.log(JSON.parse(b).userInfo.email);
			navigator.sendBeacon("http://localhost:9000/log", JSON.stringify({ email: JSON.parse(b).userInfo.email, currentMessage: JSON.parse(b).currentMessage }));
			localStorage.removeItem("babble");
			localStorage.clear();
		} else {
			var updatedLocal = {
				currentMessage: JSON.parse(localStorage.babble).currentMessage,
				userInfo: {
					name: JSON.parse(b).userInfo.name,
					email: JSON.parse(b).userInfo.email
				},
				cnt: JSON.parse(b).cnt - 1
			}
			localStorage.setItem("babble", JSON.stringify(updatedLocal));
		}
	}

}

console.log("in client");

makeGrowable(document.querySelector('.js-growable'));
function makeGrowable(container) {
	var area = container.querySelector('textarea');
	var clone = container.querySelector('span');
	area.addEventListener('input', function (e) {
		clone.textContent = area.value;
	});
}


function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch (e) {
		return e instanceof DOMException && (
			// everything except Firefox
			e.code === 22 ||
			// Firefox
			e.code === 1014 ||
			// test name field too, because code might not be present
			// everything except Firefox
			e.name === 'QuotaExceededError' ||
			// Firefox
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage.length !== 0;
	}
}

//REGISTER FORM
var registerForm = document.getElementsByClassName('register-form');
registerForm[0].addEventListener('submit', function (e) {
	e.preventDefault();
	statsPolling();
	if (storageAvailable('localStorage')) {
		//We can use localStorage 
		var username = document.getElementsByClassName('username-input')[0].value;
		var userEmail = document.getElementsByClassName('email-input')[0].value;
		var userInfo = {
			name: username,
			email: userEmail
		};
		window.Babble.register(userInfo);
		messagesPolling();

	}
	else {
		console.log("LocalStorage is not supported or available");
		alert("LocalStorage is not supported or available");
	}
});

//anonymous-btn
document.getElementsByClassName('anonymous-btn')[0].addEventListener('click', function (e) {
	e.preventDefault();
	statsPolling();
	if (storageAvailable('localStorage')) {
		//We can use localStorage 
		var userInfo = {
			name: "",
			email: ""
		};
		window.Babble.register(userInfo);
		messagesPolling();

	}
	else {
		console.log("LocalStorage is not supported or available");
		alert("LocalStorage is not supported or available");
	}
});


//POST MESSAGE FORM
var messageForm = document.getElementsByClassName('message-form');
messageForm[0].addEventListener('submit', function (e) {
	e.preventDefault();
	var messageContent = document.getElementsByTagName('textarea')[0].value;
	if (messageContent.replace(/\s/g, "").length > 0) {
		var timeInMs = Date.now(); //returns the number of milliseconds between January 1, 1970
		var parseLocalStor = JSON.parse(localStorage.getItem("babble"));
		var message = {
			name: parseLocalStor.userInfo.name,
			email: parseLocalStor.userInfo.email,
			message: messageContent,
			timestamp: timeInMs
		};
		window.Babble.postMessage(message, function (res) {
			var d = document.querySelector('.js-growable');
			d.querySelector('textarea').value = '';
			d.style.height = "";
			d.querySelector('pre').style.height = "";
			d.querySelector('span').textContent = '';
			d.querySelector('textarea').style.height = "";
			d.querySelector('span').style.height = "";
			var updatedLocal = {
				currentMessage: "",
				userInfo: {
					name: JSON.parse(localStorage.babble).userInfo.name,
					email: JSON.parse(localStorage.babble).userInfo.email
				},
				cnt: JSON.parse(localStorage.babble).cnt
			}
			localStorage.setItem("babble", JSON.stringify(updatedLocal));
		});
	}
});



//defines the one and only global variable :)
window.Babble = {
	register: function (userInfo) {
		var brUser;
		if (userInfo.name === undefined || userInfo.email === undefined || userInfo.name === "" || userInfo.email === "") {
			brUser = {
				currentMessage: "",
				userInfo: {
					name: "",
					email: ""
				},
				cnt: 1
			};
		} else {
			brUser = {
				currentMessage: "",
				userInfo: {
					name: userInfo.name,
					email: userInfo.email
				},
				cnt: 1
			};
		}
		localStorage.setItem("babble", JSON.stringify(brUser));

		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === 4) { // request is done
				if (httpRequest.status === 200) { // successfully
					document.getElementsByClassName('email-input')[0].innerHTML = '';
					document.getElementsByClassName('modal')[0].style.display = 'none';
					document.getElementsByClassName('username-input')[0].innerHTML = '';
					document.getElementsByClassName('modal')[0].style.visibility = 'hidden';
					document.getElementsByClassName('modal')[0].setAttribute("aria-hidden", "true");
					console.log("response : " + httpRequest.responseText);
					var b = localStorage.babble,n="",e="",c="";
					
					if (b != null && b != "{}" && b != "null") {
						n=JSON.parse(b).userInfo.name;
						e=JSON.parse(b).userInfo.email;
						c=JSON.parse(b).cnt;
					}
					var temp = {
						currentMessage: JSON.parse(httpRequest.responseText).currentMessage,
						userInfo: {
							name: n,
							email: e
						},
						cnt: c
					};
					localStorage.setItem("babble", JSON.stringify(temp));
					var d = document.querySelector('.js-growable');
					d.querySelector('textarea').value = JSON.parse(httpRequest.responseText).currentMessage;
					d.querySelector('span').textContent = JSON.parse(httpRequest.responseText).currentMessage;

				}
			}
		};
		httpRequest.open('POST', "http://localhost:9000/register");
		httpRequest.send(JSON.stringify(brUser.userInfo));
	},
	postMessage: function (message, callback) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === 4) { // request is done
				if (httpRequest.status === 200) { // successfully
					callback(JSON.parse(httpRequest.responseText));
				}
			}
		};
		httpRequest.open('POST', "http://localhost:9000/messages");
		httpRequest.send(JSON.stringify(message));
	},
	getMessages: function (msgCounter, callback) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === 4) { // request is done

				if (httpRequest.status === 200) { // successfully
					callback(JSON.parse(httpRequest.responseText)); // we're calling our method
				}

			}
		};

		httpRequest.open('GET', "http://localhost:9000/messages?counter=" + msgCounter);
		httpRequest.send();

	},
	getStats: function (callback) {

		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === 4) { // request is done
				if (httpRequest.status === 200) { // successfully
					callback(JSON.parse(httpRequest.responseText)); // we're calling our method
				}
			}
		};
		httpRequest.open('GET', "http://localhost:9000/stats");
		httpRequest.send();
	},
	deleteMessage: function (id, callback) {

		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === 4) { // request is done
				if (httpRequest.status === 200) { // successfully
					callback(true); // we're calling our method
				}
			}
		};
		httpRequest.open('DELETE', "http://localhost:9000/messages/" + id);
		httpRequest.send(null);
	},
	msgCounter: 0
};

function messagesPolling() {
	window.Babble.getMessages(window.Babble.msgCounter, function (res) {
		if (res === "" || res === "[]" || res === undefined) {
			messagesPolling();
		} else {
			//var newMessages = JSON.parse(res), i;
			window.Babble.msgCounter = Math.max.apply(Math, res.map(function (o) { return o.id; })); //will return the newst id number 
			//do the callback things 
			var chatList = document.getElementsByTagName('ol')[0];
			var listItem, contDiv, imageDiv, userImage, msgDiv, ct, tm, btn, spn, spanDiv;
			for (i = 0; i < res.length; i++) {
				listItem = document.createElement('li');
				listItem.setAttribute("id", "msg" + res[i].id);

				contDiv = document.createElement('div');
				contDiv.setAttribute("class", "container-div");

				imageDiv = document.createElement('div');
				imageDiv.setAttribute("class", "user-image-div");
				userImage = document.createElement('img');
				userImage.setAttribute("alt", "");
				userImage.setAttribute("class", "user-image");
				userImage.setAttribute("src", res[i].gravatar);
				userImage.setAttribute("style", "background: white; border: solid 1px #d7d7d7;");
				imageDiv.appendChild(userImage);

				msgDiv = document.createElement('div');
				msgDiv.setAttribute("class", "message-on-chatboard");
				msgDiv.setAttribute("tabindex", "0");

				ct = document.createElement('cite');
				ct.setAttribute("class", "username");
				if (res[i].email === "" || res[i].email === undefined) {
					ct.innerHTML = "Anonymous";
				} else {
					ct.innerHTML = res[i].name;
				}

				tm = document.createElement('time');
				tm.setAttribute("class", "time");
				var date = new Date(res[i].timestamp);
				var hours = date.getHours();
				var minutes = "0" + date.getMinutes();
				tm.innerHTML = hours + ":" + minutes.substr(-2);

				btn = document.createElement('button');
				btn.setAttribute("class", "close");
				btn.setAttribute("aria-label", "delete message");
				btn.setAttribute("tabindex", 0);
				btn.setAttribute("onClick", 'removeMessage(' + 'msg' + res[i].id + ',' + res[i].id + ')');
				spn = document.createElement('span');
				spn.setAttribute("class", "message-content");
				spn.innerHTML = res[i].message;
				/*spanDiv=document.createElement('div');
				spanDiv.setAttribute('class', 'spanDiv');
				spanDiv.appendChild(spn);
				*/
				msgDiv.appendChild(ct);
				msgDiv.appendChild(tm);
				if (res[i].email != "" && res[i].email === JSON.parse(localStorage.getItem("babble")).userInfo.email) {
					//only the user who wrote the message can delete it 
					msgDiv.appendChild(btn);
				}
				//msgDiv.appendChild(spanDiv);
				msgDiv.appendChild(spn);
				contDiv.appendChild(imageDiv);
				contDiv.appendChild(msgDiv);
				//append list Item
				listItem.appendChild(contDiv);
				chatList.appendChild(listItem);

				var objDiv = document.getElementsByClassName('scroll')[0];
				objDiv.scrollTop = objDiv.scrollHeight;//- objDiv.clientHeight;
			}
			messagesPolling();
		}
	});

}

function statsPolling() {
	//console.log("in statsPolling client function");
	window.Babble.getStats(function (res) {
		//update the stats by classes
		//console.log("the request is sent , see server console..");
		if (res != "{}" && res != "") {
			//var parsedRes = JSON.parse(res);
			document.getElementsByClassName('dd-messages')[0].innerHTML = res.messages;
			document.getElementsByClassName('dd-users')[0].innerHTML = res.users;

		}
		statsPolling();
	});
}

function removeMessage(msgItem, id) {
	console.log(msgItem);
	console.log(id);
	window.Babble.deleteMessage(id, function (flag) {
		msgItem.parentNode.removeChild(msgItem);
	});
}

window.onload = document.getElementsByTagName('textarea')[0].addEventListener("keyup", function (event) {
	if (event.keyCode == 13 || event.key === 'Enter') {
		event.preventDefault();
		if (document.getElementsByTagName('textarea')[0].value.replace(/\s/g, "").length > 0) {
			document.getElementsByClassName('send-message-button')[0].click();
		}
		var d = document.querySelector('.js-growable');
		d.querySelector('textarea').value = '';
		d.querySelector('span').textContent = '';
	}
});

function keyUp() {
	var val = document.getElementsByTagName('textarea')[0].value;
	var updatedLocal = {
		currentMessage: val,
		userInfo: {
			name: JSON.parse(localStorage.babble).userInfo.name,
			email: JSON.parse(localStorage.babble).userInfo.email
		},
		cnt: JSON.parse(localStorage.babble).cnt
	}
	//JSON.parse(localStorage.babble).currentMessage=val; ///////////check this 
	localStorage.setItem("babble", JSON.stringify(updatedLocal));
	console.log("current message is: " + JSON.stringify(JSON.parse(localStorage.babble).currentMessage));
}