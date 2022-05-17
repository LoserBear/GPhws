import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {Bus,bus} from './Bus.js';
import {Agent} from './Agent.js';
import {Steve} from './Steve.js';


var renderer, scene, camera;
var texture;
var steve,agent;
var raycaster;
var pickables = [];
var puck;
var clock = new THREE.Clock();
var mouse = new THREE.Vector2();
var Load = false;

function init () {
	
	renderer = new THREE.WebGLRenderer();
	document.body.appendChild (renderer.domElement);
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize (width, height);
	
	renderer.setClearColor (0x666666);
	document.body.appendChild(renderer.domElement);
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera (45, width/height, 1, 1000000);
	camera.position.z = 500;
	camera.position.y = 500;
	let controls = new OrbitControls(camera, renderer.domElement);
	controls.enableKeys = false;
	
	var loader = new THREE.TextureLoader();
	loader.setCrossOrigin('');
	texture = loader.load ('https://i.imgur.com/XY4novd.png');
	
	
	var ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
	scene.add(ambientLight);
	
	Bus();
	
	steve=new Steve(4,12);
	steve.buildDoll();
	
	
	
	puck = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 2, 20), new THREE.MeshBasicMaterial({
		color: 'yellow',
		transparent: true,
		opacity: 0.3
	}));
	scene.add(puck);
	
	raycaster = new THREE.Raycaster();
	document.addEventListener('pointerdown', onDocumentMouseDown, false);
	
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), new THREE.MeshBasicMaterial({
		color: 'black',
		transparent: true,
		opacity: 0.5
	}));
	scene.add(plane);
	plane.rotation.x = -Math.PI / 2;
	pickables = [plane];	
	
}


function onWindowResize() {
  
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
	
}


function animate() {
	var dt = clock.getDelta();
	if(bus != undefined){
		if(!Load){
			agent = new Agent(new THREE.Vector3(0,0,0),bus);
			Load = true;
		}
			agent.update(dt);
			steve.update(dt,agent);
	}
	
	requestAnimationFrame(animate);
	render();
}


function render() {
	renderer.render(scene,camera);
}

function onDocumentMouseDown(event) {

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // find intersections
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(pickables);
  if (intersects.length > 0) {
    puck.position.copy(intersects[0].point);
    agent.setTarget(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z)
  }
}
export{scene, camera,texture,init,animate}