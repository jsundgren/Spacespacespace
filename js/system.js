var system = [];
var G = 6.674*10^11;


function calcForce(p1, p2) {

    var fX = p2.pos[1] - p1.pos[1];
    var fY = p2.pos[2] - p1.pos[2];
    var fZ = p2.pos[3] - p1.pos[3];

    var d = sqrt( fX*fX + fY*fY + fZ*fZ );

    var epsi = 2.22e-1;

    if(d < epsi) {
        d = epsi;
    }

    var nfX = fX / d;
    var nfY = fY / d;
    var nfZ = fZ / d;

    var fM = G * p1.mass * p2.mass / (d * d);

    var f = [nfX, nfY, nfZ] * fM;

    return f;
}

function sumForceSystem(f1) {

    var f2 = f1;

    for(var i=0; i < f1.length; i++) {
        f2[i].force = [0, 0, 0];
    }

    for(var i = 0; i < f1.length-1; i++) {
        for(var j = i+1; j < f1.length; j++) {

            f2[i].force = f2[i].force + calcForce(f2[i], f1[j]);
            f2[j].force = f2[j].force + calcForce(f1[j], f2[i]);
        }
    }
    return f2;
}

function euler(y1, func, stepLength) {

    y2 = y1 + func * stepLength;

    return y2;
}

function nextPosition(p1, h) {

    var p2 = p1;

    for(var i = 0; i < p1.length; i++) {
        p2[i].velocity = euler(p1[i].velocity, p1[i].force/p1[i].mass, h);
        p2[i].pos = euler(p1[i].pos, p2[i].velocity, h);
        p2[i].model.position = p2[i].pos;
    }

}
