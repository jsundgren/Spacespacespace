// ADD PLANET
function addModel( ) {

  // Avstånd från solen
  var range = 3;
  // Osäkerhet
  var spread = 30;
  // Radie
  var r = THREE.Math.randFloat( 3, 10 );
  // Bucklar planeten
  var m = r/5;
  // Färg
  var matColor = Math.random() * 0xffffff;

  var vector = new THREE.Vector3( camera.position.x, camera.position.y, camera.position.z );

  vector.x /= range;
  vector.y /= range;
  vector.z /= range;

  vector.x += THREE.Math.randFloatSpread( spread );
  vector.y += THREE.Math.randFloatSpread( spread );
  vector.z += THREE.Math.randFloatSpread( spread );

  // CREATE SPHERE
  var geometry = new THREE.IcosahedronGeometry( r, 1 );

  // COLOR THE MODEL
  for ( var i = 0; i < geometry.faces.length; i = i + 3 ) {
    geometry.faces[i].color.setHex( matColor + 0.5 );
  }

  var material = new THREE.MeshPhongMaterial( { color: matColor, vertexColors: THREE.VertexColors } );
  material.shading = THREE.FlatShading;
  var model = new THREE.Mesh( geometry, material );

  for( i = 0; i < model.geometry.vertices.length; i = i + 3 ) {
    model.geometry.vertices[i].x += THREE.Math.randFloatSpread( m );
    model.geometry.vertices[i].y += THREE.Math.randFloatSpread( m );
    model.geometry.vertices[i].z += THREE.Math.randFloatSpread( m );
  }

  // CREATE RINGS
  if(Math.random() > 0.3) {
    var radTorus = r + THREE.Math.randFloat(1, 1.3);
    var colorRing = Math.random()*0xffffff;

    var geometryTorus = new THREE.TorusGeometry(radTorus, 0.5, 3, 11);
    geometryTorus.rotateX(Math.random()*(3.14/2.5));
    var materialRing = new THREE.MeshPhongMaterial({color: colorRing});
    var torus = new THREE.Mesh( geometryTorus, materialRing );
    model.add(torus);
  }

  model.position.x = vector.x;
  model.position.y = vector.y;
  model.position.z = vector.z;

  // CREATE PLANET
  var p = new planet(1, [0,0,0], [model.position.x, model.position.y, model.position.z], model);
  system.push(p);
  p.velocity = initialVelocity();
  p.add2scene(scene);

  console.log('Added planet ' + system.length );
}

// SUN
function addSun() {

  var r = 20;
  var m = r/5;

  var geometry = new THREE.IcosahedronGeometry( r, 1 );
  var material = new THREE.MeshPhongMaterial( { color: 0xffff2d } );
  material.shading = THREE.FlatShading;

  var geometryGlow = new THREE.IcosahedronGeometry( 1.2*r, 3 );
  var materialGlow = new THREE.MeshBasicMaterial( { color: 0xea812a, transparent: true, opacity: 0.1, side: THREE.DoubleSide} );
  materialGlow.shading = THREE.FlatShading;

  var model = new THREE.Mesh( geometry, material );
  var modelGlow = new THREE.Mesh( geometryGlow  , materialGlow );

  for( i = 0; i < model.geometry.vertices.length; i = i + 3 ) {

    model.geometry.vertices[i].x += THREE.Math.randFloatSpread( m );
    model.geometry.vertices[i].y += THREE.Math.randFloatSpread( m );
    model.geometry.vertices[i].z += THREE.Math.randFloatSpread( m );
  }

  for( i = 0; i < modelGlow.geometry.vertices.length; i = i + 3 ) {
    modelGlow.geometry.vertices[i].x += THREE.Math.randFloatSpread( 1.5*m );
    modelGlow.geometry.vertices[i].y += THREE.Math.randFloatSpread( 1.5*m );
    modelGlow.geometry.vertices[i].z += THREE.Math.randFloatSpread( 1.5*m );
  }

  model.position.x = 0;
  model.position.y = 0;
  model.position.z = 0;

  modelGlow.position.x = 0;
  modelGlow.position.y = 0;
  modelGlow.position.z = 0;

  model.add(modelGlow);
  var p = new planet(1, [0,0,0], [model.position.x, model.position.y, model.position.z], model);

  system.push(p);
  p.add2scene(scene);

  console.log('Added sun');
}

function sunSpin() {
	system[0].model.rotateX(0.01);
  system[0].model.rotateY(0.003);
}
