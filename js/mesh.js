
// PLANET
function addModel( x, y, z ) {

  var r = THREE.Math.randFloat( 3, 10 );
  var m = r/5;
  var matColor = Math.random() * 0xffffff;

  // CREATE SPHERE
  var geometry = new THREE.IcosahedronGeometry( r, 1 );

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

  scene.add( model );


  // CREATE RINGS
  if(THREE.Math.randInt(1, 3) == 3) {

    var radTorus = r + THREE.Math.randFloat(1, 1.3);
    var colorRing = Math.random()*0xffffff;
    
    var geometryTorus = new THREE.TorusGeometry(radTorus, 0.5, 3, 11);
    geometryTorus.rotateX(Math.random()*(3.14/2.5));
    var materialRing = new THREE.MeshPhongMaterial({color: colorRing});
    var torus = new THREE.Mesh( geometryTorus, materialRing );
    model.add(torus);

  }


  model.position.x = x;
  model.position.y = y;
  model.position.z = z;

  console.log( x ,y ,z );

  // CREATE PLANET
  var p = new planet(2, [0,0,0], [x,y,z], model);
  p.add2scene(scene);


  system.push(p);
  console.log('Added planet');
}

// SUN
function addSun() {

  var r = 20;
  var m = r/5;

  var geometry = new THREE.IcosahedronGeometry( r, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
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

  model.add( modelGlow );
  scene.add( model );
  system.push(model);

  console.log('Added sun');
}
