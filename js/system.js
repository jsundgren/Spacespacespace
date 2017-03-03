var system = [];
var x = false;
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

  if ( x ) {

    if ( system[0].position.length() < 1) {
      x = false;
    }

    var forandring = 0.07;
    var vecForandring = new THREE.Vector3( forandring, forandring, forandring );
    var tmp = new THREE.Vector3();

    tmp.multiplyVectors( system[0].position, vecForandring ).negate();
    system[0].position.add(tmp);
    scene.children[3].position.copy( system[0].position );
  }

  for(var i = 0; i < system.length; i++) {

    var forceFunc = new THREE.Vector3();
    forceFunc = system[i].force.divideScalar( system[i].mass );

    system[i].velocity = euler(system[i].velocity, forceFunc);
    system[i].position = euler(system[i].position, system[i].velocity);

    scene.children[i+3].position.copy( system[i].position );

    // Ta bort planet function?
  }
  sunLight.position.copy( system[0].position );
  // Kolla position -> ta bort planet
}

function CenterOfMass() {
  /*

  ÖVERSÄTT TILL THREE VECTORS

  var com = [0, 0, 0];

  if (system.length < 2){
  return com;
}

var num = 0;
var den = 0;

for(var i = 0; i < 3; i++){
for( var j = 0; j < system.length; j++){
num += system[j].mass * system[j].pos[i];
den += system[j].mass;
com[i] = num / den;
}
num = 0;
den = 0;
}
return com;
*/
}


/*function initialVelocity() {
// make sure system[0] is the sun and not the sunGlow
var velocity = [0, 0 ,0];
var m = system[0].mass + system[system.length-1].mass;
var rX = system[0].pos[0] - system[system.length-1].pos[0];
var rY = system[0].pos[1] - system[system.length-1].pos[1];
var rZ = system[0].pos[2] - system[system.length-1].pos[2];
var r = Math.sqrt( rX*rX + rY*rY + rZ*rZ );

//var totMagnitud = Math.sqrt(G*m/r);
velocity[0] =  Math.sqrt(G*m/r);

//
//defineing a plane perpendicular to the sun and randomizes vectors on the plan for the planets to be launched at.
//

// 1. Sun.pos - camera.pos to get normal vector. May use COM.pos - earth.pos, or COM.pos - camera.pos, or sun.pos - earth.pos
var normalVector = new THREE.Vector3();
normalVector.setX(system[0].pos[0] - camera.position.getComponent(0));	//system[0].pos should be a threeJS Vector3
normalVector.setY(system[0].pos[1] - camera.position.getComponent(1));
normalVector.setZ(system[0].pos[2] - camera.position.getComponent(2));

console.log(normalVector);
// 2. normalize normal vector
normalVector.normalize();
console.log(normalVector);

// 3. define the plane



// 4. randomize a vector on the plane

// 5. destribute totMagnitud to randVec
// 6. set velocity[0] = randVec.x * Math.sqrt(G*m/r);
// 	set velocity[1] = randVec.y * Math.sqrt(G*m/r);
//	set velocity[2] = randVec.z * Math.sqrt(G*m/r);



return velocity;
*/

// KOLLA IN DENNA SÅ DEN BLIR RÄTT
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

function removePlanet(n) {

  scene.remove( scene.children[n+3] );
  system.splice( n );
}

function resetSun(){

  x = true;
}
