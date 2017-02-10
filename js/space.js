var renderer, scene, camera, light, controls, sunLight;
var mouseX = 0, mouseY = 0;
var stepLength = 8000;


init();
animate();

function init() {

	// CREATE RENDERER
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// CREATE SCENE & CAMERA
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	camera.position.set(0, 0, -200);

	// CREATE LIGHT SOURCES
	light = new THREE.DirectionalLight( 0xffffff );
	scene.add( light );

	//CREATE LIGHT IN SUN
	sunLight = new THREE.PointLight( 0xff0000, 1, 100 );
	sunLight.position.set( 0, 0, 0 );
	scene.add( sunLight );

  	// CAMERA CONTROLS
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.9;
	controls.enableZoom = true;
	controls.minDistance = 60;
	controls.maxDistance = 1000;

	// EVENT LISTENERS
	window.addEventListener( 'resize', onWindowResize, false );
  	document.addEventListener( 'keydown', onDocumentKeyDown, false );
  	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  	document.addEventListener( 'mouseover', onDocumentMouseMove, false );

	addSun();
}

	// RENDER ANIMATION
function animate () {

  	requestAnimationFrame( animate );

  	light.position.set( camera.position.x, camera.position.y, camera.position.z ).normalize();

	/*system = sumForceSystem(system);
	system = nextPosition(system, stepLength);*/

	displayInfo();

  	renderer.render( scene, camera );
}
