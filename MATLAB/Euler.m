function [ out ] = Euler( in, func, stepLength )
% Eulers method

out = in + func * stepLength; 

end