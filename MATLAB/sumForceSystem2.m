function [ out ] = sumForceSystem2( in )
% planets total force
%

tic;

out = in;

for i = 1:length(in)
    for n = 1:length(in)
        
        if isequal(in(i).position, in(n).position)
           continue; 
        end
        
        out(i).force = out(i).force + calcForce( out(i), in(n) );

    end
end

toc;

end
