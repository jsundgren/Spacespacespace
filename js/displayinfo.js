// DISPLAY CAMERA POS
function displayInfo() {

	document.getElementById("topbar").innerHTML = Math.round(camera.position.x) + ' / ' + Math.round(camera.position.y) + ' / ' + Math.round(camera.position.z);
	document.getElementById("topbar").innerHTML += '<br> Center of mass: ' + Math.round(centerOfMass()[0]) + ' / ' + Math.round(centerOfMass()[1]) + ' / ' +  Math.round(centerOfMass()[2]);
	if (system.length < 2) return;
	document.getElementById("topbar").innerHTML += '<br><br> Pos: ' + Math.round(system[1].pos[0]) + ' / ' + Math.round(system[1].pos[1]) + ' / ' + Math.round(system[1].pos[2]);
	document.getElementById("topbar").innerHTML += '<br> Vel: ' + Math.round(system[1].velocity[0]) + ' / ' + Math.round(system[1].velocity[1]) + ' / ' + Math.round(system[1].velocity[2]);
	document.getElementById("topbar").innerHTML += '<br> Force: ' + system[1].force[0] + ' / ' + system[1].force[1] + ' / ' + system[1].force[2];
}
