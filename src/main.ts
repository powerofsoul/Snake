import THREE = require('three');
import { GameWindow } from "./GameWindow";
import { Snake } from "./Snake";
import { InputEvent, EventType } from "./EventSubscriber"

export class Game {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer = new THREE.WebGLRenderer();
    mesh = new THREE.Mesh();
    gameSpeed:number = 10;

    constructor() {
        this.init();
    }

    init() {

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, GameWindow.width / GameWindow.height, 1, 10000);
        this.camera.position.z = 1000;

        var snake = new Snake(new THREE.Vector3(0, 0, 0), "white");

        this.scene.add(snake.getMesh());

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(GameWindow.width, GameWindow.width);
        document.body.appendChild(this.renderer.domElement);
        new InputEvent(EventType.CLICK,()=> snake.body.addTail(this.scene));
        this.renderer.render(this.scene, this.camera);
        
        this.render(snake);
    }

    render(s: Snake) {
        s.move(this.gameSpeed);
        this.renderer.render (this.scene,this.camera);
        requestAnimationFrame(e => { this.render(s) }); 
    }

}
function StartGame() {
    var m = new Game();
}
window.onload = StartGame;
