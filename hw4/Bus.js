import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OBJLoader} from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/OBJLoader.js";
import {MTLLoader} from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/MTLLoader.js";
import {scene} from "./init.js"

var bus;

function Bus(){
	var object;
	var mtlLoader = new MTLLoader();
	mtlLoader.setPath("./bus/");
	
    mtlLoader.load("bus.mtl", function(materials){
        materials.preload();
        console.log(materials);
        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./bus/')
        objLoader.load('bus.obj', function(object){
            console.log(object);
			object.scale.set(20, 20, 20);
			
			bus=object;
			bus.position.y=25;
			bus.rotation.y=Math.PI/2;
            scene.add(bus);
        });
    });
	
}

export{Bus,bus}