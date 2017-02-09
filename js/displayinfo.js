// DISPLAY MOUSE ACTION POS
function displayInfo() {

	document.getElementById("topbar").innerHTML = Math.round(camera.position.x) + ' / ' + Math.round(camera.position.y) + ' / ' + Math.round(camera.position.z);
}
