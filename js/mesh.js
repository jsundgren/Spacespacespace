// RINGS
function addRing(radiusIn, radiusOut, planet, colorRing) {

  var geometryRing = new THREE.RingGeometry( radiusIn, radiusOut, 50 );
  var materialRing = new THREE.MeshBasicMaterial( { color: colorRing, transparent: true, opacity: 0.6, side: THREE.DoubleSide} );
  materialRing.side = THREE.DoubleSide;
  var rings = new THREE.Mesh( geometryRing, materialRing );
  rings.rotateX(3.14/2.5);

  rings.position.x = planet.position.x;
  rings.position.y = planet.position.y;
  rings.position.z = planet.position.z;

  scene.add(rings);
}

// PLANET
function addModel( x, y, z ) {

  var r = THREE.Math.randFloat( 3, 10 );
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

  console.log( x ,y ,z );

  if( THREE.Math.randInt( 1, 3 ) == 3 ) {

    var inner = r + THREE.Math.randFloat( 0.8, 1.2 );
    var outer = inner + THREE.Math.randFloat( 1, 1.3 );

    addRing( inner, outer, model, Math.random()*0xffffff);
  }
}

// SUN
function addSun( ) {

  var r = 20;
  var m = r/5;

  var geometry = new THREE.IcosahedronGeometry( r, 1 );
  var material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
  material.shading = THREE.FlatShading;

  var model = new THREE.Mesh( geometry, material );

  for( i = 0; i < model.geometry.vertices.length; i = i + 3 ) {
    model.geometry.vertices[i].x += THREE.Math.randFloatSpread( m );
    model.geometry.vertices[i].y += THREE.Math.randFloatSpread( m );
    model.geometry.vertices[i].z += THREE.Math.randFloatSpread( m );
  }

  model.position.x = 0;
  model.position.y = 0;
  model.position.z = 0;

  scene.add( model );

  console.log('added sun');
}
