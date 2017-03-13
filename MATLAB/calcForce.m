function [ f ] = calcForce( p1, p2 )
% planet2's effect on planet1

G = 6.674 * 10^-11;

fX = p2.position(1) - p1.position(1);
fY = p2.position(2) - p1.position(2);
fZ = p2.position(3) - p1.position(3);

d = sqrt( fX*fX + fY*fY + fZ*fZ );
epsi = 2.22e-1;
if(d<epsi)
    d = epsi;
end
nfX = fX / d;
nfY = fY / d;
nfZ = fZ / d;

fM = G * p1.mass * p2.mass / (d * d);

f = [nfX nfY nfZ] * fM;

end
