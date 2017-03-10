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

// PRESSING SPACE BAR
function onDocumentKeyDown( event ) {

  // Blackspace
  if ( event.keyCode == 32 ) {
    addPlanet();
  }
  // Q
  else if ( event.keyCode == 81 ){
    CentralizeToggle();
  }
}
