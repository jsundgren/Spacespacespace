var system = [];

var G = 6.674*10^11;

function calcForce(planet1, planet2) {
  var fX = planet2.pos[0] - planet1.pos[0];
  var fY = planet2.pos[1] - planet1.pos[1];
  var fZ = planet2.pos[2] - planet1.pos[2];

  var d = Math.sqrt( fX*fX + fY*fY + fZ*fZ );

  var epsi = 20;

  if(d < epsi) {
    d = epsi;
  }

  var nfX = fX / d;
  var nfY = fY / d;
  var nfZ = fZ / d;
  var fM = G * planet1.mass * planet2.mass / (d * d);

  var f = [nfX*fM, nfY* fM, nfZ*fM];

  return f;
}

function uppdateForces() {

  var forces = [];

  for(var i = 0; i < system.length; i++) {
    forces.push([0, 0, 0]);
  }

  for(var i = 0; i < system.length-1; i++) {
    for(var j = i+1; j < system.length; j++) {

      forces[i][0] += calcForce(system[i], system[j])[0];
      forces[j][0] += calcForce(system[j], system[i])[0];

      forces[i][1] += calcForce(system[i], system[j])[1];
      forces[j][1] += calcForce(system[j], system[i])[1];

      forces[i][2] += calcForce(system[i], system[j])[2];
      forces[j][2] += calcForce(system[j], system[i])[2];
    }

    system[i].force = forces[i];
  }

  system[system.length-1].force = forces[system.length-1];
}

function setLight(){
  var pos = new THREE.Vector3(system[0].pos[0], system[0].pos[1], system[0].pos[2]);
  sun.position.copy(pos);
}

function euler(input, func) {

  var x = func[0] * stepLength + input[0];
  var y = func[1] * stepLength + input[1];
  var z = func[2] * stepLength + input[2];

  return [x, y, z];
}

function uppdatePositions() {

  for(var i = 0; i < system.length; i++) {

    var x = system[i].force[0]/system[i].mass;
    var y = system[i].force[1]/system[i].mass;
    var z = system[i].force[2]/system[i].mass;

    system[i].velocity = euler(system[i].velocity, [x, y, z]);
    system[i].pos = euler(system[i].pos, system[i].velocity);

    system[i].model.position.x = system[i].pos[0];
    system[i].model.position.y = system[i].pos[1];
    system[i].model.position.z = system[i].pos[2];

/*
    if(Math.abs(system2[i].pos) > controls.maxDistance)  {
      system2.remove(system2[i]);
    }*/
  }
}

function centerOfMass() {

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
}

function initialVelocity() {

  var velocity = [0, 0 ,0];
  var m = system[0].mass + system[system.length-1].mass;
  var rX = system[0].pos[0] - system[system.length-1].pos[0];
  var rY = system[0].pos[1] - system[system.length-1].pos[1];
  var rZ = system[0].pos[2] - system[system.length-1].pos[2];
  var r = Math.sqrt( rX*rX + rY*rY + rZ*rZ );

  velocity[0] = Math.sqrt(G*m/r);
  return velocity;
}
