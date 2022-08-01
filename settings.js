function createCookie(){
	var value= document.getElementById('volume').value;
	value=value/100;
	document.cookie = "volume="+value+"; expires=Sun, 19 Jan 2020 12:00:00 UTC; path=/";
}