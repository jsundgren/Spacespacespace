var renderer, scene, camera, point, amblight, controls, stats;
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
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 2000 );
	camera.position.set(0, 0, -200);

	// CREATE LIGHT SOURCES
	point = new THREE.PointLight(0xffffff, 1, 300, 2);
	point.position.set(0,0,0);
	scene.add(point);
	amblight = new THREE.AmbientLight(0xffffff, 1);
	scene.add(amblight);

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

	// STATS
	stats = new Stats();
	document.body.appendChild( stats.dom );
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '20px';
	stats.domElement.style.top = '10px';

	// EVENT LISTENERS
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'keydown', onDocumentKeyDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseover', onDocumentMouseMove, false );
	
	//Space background is a large sphere
	var geometryStars = new THREE.SphereGeometry(1000, 32, 32);
	var materialStars = new THREE.MeshBasicMaterial();
	materialStars.map = THREE.ImageUtils.loadTexture('../img/space.jpg');
	materialStars.side = THREE.BackSide;
	var starMesh = new THREE.Mesh(geometryStars, materialStars);
	scene.add(starMesh);

  	//create two spotlights to illuminate the scene
  	var spotLight = new THREE.SpotLight( 0xffffff ); 
  	spotLight.position.set( -1000, 60, -500 ); 
  	spotLight.intensity = 2;
  	scene.add( spotLight );

  	var spotLight2 = new THREE.SpotLight( 0x5192e9 ); 
  	spotLight2.position.set( 1000, -60, 30 ); 
  	spotLight2.intensity = 1.5;
  	scene.add( spotLight2 );
  
  	scene.add(spacesphere);

	addSun();
}

	// RENDER ANIMATION
function animate () {

  	requestAnimationFrame( animate );


  	displayInfo();
  	system[0].model.rotateX(0.02);
  	system[1].model.rotateY(0.02);
  	displayInfo();

	//sumForceSystem(system);


	/*if(system.length > 1) {
	system[1].model.position.x;
	system[1].model.position.y;
	system[1].model.position.z;
	}*/
	//nextPosition(system, stepLength);

	stats.begin();
	renderer.render( scene, camera );
	stats.end();
}
