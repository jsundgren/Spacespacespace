function [ out ] = nextPosition( in, h )

out = in; 


    for i = 1:length(in)
        
        out(i).velocity = Euler(in(i).velocity, in(i).force/in(i).mass, h);
        out(i).position = Euler(in(i).position, out(i).velocity, h);
        %out(i).velocity = RungeKutta(in(i).velocity, in(i).force/in(i).mass, odefunc, h);
        %out(i).position = RungeKutta(in(i).position, out(i).velocity, odefunc, h);
        
    end


end

