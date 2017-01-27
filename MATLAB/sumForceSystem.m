function [ out ] = sumForceSystem( in )
% planets total force
%

tic;

out = in;

for i = 1:length(in)-1
    for n = i+1:length(in)
        
        out(i).force = out(i).force + calcForce( out(i), in(n) );
        out(n).force = out(n).force + calcForce( in(n), out(i) );

    end
end

toc;

end