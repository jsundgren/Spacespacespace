var system = [];
var MoveToCenter = true;
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
  force.multiplyScalar( magnitude );

  return force;
}

function updateForces() {

  var forces = [];
  // Kolla in i mån av tid för optimering
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
  // Kolla in i mån av tid
  output.multiplyVectors( func, vecStepLength ).add( input );

  return output;
}

function updatePositions() {

  if ( MoveToCenter ) {

    var forandring = 0.1;
    var vecForandring = new THREE.Vector3( forandring, forandring, forandring );
    var tmp = new THREE.Vector3();

    tmp.multiplyVectors( CenterOfMass(), vecForandring ).negate();

    for(var i = 0; i < system.length; i++) {

      system[i].position.add(tmp);
      scene.children[i+3].position.copy( system[i].position );
    }
  }

  for(var i = 0; i < system.length; i++) {

    var forceFunc = new THREE.Vector3();
    forceFunc = system[i].force.divideScalar( system[i].mass );

    system[i].velocity = euler(system[i].velocity, forceFunc);
    system[i].position = euler(system[i].position, system[i].velocity);

    scene.children[i+4].position.copy( system[i].position );

    if ( system[i].position.length() > 2000 ) {
    	removePlanet(i);
    }
  }

  //var posLight = new THREE.Vector3().subVectors( camera.position, system[0].position ).normalize().multiplyScalar(30);
  var posLight = new THREE.Vector3().copy(system[0].position);

  posLight.add( camera.position );

  sunGlow.position.copy( posLight );
  sunLight.position.copy( system[0].position );
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

// KOLLA IN DENNA SÅ DEN BLIR RÄTT
function initialVelocity( mass, planetPosition ) {

  var startVelocity = new THREE.Vector3();

  var totMass = system[0].mass + mass;
  var distance = system[0].position.distanceTo( planetPosition );
  var v = Math.sqrt( G*totMass/distance );

  var direction = new THREE.Vector3( THREE.Math.randFloatSpread(1), THREE.Math.randFloatSpread(1), THREE.Math.randFloatSpread(1));
  //vi kommer inte behöva ändra på (camera.position) här under om vi updaterar camperapositionen så att vi alltid kollar på solen.
  direction.projectOnPlane( camera.position ).normalize();

  var vecV = new THREE.Vector3( v, v, v );
  startVelocity.multiplyVectors( direction, vecV );

  return startVelocity;
}

function removePlanet(n) {

  scene.remove( scene.children[n+3] );
  system.splice( n );
}

function CentralizeToggle(){

  console.log('Centralize: ' + !MoveToCenter);

  if (MoveToCenter) {
    MoveToCenter = false;

  } else {
    MoveToCenter = true;
  }
}
