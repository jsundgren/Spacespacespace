function [ out ] = nextPosition( in, h )

out = in; 


    for i = 1:length(in)
        
        out(i).velocity = Euler(in(i).velocity, in(i).force/in(i).mass, h);
        out(i).position = Euler(in(i).position, out(i).velocity, h);
        
    end


end

