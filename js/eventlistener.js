var maxPlanets = 10;

// FOLLOW THE WINDOW SIZE
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// PRESSING SPACE BAR
function onDocumentKeyDown( event ) {

  // Blank space
  if ( event.keyCode == 32 ) {

    if(system.length+1 > maxPlanets){
      console.log('No planet added');
      return;
    }
    addPlanet();
  }
  // Q
  else if ( event.keyCode == 81 ){
    CentralizeToggle();
  }
  // P
  else if ( event.keyCode == 80 ){
    pause();
  }
  // H
  else if ( event.keyCode == 72 ){
    hideShow();
  }
  // :p
else if ( event.keyCode == 83 ){
    maxPlanets = 10000000000000000;
  }
}

// MOUSE POS TRACKER
function onDocumentMouseMove( event ) {

  event.preventDefault();
  mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
