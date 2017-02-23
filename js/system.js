var system = [];

var G = 6.674*10^11;

function calcForce(planet1, planet2) {

    var fX = planet2.pos[0] - planet1.pos[0];
    var fY = planet2.pos[1] - planet1.pos[1];
    var fZ = planet2.pos[2] - planet1.pos[2];


  var d = Math.sqrt( fX*fX + fY*fY + fZ*fZ );

  var epsi = 2.22*10^-1;

  if(d < epsi) {
    d = epsi;
  }

  var nfX = fX / d;
  var nfY = fY / d;
  var nfZ = fZ / d;

    var fM = G * planet1.mass * planet2.mass / (d * d);


  var f = [nfX, nfY, nfZ] * fM;

  return f;
}

function sumForceSystem(system1) {

   for(var i=0; i < system1.length; i++) {
        system1[i].force = [0, 0, 0];
    }

    force1 = [0,0,0];
    
    for(var i = 0; i < system1.length-1; i++) {
        for(var j = i+1; j < system1.length; j++) {

            system1[i].force = system1[i].force + calcForce(system[i], system[j]);
            system1[j].force = system1[j].force + calcForce(system[j], system[i]);
        }

    }
}

function euler(y1, func, steplength) {

    y2 = y1 + func * steplength;

  return y2;
}

function nextPosition(system1, steplength) {

    var system2 = system1;

    for(var i = 0; i < system1.length; i++) {
        system2[i].velocity = euler(system1[i].velocity, system1[i].force/system1[i].mass, steplength);
        system2[i].pos = euler(system1[i].pos, system2[i].velocity, steplength);
        system2[i].model.position = system2[i].pos;

        if(Math.abs(system2[i].pos) > controls.maxDistance)	
        {
        	system2.remove(system2[i]);
        }
    }

}


function centerOfMass(system1) {

    var numerator = 0;
    var denumerator = 0;
    var com = [0, 0, 0];

    for(var i = 1; i < system1.length; i++) {
        for(var j = 1; j < 4; j++) {
            numerator = numerator + (system1[i].mass * system1[i].pos[j]);
            denumerator = denumerator + system1[i].mass;
            com[j] = numerator/denumerator;

        }
    }
    return com;
}
