function [ com ] = COM( s )
% planets total force
%

T = 0;
N = 0;
com = [0 0 0];

for i = 1:length(s)
   for j = 1:3
    T = T + ( s(i).mass * s(i).position(j))
    N = N + s(i).mass
    
    com(j) = T/N;
   end
end
end
