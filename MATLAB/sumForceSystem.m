function [ out ] = sumForceSystem( in )
% calculate the new forces in the system

tic; 

out = in;

for i = 1:length(in)
	out(i).force = [0 0 0];
end

for i = 1:length(in)-1
    for n = i+1:length(in)
        
        out(i).force = out(i).force + calcForce( out(i), in(n) );
        out(n).force = out(n).force + calcForce( in(n), out(i) );
        
    end
end

toc;

end