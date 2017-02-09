
// PLANET
function addModel( x, y, z ) {

  var r = THREE.Math.randFloat( 1.5, 3 );
  var m = r/5;
  var matColor = Math.random() * 0xffffff;

  /** CREATE SPHERE **/
  var geometry = new THREE.IcosahedronGeometry( r, 1 );

  for ( var i = 0; i < geometry.faces.length; i = i + 3 ) {
		geometry.faces[i].color.setHex( matColor + m );
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


  /** CREATE RINGS **/
  if(THREE.Math.randInt(1, 3) == 3) {
    var inner = r + THREE.Math.randFloat(0.8, 1.2);
    var outer = inner + THREE.Math.randFloat(1, 1.3);
    var colorRing = Math.random()*0xffffff;


    var geometryRing = new THREE.RingGeometry( inner, outer, 50 );
    var materialRing = new THREE.MeshBasicMaterial( { color: colorRing, transparent: true, opacity: 0.6, side: THREE.DoubleSide} );
    materialRing.side = THREE.DoubleSide;
    var rings = new THREE.Mesh( geometryRing, materialRing );
    rings.rotateX(3.14/2.5);

    model.add(rings);
  }


  model.position.x = x;
  model.position.y = y;
  model.position.z = z;



  /*** CREATE PLANET ***/
  var p = new planet(2, [0,0,0], [0,0,0], model);
  console.log(system);
  p.add2scene(scene);

  if(system.length > 8) {
    scene.remove(system[0].model);
    system.shift();
  }
  system.push(p);
}
