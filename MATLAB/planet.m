classdef planet

    properties
        mass            %Mass of planet (kg)
        position        %Position of the planet, vector of three [x, y, z]
        velocity        %Velocity of planet, vector of three [x, y, z]
        force           %Force of the planet, vector of three [x, y, z]
    end
    
    methods
        function obj=planet(m, v, p, f)
            
            obj.mass = m;
            obj.velocity = v;
            obj.position = p;
            obj.force = f;
        end
    end
    
end

