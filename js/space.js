function init() {
	/****** CREATE SCENE AND CAMERA *********/
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			camera.position.set(0, 0, -40);

			camera.position.z = 30;*/
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

	/****** LIGHT SOURCES *********/
			var flashlight = new THREE.PointLight(0xffffff, 1, 100);
			flashlight.target = camera;
			flashlight.position.copy(camera.position);
			scene.add(flashlight);

			scene.add(new THREE.AmbientLight(0x404040));


			/*var spotLight       = new THREE.SpotLight( 0xffffff );
			 spotLight.position.set( 10, 10, 10 );
			 scene.add( spotLight );

			 var light           = new THREE.AmbientLight( 0x404040 );
			 scene.add( light );*/


    /****** SUN *********/
			var geometry = new THREE.SphereGeometry( 2, 8, 6 );

			var material = new THREE.MeshPhongMaterial( {color: 0x2194ce} );
            material.shading = THREE.FlatShading;
			var sphere = new THREE.Mesh( geometry, material );
			scene.add( sphere );

            console.log(sphere);

            /*ELINS BAJS
            for(i=6; i < sphere.geometry.vertices.length; i=i+3) {
                sphere.geometry.vertices[i].x = sphere.geometry.vertices[i].x + Math.floor((Math.random() * 10) + 1)/10;
            }
            sphere.VerticesNeedUpdate = true;*/


	/******* RINGS *********/

            function addRing(radiusIn, radiusOut, planet, colorRing) {
			var geometryRing = new THREE.RingGeometry( radiusIn, radiusOut, 50 );
			var materialRing = new THREE.MeshBasicMaterial( { color: colorRing, transparent: true, opacity: 0.6, side: THREE.DoubleSide} );
			materialRing.side = THREE.DoubleSide;
			var rings = new THREE.Mesh( geometryRing, materialRing );
			planet.add(rings);
			}

			addRing(3, 3.1, sphere, 0x009999);
			addRing(3.5, 4, sphere, 0x009999);



    /****** ORBIT CONTROLS *********/
			var controls = new THREE.OrbitControls(camera, renderer.domElement);

			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = true;

			controls.minDistance = 10;
			controls.maxDistance = 60;



	//updatera så att ljuset följer kameran
			controls.addEventListener('change', light_update)

			function light_update() {
				flashlight.position.copy(camera.position);
				}

			function onWindowResize() {
					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();
					renderer.setSize( window.innerWidth, window.innerHeight );
				}

	/****** RENDER FUNCTION *********/
			var render = function () {
				requestAnimationFrame( render );
				controls.update();

				sphere.rotation.x += 0.0049;
				sphere.rotation.y += 0.005;

				renderer.render(scene, camera);
			};

			window.addEventListener( 'resize', onWindowResize, false );
			render();
	}
