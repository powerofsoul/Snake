import THREE = require("three");
import { List } from "./Utils";
import { GameElement } from "./GameElement"
import { MeshText2D, textAlign } from "three-text2d";
export class GameWindow {
    public width: number = 700;
    public height: number = 700;

    public infoAreaHeight: number = 200;

    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer = new THREE.WebGLRenderer();
    mesh = new THREE.Mesh();

    gameElements: List<GameElement> = new List<GameElement>();

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-this.width, this.width, this.height, -this.height, 1, 10000);
        this.camera.position.z = 1000;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);

        document.body.appendChild(this.renderer.domElement);
        this.drawBorder();
        this.createInfoArea(this.scene);
        this.renderer.render(this.scene, this.camera);
        this.render();
    }


    public AddToWindow(element: GameElement) {
        this.scene.add(element.getMesh());
        this.gameElements.add(element);
    }

    render() {
        this.gameElements.forEach((gameElement) => gameElement.action());
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(e => { this.render() });
    }

    drawBorder() {
        var material = new THREE.LineBasicMaterial({
            color: "red"
        });

        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(-this.width, -this.height, 0),
            new THREE.Vector3(-this.width, this.height - this.infoAreaHeight, 0),
            new THREE.Vector3(this.width, this.height - this.infoAreaHeight, 0),
            new THREE.Vector3(this.width, -this.height, 0),
            new THREE.Vector3(-this.width, -this.height, 0)
        );

        var line = new THREE.Line(geometry, material);
        this.scene.add(line);
    }
    scoreText: MeshText2D;
    highScoreText: MeshText2D;
    createInfoArea(scene: THREE.Scene) {
        this.scoreText = new MeshText2D("Score: 0", {
            align: textAlign.left,
            font: '75px Arial'
        });
        this.scoreText.position.set(-this.width, this.height - 100, 0);

        this.highScoreText = new MeshText2D("High Score: 0", {
            align: textAlign.right,
            font: '75px Arial'
        });
        this.highScoreText.position.set(this.width, this.height - 100, 0);
        
        scene.add(this.scoreText);
        scene.add(this.highScoreText);
    }

    updateScore(amount:number){
        this.scoreText.text = "Score:"+ amount;
    }

    updateHighScore(amount:number){
        this.highScoreText.text = "High Score:" + amount;
    }
}
