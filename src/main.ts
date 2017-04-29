import  THREE = require('three');

var scene: THREE.Scene;
var camera: THREE.PerspectiveCamera;
var renderer = new THREE.WebGLRenderer();
var geometry;
var material;
var mesh = new THREE.Mesh();

export class Game {
    constructor() {
        this.init();
    }

    init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;

        geometry = new THREE.BoxGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log(renderer);
        document.body.appendChild(renderer.domElement);
    }

    animate() {

        requestAnimationFrame(this.animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }
}
function StartGame(){
    var m = new Game();
}
window.onload = StartGame;