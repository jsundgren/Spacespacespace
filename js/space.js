
var renderer, scene, camera, light, cameraControls;
var mouseX = 0, mouseY = 0;

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
	camera.position.set(0, 0, -3);

	// CREATE LIGHT SOURCES
	light = new THREE.DirectionalLight( 0xffffff );
	scene.add( light );

	// SET ORBIT CONTROLS
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);

	cameraControls.enableDamping = true;
	cameraControls.dampingFactor = 0.25;
	cameraControls.enableZoom = true;
	cameraControls.minDistance = 10;
	cameraControls.maxDistance = 60;

	// EVENT LISTENERS
	window.addEventListener( 'resize', onWindowResize, false );

	addModel(0, 0, 0);
}

// RINGS
function addRing(radiusIn, radiusOut, planet, colorRing) {

	var geometryRing = new THREE.RingGeometry( radiusIn, radiusOut, 50 );
	var materialRing = new THREE.MeshBasicMaterial( { color: colorRing, transparent: true, opacity: 0.6, side: THREE.DoubleSide} );
	materialRing.side = THREE.DoubleSide;
	var rings = new THREE.Mesh( geometryRing, materialRing );
	rings.rotateX(3.14/2.5);
	scene.add(rings);
}

function addModel( x, y, z ) {

	var r = THREE.Math.randFloat( 1.5, 3 );
	var m = r/5;

	var geometry = new THREE.IcosahedronGeometry( r, 1 );
	var material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff } );
	material.shading = THREE.FlatShading;

	var model = new THREE.Mesh( geometry, material );
	scene.add( model );

	for( i = 0; i < model.geometry.vertices.length; i = i + 3 ) {
		model.geometry.vertices[i].x += THREE.Math.randFloatSpread( m );
		model.geometry.vertices[i].y += THREE.Math.randFloatSpread( m );
		model.geometry.vertices[i].z += THREE.Math.randFloatSpread( m );
	}

	model.VerticesNeedUpdate = true;

	model.position.x = x;
	model.position.y = y;
	model.position.z = z;

	if( THREE.Math.randInt( 1, 3 ) == 3 ) {

		var inner = r + THREE.Math.randFloat( 0.8, 1.2 );
		var outer = inner + THREE.Math.randFloat( 1, 1.3 );

		addRing( inner, outer, model, Math.random()*0xffffff);
	}
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate () {

	requestAnimationFrame( animate );
	cameraControls.update();
	light.position.set( camera.position.x, camera.position.y, camera.position.z ).normalize();

	renderer.render( scene, camera );
};
