import THREE = require('three');
import { GameWindow } from "./GameWindow";
import { Snake } from "./Snake";
import { InputEvent, EventType } from "./EventSubscriber"

export class Game {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer = new THREE.WebGLRenderer();
    mesh = new THREE.Mesh();


    constructor() {
        this.init();
    }

    init() {

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, GameWindow.width / GameWindow.height, 1, 10000);
        this.camera.position.z = 1000;

        var s = new Snake(new THREE.Vector2(12, 0), "white");

        this.scene.add(s.getMesh());

        new InputEvent(EventType.RIGHT, () => console.log("right"));
        new InputEvent(EventType.LEFT, () => console.log("left"));
        new InputEvent(EventType.UP, () => console.log("up"));
        new InputEvent(EventType.DOWN, () => console.log("down"));
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(GameWindow.width, GameWindow.width);
        document.body.appendChild(this.renderer.domElement);

        this.renderer.render(this.scene, this.camera);
    }

}
function StartGame() {
    var m = new Game();
}
window.onload = StartGame;