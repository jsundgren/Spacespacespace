function [ velocity2 ] = Euler( velocity1, acceleration, stepLength )

velocity2 = velocity1 + acceleration * stepLength; 

end

