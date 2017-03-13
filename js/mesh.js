// ADDS A PLANET
function addPlanet() {

  var radius = THREE.Math.randFloat( 3, 10 );
  var irregularity = 1;
  //var color = Math.random() * 0xffffff;
  var mass = THREE.Math.randFloat( 3, 10 );

  var spread = 30;
  var range = 1;

  var startPosition = new THREE.Vector3().copy( camera.position );
  var tmp = new THREE.Vector3().copy(startPosition);
  tmp.negate().normalize().multiplyScalar(20);
  startPosition.add(tmp);

  var geometry = new THREE.IcosahedronGeometry( radius, 1 );

  // ÄNDRA TILL PASTELL-FÄRGSKALA
    /*for ( var i = 0; i < geometry.faces.length; i = i + 3 ) {
    geometry.faces[i].color.setHex( color );
  }*/

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

// CREATES A RING (MINSKA ANTALET RINGAR?)
function createRing( radiusPlanet ){

  var radiusRing = radiusPlanet + THREE.Math.randFloat(8, 12);
  var thicknessRing = THREE.Math.randFloat(1.7, 2.3);
  var colorRing = getColor();

  var geometryRing = new THREE.TorusGeometry(radiusRing, thicknessRing, 3, 11);

  var materialRing = new THREE.MeshPhongMaterial({color: colorRing});
  var ring = new THREE.Mesh( geometryRing, materialRing );
  ring.scale.set(1,1,0.2);
  ring.rotateX(3.14/2.3) + THREE.Math.randFloatSpread(1);
  ring.rotateY( THREE.Math.randFloatSpread(1) );
  ring.rotateZ( THREE.Math.randFloatSpread(1) );

  return ring;
}

// ADD THE SUN
function addSun() {

  var radius = 20;
  var irregularity = 1;
  var mass = 180;

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

  var radius = radiusSun + 2;
  var transparency = 0.1;
  var irregularity = 10;

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

function sunShinePulse( radiusSun ) {

  sunShine.rotateX(0.003);
  sunShine.rotateY(0.003);
  sunShine.rotateZ(0.003);
}

//	This function retuns a lesnflare THREE object to be scene.add()ed to the scene graph
function addLensFlare(){
  var flareColor = new THREE.Color( 0xffffff );

  var textureLoader = new THREE.TextureLoader();
  var overrideImage = textureLoader.load("http://www.freeiconspng.com/uploads/lens-flares-png-jpeg-54-lens-flares-36-30.png" );
  //var textureFlare1 = textureLoader.load("../img/gfxcave_lensflares/lensflare_10_gfxcave.jpg"); //lägg till annan texture 
  //var textureFlare2 = textureLoader.load("../img/gfxcave_lensflares/lensflare_10_gfxcave.jpg"); //lägg till annan texture 
  
  var lensFlare = new THREE.LensFlare( overrideImage, 700, 0.0, THREE.AdditiveBlending, flareColor );

  //	we're going to be using multiple sub-lens-flare artifacts, each with a different size
  //lensFlare.add( textureFlare1, 4096, 0.0, THREE.AdditiveBlending, flareColor);
  //lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending, flareColor);
  //lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending, flareColor);
  //lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending, flareColor);

  //	and run each through a function below
  lensFlare.customUpdateCallback = lensFlareUpdateCallback;
  lensFlare.position.copy( system[0].position );
  lensFlare.size = 16000 ;
  scene.add(lensFlare);
}

//	this function will operate over each lensflare artifact, moving them around the screen
function lensFlareUpdateCallback( object ) {
  var f, fl = this.lensFlares.length;
  var flare;
  var vecX = -this.positionScreen.x * 2;
  var vecY = -this.positionScreen.y * 2;
  var size = object.size ? object.size : 16000;

  var camDistance = camera.position.length();

  for( f = 0; f < fl; f ++ ) {
    flare = this.lensFlares[ f ];

    flare.x = this.positionScreen.x + vecX * flare.distance;
    flare.y = this.positionScreen.y + vecY * flare.distance;

    flare.scale = size / camDistance;
    flare.rotation = 0;
  }
}

function updateLine( n, c ) {

  var verticesLine = system[n].line.geometry.vertices;
  verticesLine.push( system[n].position );

  var materialLine = new THREE.LineBasicMaterial({
    color: c
  });

  var geometryLine = new THREE.Geometry();
  geometryLine.vertices = verticesLine;

  scene.remove(system[n].line);

  system[n].line = new THREE.Line( geometryLine, materialLine );

  scene.add( system[n].line );

  //lines[n-1].geometry.verticesNeedUpdate = true;
}

function addLine( s, c ) {

  var material = new THREE.LineBasicMaterial({
    color: c
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
  	s
  );

  var line = new THREE.Line( geometry, material );
  scene.add( line );

  return line;
}
