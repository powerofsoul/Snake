import THREE = require('three');
import { GameWindow } from "./GameWindow";
import { Snake } from "./Snake";
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

        camera = new THREE.PerspectiveCamera(75, GameWindow.width / GameWindow.height, 1, 10000);
        camera.position.z = 1000;

        var s = new Snake(new THREE.Vector2(12,0),"white");

        scene.add(s.getMesh());

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(GameWindow.width, GameWindow.width);
        document.body.appendChild(renderer.domElement);

        renderer.render(scene,camera);
    }

}
function StartGame() {
    var m = new Game();
}
window.onload = StartGame;