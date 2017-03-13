var system = [];
var lines = [];
var MoveToCenter = false;
var G = 6.674*10^11;
var currTime = 0;

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
      system[i].model.position.copy( system[i].position );
    }
  }

  for(var i = 0; i < system.length; i++) {

    var forceFunc = new THREE.Vector3();
    forceFunc = system[i].force.divideScalar( system[i].mass );

    system[i].velocity = euler(system[i].velocity, forceFunc);
    system[i].position = euler(system[i].position, system[i].velocity);

    system[i].model.position.copy( system[i].position );

    if ( currTime % 8 == 0 ) {
      updateLine(i, system[i].model.material.color);
    }
  }

  currTime++;

  var posLight = new THREE.Vector3().copy( system[0].position );
  var tmp = new THREE.Vector3().subVectors( camera.position, posLight );
  tmp.normalize().multiplyScalar(40);
  posLight.add(tmp);

  sunLightIn.position.copy( posLight );
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

function CentralizeToggle(){

  console.log('Centralize');

  if (!MoveToCenter) {
    MoveToCenter = true;

    setTimeout(function() {
      MoveToCenter = false;

      for (var i = 0; i < system.length; i++) {
        system[i].line.geometry.vertices.reverse();
        system[i].line.geometry.vertices.length = 1;
      }

      console.log('Decentralize');
    }, 1000);
  }
}

function getColor() {
  var white = THREE.Math.randInt(0, 2);

  var red = Math.floor(THREE.Math.randFloat(0, 255));
  var green = Math.floor(THREE.Math.randFloat(0, 255));
  var blue  = Math.floor(THREE.Math.randFloat(0, 255));

  var colors = [red, green, blue];
  colors[white] = 255;

  var col = new THREE.Color("rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")");

  return col;
}
