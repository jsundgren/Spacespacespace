var system = [];
var G = 6.674*10^11;
var currTime = 0;
var hideShowToggle = true;

function calcForce(planet1, planet2) {

  var force = new THREE.Vector3();
  var epsi = 20;
  var distance = planet1.position.distanceTo(planet2.position);

  if( distance < epsi ) {
    distance = epsi;
  }

  var magnitude = G * planet1.mass * planet2.mass / (distance * distance);

  force.subVectors( planet2.position, planet1.position ).normalize();
  force.multiplyScalar( magnitude );

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

  var center = new THREE.Vector3().copy(system[0].position);
  center.negate();

  for(var i = 0; i < system.length; i++) {

    var forceFunc = new THREE.Vector3();
    forceFunc = system[i].force.divideScalar(system[i].mass);

    system[i].velocity = euler(system[i].velocity, forceFunc);
    system[i].position = euler(system[i].position, system[i].velocity);
    system[i].position.add( center );
    system[i].model.position.copy( system[i].position );

    if (i != 0 && (system[i].position.distanceTo(new THREE.Vector3()) > 2000 || system[i].position.distanceTo(new THREE.Vector3()) < 26.5)) {
      remove(i);
    }
    if ( currTime % 8 == 0 ) {
      updateLine(i, system[i].model.material.color);
    }
  }

  currTime++;

  var posLight = new THREE.Vector3().copy( system[0].position );
  tmp = new THREE.Vector3().copy( camera.position );
  tmp.normalize().multiplyScalar(50);
  posLight.add(tmp);
  sunLightIn.position.copy( posLight );

  tmp = new THREE.Vector3().copy( camera.position );
  tmp.negate().normalize().multiplyScalar(1800);
  posLight.add(tmp);
  backgroundLight.position.copy( posLight );

  sunLightOut.position.copy( system[0].position );
  sunShine.position.copy( system[0].position );
}

function CenterOfMass() {

  var com = new THREE.Vector3();
  var tmp = new THREE.Vector3();
  var totMass = 0;

  for (var i = 0; i < system.length; i++) {

    tmp.copy(system[i].position);
    com.add(tmp.multiplyScalar(system[i].mass));
    totMass += system[i].mass;
  }

  com.divideScalar(totMass);

  return com;
}

function initialVelocity( mass, planetPosition ) {

  var startVelocity = new THREE.Vector3();
  var totMass = system[0].mass + mass;
  var distance = system[0].position.distanceTo( planetPosition );
  var v = Math.sqrt( G*totMass/distance );

  var direction = new THREE.Vector3( THREE.Math.randFloatSpread(1), THREE.Math.randFloatSpread(1), THREE.Math.randFloatSpread(1));
  direction.projectOnPlane( camera.position ).normalize();

  var vecV = new THREE.Vector3( v, v, v );
  startVelocity.multiplyVectors( direction, vecV );

  return startVelocity;
}

function collision() {
  // Snart står de saker här kanske
}
