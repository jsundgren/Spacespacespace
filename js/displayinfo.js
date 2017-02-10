// DISPLAY MOUSE ACTION POS
function displayInfo() {

	document.getElementById("topbar").innerHTML = 'Camera pos: ' + Math.round(camera.position.x) + ' / ' + Math.round(camera.position.y) + ' / ' + Math.round(camera.position.z);
	document.getElementById("topbar").innerHTML += '<br> Center of mass: ';
}
