import THREE = require("three");
import { List } from "./Utils";
import { GameElement } from "./GameElement"

export class GameWindow {
    public static width: number = 500;
    public static height: number = 500;

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer = new THREE.WebGLRenderer();
    mesh = new THREE.Mesh();

    gameElements: List<GameElement> = new List<GameElement>();

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, GameWindow.width / GameWindow.height, 1, 10000);
        this.camera.position.z = 1000;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(GameWindow.width, GameWindow.width);

        document.body.appendChild(this.renderer.domElement);

        this.renderer.render(this.scene, this.camera);
        this.render();
    }


    public AddToWindow(element: GameElement ) {
        this.scene.add(element.getMesh());
        this.gameElements.add(element);
    }

    render() {
        this.gameElements.forEach((gameElement)=> gameElement.action());
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(e => { this.render() });
    }
}
