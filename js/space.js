var renderer, scene, camera, sunLight, sunGlow, controls, stats;
var mouseX = 0, mouseY = 0;
var stepLength = 0.1;

init();
animate();

/*
scene.children[n]
0: något
1: något
2: bakgrunden
3: solen
*/

function init() {

	// CREATE RENDERER
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// CREATE SCENE & CAMERA
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 4000 );
	camera.position.set(0, 0, -200);

	// CREATE LIGHT SOURCES
	sunLight = new THREE.PointLight(0xffffff, 1, 2000, 2);
	sunLight.position.set(0,0,0);
	scene.add(sunLight);
	ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
	scene.add(ambientLight);

	sunGlow = new THREE.PointLight(0xffffff, 0.8, 1000, 1);
	sunGlow.position.set(0,0,0);
	scene.add(sunGlow);


	// CAMERA CONTROLS
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.9;
	controls.enableZoom = true;
	controls.minDistance = 60;
	controls.maxDistance = 1000;

	// STATS
	stats = new Stats();
	document.getElementById("topbar").appendChild( stats.dom );
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '20px';
	stats.domElement.style.top = '10px';

	// EVENT LISTENERS
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'keydown', onDocumentKeyDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseover', onDocumentMouseMove, false );

	// BACKGROUND
	var spacesphereGeo = new THREE.SphereGeometry(controls.maxDistance*2, 32, 32);
	var spacesphereMat = new THREE.MeshPhongMaterial();
	// ÄNDRA TILL NYARE FUNKTION: TEXTURELOADER()
	var spacetex = THREE.ImageUtils.loadTexture('img/space.png');
	spacetex.wrapS = THREE.RepeatWrapping;
	spacetex.wrapT = THREE.RepeatWrapping;
	spacesphereMat.map = spacetex;
	spacesphereMat.side = THREE.BackSide;
	var spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);
	scene.add(spacesphere);


	scene.add( new THREE.PointLightHelper( sunGlow, 22 ) );

	addSun();
}

// RENDER ANIMATION
function animate () {

	requestAnimationFrame( animate );
	updateForces();
	updatePositions();


	stats.begin();
	renderer.render( scene, camera );
	stats.end();
}
