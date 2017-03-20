var maxPlanets = 10;

// PRESSING SPACE BAR
function onDocumentKeyDown( event ) {

  if ( event.keyCode == 32 ) { // Blank space
    if(system.length+1 > maxPlanets){
      console.log('No planet added');
      return;
    }
    addPlanet();
  }
  else if ( event.keyCode == 84 ){ // T
    reset();
  }
  else if ( event.keyCode == 80 ){ // P
    pause();
  }
  else if ( event.keyCode == 72 ){ // H
    hideShow();
  }
  else if ( event.keyCode == 83 ){
    maxPlanets = 10000000000000000;
  }
}

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

function pause(){

  if (!pauseToggle) {
    pauseToggle = true;
  }
  else {
    pauseToggle = false;
  }
}

function hideShow() {

  if (hideShowToggle) {
    console.log("false");
    for (var i = 0; i > system.length; i++){
      system[i].line.material.opacity = 0;
    }
    hideShowToggle = false;
  }
  else {
    console.log("true");
    for (var i = 0; i > system.length; i++){
      system[i].line.material.opacity = 0.5;
    }
    hideShowToggle = true;
  }
}

function reset(){

  while (system.length > 1) {
    remove(1);
  }
  system.length = 1;
  console.log("reset");
}

function remove(n){

  scene.remove(system[n].model);
  scene.remove(system[n].line);
  system.splice(n, 1);
  console.log("Planet removed");
}
