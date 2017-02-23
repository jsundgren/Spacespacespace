// DISPLAY CAMERA POS
function displayInfo() {

	document.getElementById("topbar").innerHTML = Math.round(camera.position.x) + ' / ' + Math.round(camera.position.y) + ' / ' + Math.round(camera.position.z);
	document.getElementById("topbar").innerHTML += '<br> Center of mass: ' + Math.round(centerOfMass()[0]) + ' / ' + Math.round(centerOfMass()[1]) + ' / ' +  Math.round(centerOfMass()[2]);

}
