var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( { color: 0x2194ce } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var spotLight       = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 10, 10, 10 );
scene.add( spotLight );

var light           = new THREE.AmbientLight( 0x404040 );
scene.add( light );

camera.position.z = 5;

// Ny kod
var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.enableZoom = true;

//Zoomar man ut mer än 82 så missar ljuset globen
controls.minDistance = 30;
controls.maxDistance = 60;
//

var render = function () {
    requestAnimationFrame( render );
    controls.update();

    cube.rotation.x += 0.0049;
    cube.rotation.y += 0.005;

    renderer.render(scene, camera);
};

render();
