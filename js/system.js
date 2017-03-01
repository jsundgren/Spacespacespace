var system = [];

var G = 6.674*10^11;

function calcForce(planet1, planet2) {

  var force = new THREE.Vector3();
  var epsi = 20;

  var distance = planet1.position.distanceTo(planet2.position);

  if( distance < epsi ) {
    distance = epsi;
  }

  var magnitude = G * planet1.mass * planet2.mass / (distance * distance);

  force.subVectors( planet2.position, planet1.position ).normalize();
  var vecMagnitude = new THREE.Vector3( magnitude, magnitude, magnitude );
  force.multiply( vecMagnitude );

  return force;
}

function updateForces() {

  var forces = [];

  for(var i = 0; i < system.length; i++) {
    forces.push( new THREE.Vector3() );
  }

  for(var i = 0; i < system.length-1; i++) {
    for(var j = i+1; j < system.length; j++) {

      var force = new calcForce(system[i], system[j]);
      forces[i].add( force );
      forces[j].add( force.negate() );

    }

    system[i].force = forces[i];
  }

  system[system.length-1].force = forces[system.length-1];
}

function euler(input, func) {

  var output = new THREE.Vector3();
  var vecStepLength = new THREE.Vector3( stepLength, stepLength, stepLength );

  output.multiplyVectors( func, vecStepLength ).add( input );

  return output;
}

function updatePositions() {

  for(var i = 0; i < system.length; i++) {

    var forceFunc = new THREE.Vector3();
    forceFunc = system[i].force.divide( new THREE.Vector3( system[i].mass, system[i].mass, system[i].mass ));

    system[i].velocity = euler(system[i].velocity, forceFunc);
    system[i].position = euler(system[i].position, system[i].velocity);

    scene.children[i+3].position.copy( system[i].position );

    // Ta bort planet function?
  }
}

function CenterOfMass() {

}

function initialVelocity( mass, planetPosition ) {

  var startVelocity = new THREE.Vector3();

  var totMass = system[0].mass + mass;
  var distance = system[0].position.distanceTo( planetPosition );
  var v = Math.sqrt( G*totMass/distance );

  var direction = new THREE.Vector3( Math.random(), Math.random(), Math.random());
  console.log(direction);

  direction.projectOnPlane( camera.position ).normalize();
  console.log(direction);
  var vecV = new THREE.Vector3( v, v, v );
  console.log(vecV);
  startVelocity.multiplyVectors( direction, vecV );
  console.log(startVelocity);

  return startVelocity;
}

function removePlanet(n) {

  // Ta bort en planet n

}
