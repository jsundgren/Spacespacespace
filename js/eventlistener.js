// FOLLOW THE WINDOW SIZE
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// MOUSE POS TRACKER
function onDocumentMouseMove( event ) {

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  mouseX = (event.clientX - windowHalfX) / windowHalfX;
  mouseY = (event.clientY - windowHalfY) / windowHalfY;

}

// MOUSE ACTON TRACKER
function onDocumentMouseDown( event ) {

  var vector = new THREE.Vector3();

  vector.set(
  ( event.clientX / window.innerWidth ) * 2 - 1,
  - ( event.clientY / window.innerHeight ) * 2 + 1,
  0.5 );

  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

  addModel( pos.x, pos.y ,0 );

  displayInfo(pos);
}
