function init() {

			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );


    /****** SUN *********/
			var geometry = new THREE.SphereGeometry( 2, 8, 6 );
<<<<<<< Updated upstream
			var material = new THREE.MeshBasicMaterial( {color: 0x2194ce} );
=======
			var material = new THREE.MeshPhongMaterial( {color: 0x2194ce} );
            material.shading = THREE.FlatShading;
>>>>>>> Stashed changes
			var sphere = new THREE.Mesh( geometry, material );
			scene.add( sphere );

            console.log(sphere);

            /*ELINS BAJS
            for(i=6; i < sphere.geometry.vertices.length; i=i+3) {
                sphere.geometry.vertices[i].x = sphere.geometry.vertices[i].x + Math.floor((Math.random() * 10) + 1)/10;
            }
            sphere.VerticesNeedUpdate = true;*/


    /****** LIGHT SOURCES *********/
			var spotLight       = new THREE.SpotLight( 0xffffff );
			spotLight.position.set( 10, 10, 10 );
			scene.add( spotLight );

			var light           = new THREE.AmbientLight( 0x404040 );
			scene.add( light );

			camera.position.z = 30;

    /****** ORBIT CONTROLS *********/
			var controls = new THREE.OrbitControls(camera, renderer.domElement);

			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = true;

			controls.minDistance = 10;
			controls.maxDistance = 60;

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

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
