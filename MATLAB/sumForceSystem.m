function [ out ] = sumForceSystem( in )
% planets total force
%

out = in;

for i = 1:length(in)-1
    for n = i+1:length(in)
        
        out(i).force = calcForce( out(i), in(n) );
        out(n).force = -out(i).force;

    end
end
end
