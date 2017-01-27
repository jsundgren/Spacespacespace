function [ f ] = sumForcePlanet( p, s )
% planets totala force
%

f = [0 0 0];

for i = 1:length(s)
    
    if isequal(p.position, s(i).position)
        continue;
    end
        
    f = f + calcForce(p, s(i));
end
end
