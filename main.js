import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// Создание сцены
const scene = new THREE.Scene();
// field of view - масштаб сцены которая видна всегда,
// aspect ratio - почти всегда ширина деленная на высоту
// посление два аргумента это масштаб при меньше или больше которого соответственно объект пропадает
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Создание рендера и присвоение ему ширины и высоты окна
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const material2 = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry2 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry2, material2 );

// Создание куба + сетка в качестве материала необходимого цвета
const geometry = new THREE.BoxGeometry( 1, 1, 0.5 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );


scene.add( cube );
scene.add( line );
	
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}