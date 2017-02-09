function sumForceSystem( in ){
// planets total force


	 
	var out = in;

	for (var i = 0 ; i < in.length ; ++i){
		out(i).force = [0 0 0];
	}

	//Lita inte på att dessa forloopar är rätt
	for (var i = 0 ; i < in.length-1 ; ++i){
	    for (var n = i ; n < in.length ; ++n)	/*n = i+1:length(in)*/{
	        
	        //bör kanske stå något ist för out(i) ??? 
	        out(i).force = out(i).force + calcForce( out(i), in(n) );
	        out(n).force = out(n).force + calcForce( in(n), out(i) );
	        
	    }
	}

	return out;
}