// function [ f ] = sumForcePlanet( p, s )
// % planets totala force
// %

// f = [0 0 0];

// for i = 1:length(s)
    
//     if isequal(p.position, s(i).position)
//         continue;
//     end
        
//     f = f + calcForce(p, s(i));
// end
// end

function sumForcePlanet (p, s){
	//planets total force

	f = [0 0 0];

	for (var i = 0;s < s.length ; ++i) {
		if(p.position == s(i).position)
		{
			continue;
		}
		f = f + calcForce(p, s(i));
	}
}