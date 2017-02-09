function euler(inSystem, func, stepLength){
	var outSystem = inSystem + (func*stepLength);
	return 	outSystem;
}