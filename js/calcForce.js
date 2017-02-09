function(planet1, planet2){
//planet2s påverkan på planet1
	G = 6.674*10^-11;

	fX = p2.position(1) - p1.position(1);
	fY = p2.position(2) - p1.position(2);
	fZ = p2.position(3) - p1.position(3);
				//PLANETS NEED to be objects for .position to twerk

	d = sqrt( fX*fX + fY*fY + fZ*fZ );
	
	// to small distance d will cause the force later on to be way to big 
	epsi = 2.22e-1;
	if(d<epsi){
    	d = epsi;
	}

	//normalizes
	nfX = fX / d;
	nfY = fY / d;
	nfZ = fZ / d;

	//newtons law of attraction
	fm = G * planet1.mass*planet2.mass / (d*d);
								//PLANETS NEED to be objects for .mass to twerk

	return = ([nfX nfY nfZ] * fm);
}