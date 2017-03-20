// ADDS A PLANET
function addPlanet() {

  var radius = THREE.Math.randFloat( 3, 10 );
  var irregularity = 1;
  var mass = THREE.Math.randFloat( 3, 10 );

  var startPosition = new THREE.Vector3().copy( camera.position );
  var tmp = new THREE.Vector3().copy(startPosition);
  tmp.negate().normalize().multiplyScalar(20);
  startPosition.add(tmp);

  var geometry = new THREE.IcosahedronGeometry( radius, 1 );

  var color = getColor();

  for ( var i = 0; i < geometry.faces.length; i = i + 3 ) {
    geometry.faces[i].color = color;
  }

  var material = new THREE.MeshPhongMaterial( { color: color, vertexColors: THREE.VertexColors } );
  material.shading = THREE.FlatShading;

  var model = new THREE.Mesh( geometry, material );

  for( i = 0; i < model.geometry.vertices.length; i = i + 3 ) {
    model.geometry.vertices[i].add( new THREE.Vector3(THREE.Math.randFloatSpread( irregularity ),
    THREE.Math.randFloatSpread( irregularity ),THREE.Math.randFloatSpread( irregularity )));
  }

  if ( Math.random() < 0.2 ) {
    model.add(createRing( radius ));
  }

  var p = new planet( mass, initialVelocity( mass, startPosition ), startPosition, model, addLine( startPosition, color));

  system.push(p);
  scene.add(model);

  console.log('Planet ' + system.length + ' created');
}

// CREATES A RING
function createRing( radiusPlanet ){

  var radiusRing = radiusPlanet + THREE.Math.randFloat(8, 12);
  var thicknessRing = THREE.Math.randFloat(1.7, 2.3);
  var colorRing = getColor();

  var geometryRing = new THREE.TorusGeometry(radiusRing, thicknessRing, 3, 11);

  var materialRing = new THREE.MeshPhongMaterial({color: colorRing});
  var ring = new THREE.Mesh( geometryRing, materialRing );
  ring.scale.set(1,1,0.2);
  ring.rotateX(3.14/2.3);
  ring.rotateY( THREE.Math.randFloatSpread(1) );
  ring.rotateZ( THREE.Math.randFloatSpread(1) );

  return ring;
}

// ADD THE SUN
function addSun() {

  var radius = 20;
  var irregularity = 1;
  var mass = 500;

  var geometry = new THREE.IcosahedronGeometry( radius, 1 );
  var material = new THREE.MeshPhongMaterial( { color: 0xffff2d } );
  material.shading = THREE.FlatShading;

  var model = new THREE.Mesh( geometry, material );

  for( i = 0; i < model.geometry.vertices.length; i = i + 3 ) {
    model.geometry.vertices[i].add( new THREE.Vector3(THREE.Math.randFloatSpread( irregularity ),
    THREE.Math.randFloatSpread( irregularity ),THREE.Math.randFloatSpread( irregularity )));
  }

  addSunShine( radius );

  var p = new planet(mass, new THREE.Vector3(), new THREE.Vector3(), model, addLine(new THREE.Vector3(), 0xffff2d));
  system.push(p);
  scene.add(model);

  console.log('Sun ' + system.length + ' created');
}

function addSunShine( radiusSun ) {

  var radius = radiusSun + 4;
  var transparency = 0.1;
  var irregularity = 8;
  var geometry = new THREE.IcosahedronGeometry( radius, 3 );
  var material = new THREE.MeshBasicMaterial( { color: 0xff772d, transparent: true, opacity: transparency, side: THREE.DoubleSide} );	//0xea812a tyckte jag blev för brun

  sunShine = new THREE.Mesh( geometry  , material );
  sunShine.shading = THREE.FlatShading;

  for( i = 0; i < sunShine.geometry.vertices.length; i = i + 3 ) {
    sunShine.geometry.vertices[i].add( new THREE.Vector3(THREE.Math.randFloatSpread( irregularity ),
    THREE.Math.randFloatSpread( irregularity ),THREE.Math.randFloatSpread( irregularity )));
  }

  scene.add(sunShine);
}

function sunShinePulse() {

  sunShine.rotateX(0.003);
  sunShine.rotateY(0.003);
  sunShine.rotateZ(0.003);
}

function updateLine( n, c ) {

  var verticesLine = system[n].line.geometry.vertices;
  verticesLine.push( system[n].position );

  var length = system[n].position.distanceTo(new THREE.Vector3());

  if( verticesLine.length > length/1.8 ) {
    verticesLine.shift();
  }

  var opacityYesorNo = 0.5;
  if(!hideShowToggle){
    opacityYesorNo = 0;
  }

  var materialLine = new THREE.LineBasicMaterial({
    color: c, transparent: true, opacity: opacityYesorNo
  });

  var geometryLine = new THREE.Geometry();
  geometryLine.vertices = verticesLine;

  scene.remove(system[n].line);
  system[n].line = new THREE.Line( geometryLine, materialLine );
  scene.add( system[n].line );
}

function addLine( s, c ) {

  var material = new THREE.LineBasicMaterial({
    color: c, transparent: true, opacity: 0.5
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    s
  );

  var line = new THREE.Line( geometry, material );
  scene.add( line );

  return line;
}

function getColor() {

  var white = THREE.Math.randInt(0, 2);
  var red = Math.floor(THREE.Math.randFloat(0, 255));
  var green = Math.floor(THREE.Math.randFloat(0, 255));
  var blue  = Math.floor(THREE.Math.randFloat(0, 255));
  var colors = [red, green, blue];
  colors[white] = 255;

  return new THREE.Color("rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")");
}
