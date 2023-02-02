import './style.css';

// import computer_model from './resources/models/computer.gltf';
// import computer_glow_model from './resources/models/computer_glow.gltf'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
//import { SelectiveBloomEffect } from 'postprocessing';

//
//    INIT
//

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const camera = new THREE.OrthographicCamera(4, innerWidth / innerHeight, 1, 10000);

renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.x = -40;
camera.position.y = 27;
camera.position.z = 235;

// Better Lighting
// const pmremGenerator = new THREE.PMREMGenerator( renderer );
// scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

// Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );

//
//    MODEL LOADER
//

const loader = new GLTFLoader();

loader.load('./resources/models/computer.gltf', function (gltf) {
		scene.add( gltf.scene );
	},
	function ( xhr ) {}, // loading
	function ( error ) { console.log( error ); } // error loading
);
loader.load('./resources/models/computer_glow.gltf', function (gltf) {
	  scene.add( gltf.scene );
  },
  function ( xhr ) {}, // loading
  function ( error ) { console.log( error ); } // error loading
);

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
})

renderer.setAnimationLoop(() => {
	controls.update();
	renderer.render(scene, camera);
});