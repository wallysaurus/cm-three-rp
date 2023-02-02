import './style.css';
// import computer_model from './resources/models/computer.gltf';
// import computer_glow_model from './resources/models/computer_glow.gltf'
// import { SelectiveBloomEffect } from 'postprocessing';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';

const model_letter_r = './resources/models/computer.gltf';
const model_letter_r_glow = './resources/models/computer_glow.gltf'
const model_letter_y = './resources/models/y.gltf'
const model_letter_a = './resources/models/a.gltf'
const model_letter_n = './resources/models/n.gltf'

//
// SETUP
//

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const camera = new THREE.OrthographicCamera(-200, 200, 100, -100, 1, 1000);
//const camera = new THREE.PerspectiveCamera(4, innerWidth / innerHeight, 1, 10000);
const controls = new OrbitControls( camera, renderer.domElement );

renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//fullbright
const pmremGenerator = new THREE.PMREMGenerator( renderer );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

// var light1 = new THREE.PointLight( 0xffffff, 1, 100 );
// light1.position.set( 0, 0, 0 );
// scene.add( light1 );

// var light1Helper = new THREE.ArrowHelper( light1.position.clone().normalize(), light1.position, 10, 0xffff00 );
// scene.add( light1Helper );

// var light2 = new THREE.PointLight( 0xffffff, 1, 100 );
// light2.position.set( -5, -3, -3 );
// scene.add( light2 );

// var light2Helper = new THREE.ArrowHelper( light2.position.clone().normalize(), light2.position, 10, 0xffff00 );
// scene.add( light2Helper );

// var light3 = new THREE.PointLight( 0xffffff, 1, 100 );
// light3.position.set( -3, 3, 3 );
// scene.add( light3 );

// var light3Helper = new THREE.ArrowHelper( light3.position.clone().normalize(), light3.position, 10, 0xffff00 );
// scene.add( light3Helper );

// var light4 = new THREE.PointLight( 0xffffff, 1, 100 );
// light4.position.set( 5, -3, -3 );
// scene.add( light4 );

// var light4Helper = new THREE.ArrowHelper( light4.position.clone().normalize(), light4.position, 10, 0xffff00 );
// scene.add( light4Helper );

camera.position.x = -40;
camera.position.y = 27;
camera.position.z = 235;

const loader = new GLTFLoader();
const spread = 3;

//
// R
//
loader.load(model_letter_r, function (gltf) {
		scene.add( gltf.scene );
		gltf.scene.position.x += (spread*-1) * -5.5;

		mesh = gltf.scene.children.filter(function (child) { return child instanceof THREE.Mesh; })[0];
	},
	function ( xhr ) {},
	function ( error ) { console.log( error ); }
);
loader.load(model_letter_r_glow, function (gltf) {
		scene.add( gltf.scene );
		gltf.scene.position.x += (spread*-1) * -5.5;

		mesh = gltf.scene.children.filter(function (child) { return child instanceof THREE.Mesh; })[0];
	},
	function ( xhr ) {},
	function ( error ) { console.log( error ); }
);

//
// Y
//
const composer = new EffectComposer( renderer );
loader.load(model_letter_y, (gltf) => {
	// Add the mesh to the scene
	scene.add( gltf.scene );
	gltf.scene.position.x += (spread*-1) * -1.5;

	mesh = gltf.scene.children.filter(function (child) { return child instanceof THREE.Mesh; })[0];

	composer.addPass( new RenderPass( scene, camera ) );
	const effect1 = new ShaderPass( DotScreenShader );
	effect1.uniforms[ 'scale' ].value = 3;
	//composer.addPass( effect1 );

	const effect2 = new ShaderPass( RGBShiftShader );
	effect2.uniforms[ 'amount' ].value = 0.0015;
	//composer.addPass( effect2 );

},
function ( xhr ) {},
function ( error ) { console.log( error ); }
);

//
// A
//
loader.load(model_letter_a, function (gltf) {
		scene.add( gltf.scene );
		gltf.scene.position.x += (spread) * 1.5;

		mesh = gltf.scene.children.filter(function (child) { return child instanceof THREE.Mesh; })[0];
		mesh.material = new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: true});
	},
	function ( xhr ) {},
	function ( error ) { console.log( error ); }
);

// 
// N
//
loader.load(model_letter_n, function (gltf) {
		scene.add( gltf.scene );
		gltf.scene.position.x += (spread) * 5.5;

		mesh = gltf.scene.children.filter(function (child) { return child instanceof THREE.Mesh; })[0];
	},
	function ( xhr ) {},
	function ( error ) { console.log( error ); }
);

window.addEventListener('resize', () => {
 	//renderer.setSize(window.innerWidth, window.innerHeight);
	if (isOrthographicCamera(camera)) {
		camera.left = size.width / -2;
		camera.right = size.width / 2;
		camera.top = size.height / 2;
		camera.bottom = size.height / -2;
	} else {
		camera.aspect = size.width / size.height;
	}
	camera.updateProjectionMatrix();
})

renderer.setAnimationLoop(() => {
	controls.update();
	renderer.render(scene, camera);
	composer.render();
});