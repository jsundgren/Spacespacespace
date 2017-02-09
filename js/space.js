var renderer, scene, camera, light;
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
	camera.position.set(0, 0, -60);

	// CREATE LIGHT SOURCES
	light = new THREE.DirectionalLight( 0xffffff );
	scene.add( light );

	// EVENT LISTENERS
	window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseover', onDocumentMouseMove, false );
}

// RENDER ANIMATION
function animate () {

	var v = 60; var d = 0.01;
  requestAnimationFrame( animate );

  camera.position.x += ( mouseX * v - camera.position.x ) * d;
  camera.position.y += ( -mouseY * v - camera.position.y ) * d;
  camera.lookAt( scene.position );

  light.position.set( camera.position.x, camera.position.y, camera.position.z ).normalize();

  renderer.render( scene, camera );
}
