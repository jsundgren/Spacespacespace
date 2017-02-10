// FOLLOW THE WINDOW SIZE
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// MOUSE POS TRACKER
function onDocumentMouseMove( event ) {

  event.preventDefault();
  mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

// MOUSE ACTON TRACKER
function onDocumentKeyDown( event ) {

  var range = 3; var spread = 30;
  var vector = new THREE.Vector3( camera.position.x, camera.position.y, camera.position.z );

  vector.x /= range;
  vector.y /= range;
  vector.z /= range;

  vector.x += THREE.Math.randFloatSpread( spread );
  vector.y += THREE.Math.randFloatSpread( spread );
  vector.z += THREE.Math.randFloatSpread( spread );

  addModel( vector.x, vector.y , vector.z );
}
