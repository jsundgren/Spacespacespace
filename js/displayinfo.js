// DISPLAY MOUSE ACTION POS
function displayInfo() {

	var com = centerOfMass(system);

	document.getElementById("topbar").innerHTML = Math.round(camera.position.x) + ' / ' + Math.round(camera.position.y) + ' / ' + Math.round(camera.position.z);
	document.getElementById("topbar").innerHTML += '<br> Center of mass: ' + Math.round(com[0]) + ' / ' + Math.round(com[1]) + ' / ' +  Math.round(com[2]);

}
