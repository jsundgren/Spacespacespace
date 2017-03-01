// ADDS A PLANET
function addPlanet() {

  var radiusMax = 10;
  var radiusMin = 3;
  var radius = THREE.Math.randFloat( radiusMin, radiusMax );
  var irregularity = 2;
  var spread = 30;
  var range = 3;
  var color = Math.random() * 0xffffff;
  var mass = 1;

  var startPosition = new THREE.Vector3().copy( camera.position );

  startPosition.divide( new THREE.Vector3( range, range, range ));
  startPosition.add( new THREE.Vector3( THREE.Math.randFloatSpread( spread ), THREE.Math.randFloatSpread( spread ), THREE.Math.randFloatSpread( spread )));

  var geometry = new THREE.IcosahedronGeometry( radius, 1 );

  for ( var i = 0; i < geometry.faces.length; i = i + 3 ) {
    geometry.faces[i].color.setHex( color );
  }

  var material = new THREE.MeshPhongMaterial( { color: color, vertexColors: THREE.VertexColors } );
  material.shading = THREE.FlatShading;

  var model = new THREE.Mesh( geometry, material );

  for( i = 0; i < model.geometry.vertices.length; i = i + 3 ) {
    model.geometry.vertices[i].x += THREE.Math.randFloatSpread( irregularity );
    model.geometry.vertices[i].y += THREE.Math.randFloatSpread( irregularity );
    model.geometry.vertices[i].z += THREE.Math.randFloatSpread( irregularity );
  }

  if ( Math.random() < 0.3 ) {
    model.add(createRing( radius ));
  }

  var p = new planet( mass, initialVelocity( mass, startPosition ), startPosition );
  system.push(p);
  scene.add(model);

  console.log('Planet ' + system.length + ' created');
}

// CREATES A RING
function createRing( radiusPlanet ){

  var radiusRing = radiusPlanet + THREE.Math.randFloat(3, 6);
  var thicknessRing = THREE.Math.randFloat(0.7, 1.3);
  var colorRing = Math.random() * 0xffffff;

  var geometryRing = new THREE.TorusGeometry(radiusRing, thicknessRing, 3, 11);
  geometryRing.rotateX(Math.random()*(3.14/2.5));
  var materialRing = new THREE.MeshPhongMaterial({color: colorRing});
  var ring = new THREE.Mesh( geometryRing, materialRing );

  return ring;
}

// ADD THE SUN
function addSun() {

  var radius = 20;
  var irregularity = 4;
  var irregularityGlow = 10;
  var radiusGlow = 25;
  var transparencyGlow = 0.1;
  var mass = 100;

  var geometry = new THREE.IcosahedronGeometry( radius, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff2d } );
  material.shading = THREE.FlatShading;

  var geometryGlow = new THREE.IcosahedronGeometry( radiusGlow, 3 );
  var materialGlow = new THREE.MeshBasicMaterial( { color: 0xea812a, transparent: true, opacity: transparencyGlow, side: THREE.DoubleSide} );
  materialGlow.shading = THREE.FlatShading;

  var model = new THREE.Mesh( geometry, material );
  var modelGlow = new THREE.Mesh( geometryGlow  , materialGlow );

  for( i = 0; i < model.geometry.vertices.length; i = i + 3 ) {
    model.geometry.vertices[i].x += THREE.Math.randFloatSpread( irregularity );
    model.geometry.vertices[i].y += THREE.Math.randFloatSpread( irregularity );
    model.geometry.vertices[i].z += THREE.Math.randFloatSpread( irregularity );
  }

  for( i = 0; i < modelGlow.geometry.vertices.length; i = i + 3 ) {
    modelGlow.geometry.vertices[i].x += THREE.Math.randFloatSpread( irregularityGlow );
    modelGlow.geometry.vertices[i].y += THREE.Math.randFloatSpread( irregularityGlow );
    modelGlow.geometry.vertices[i].z += THREE.Math.randFloatSpread( irregularityGlow );
  }

  model.add(modelGlow);
  var p = new planet(mass, new THREE.Vector3(), new THREE.Vector3());
  system.push(p);
  scene.add(model);

  console.log('Sun ' + system.length + ' created');
}

// SPINS THE SUN
function spinSun() {

}
