import { List, getRandomInt } from "./Utils"
import THREE = require('three');
import { BodyGeometry, Direction } from "./SpaceElement";
import { InputEvent, EventType, MoveEvent } from "./EventSubscriber"
import { GameElement } from "./GameElement";
import { Game } from "./main"

class Head extends BodyGeometry {
    moveEvent: MoveEvent;
    score: number;
    lives: number;

    constructor(startPosition: THREE.Vector3, color: string, moveEvent: MoveEvent, width: number = 30, height: number = 30) {
        super(color, startPosition, width, height, Direction.UP);
        this.moveEvent = moveEvent;
    }

    public checkCollision(): THREE.Mesh[] {
        var found: THREE.Mesh[] = [];

        Game.gameWindow.getMeshes().forEach(item => {
            if (item != this && this.isColiding(item)) {
                found.push(item);
            }
        })

        return found;
    }
}

class Body {
    head: Head;
    bodyParts: List<BodyGeometry>;

    constructor(startPosition: THREE.Vector3, color: string) {
        this.head = new Head(
            startPosition,
            color,
            new MoveEvent(
                new InputEvent(EventType.UP, () =>
                    this.head.facedDirection = this.head.facedDirection != Direction.DOWN || this.bodyParts.size == 1 ? Direction.UP : Direction.DOWN
                ),
                new InputEvent(EventType.DOWN, () =>
                    this.head.facedDirection = this.head.facedDirection != Direction.UP || this.bodyParts.size == 1 ? Direction.DOWN : Direction.UP
                ),
                new InputEvent(EventType.RIGHT, () =>
                    this.head.facedDirection = this.head.facedDirection != Direction.LEFT || this.bodyParts.size == 1 ? Direction.RIGHT : Direction.LEFT
                ),
                new InputEvent(EventType.LEFT, () =>
                    this.head.facedDirection = this.head.facedDirection != Direction.RIGHT || this.bodyParts.size == 1 ? Direction.LEFT : Direction.RIGHT
                )
            ));
        this.bodyParts = new List<BodyGeometry>();
        this.bodyParts.add(this.head);
    }

    public getMesh() {
        var meshes: THREE.Mesh[] = [];
        meshes.push(this.head);
        this.bodyParts.forEach(item => meshes.push(item));

        return meshes;
    }

    public move(speed: number) {

        var newPos = new THREE.Vector3().setFromMatrixPosition(this.head.matrixWorld);
        this.head.move(speed);
        if (this.head.position.x > Game.gameWindow.width) {
            this.head.position.set(-this.head.position.x + 3, this.head.position.y, 0);
            this.head.facedDirection = Direction.RIGHT;
        }
        else if (this.head.position.x < -Game.gameWindow.width) {
            this.head.position.set(-this.head.position.x, this.head.position.y, 0);
            this.head.facedDirection = Direction.LEFT;
        }

        if (this.head.position.y > Game.gameWindow.height - Game.gameWindow.infoAreaHeight) {
            this.head.position.set(this.head.position.x, -Game.gameWindow.height, 0);
            this.head.facedDirection = Direction.UP;
        }
        if (this.head.position.y < -Game.gameWindow.height) {
            this.head.position.set(this.head.position.x, Game.gameWindow.height - Game.gameWindow.infoAreaHeight, 0);
            this.head.facedDirection = Direction.DOWN;
        }
        var lastPos = newPos;
        for (var i = 1; i < this.bodyParts.size; i++) {
            lastPos = new THREE.Vector3().setFromMatrixPosition(this.bodyParts.getAt(i).matrixWorld);
            this.bodyParts.getAt(i).position.set(newPos.x, newPos.y, newPos.z);
            newPos = lastPos;
        }
    }

    public addTail(scene: THREE.Scene) {
        var lastBodyPart = this.bodyParts.last();
        var newPosition = new THREE.Vector3().setFromMatrixPosition(lastBodyPart.matrixWorld);
        this.bodyParts.add(new BodyGeometry("red", newPosition, 30, 30, lastBodyPart.facedDirection));
        scene.add(this.bodyParts.last());
    }
}

export class Snake implements GameElement {
    body: Body;

    constructor(startPostion: THREE.Vector3, color: string) {
        this.body = new Body(startPostion, color);
    }

    public getMesh() {
        return this.body.getMesh();
    }

    public move(speed: number) {
        this.body.move(speed);
    }

    public action() {
        this.move(Game.gameSpeed);
        var collisionItems = this.body.head.checkCollision();
        if (collisionItems.length > 0) {
            collisionItems.forEach(element => {
                if (element.name == "point") {
                    Game.gameWindow.updateScore(++Game.score);
                    Game.gameSpeed = Game.score < 25 ? Game.score/5 + 5 : 25;
                    this.body.addTail(Game.gameWindow.scene);
                    element.position.set(
                        getRandomInt(0, Game.gameWindow.width),
                        getRandomInt(0, Game.gameWindow.height - Game.gameWindow.infoAreaHeight)
                        , 0
                    );
                }
                else {
                    for(var i=0;i<=12;i++)
                        if(this.body.bodyParts.getAt(i)==element)
                            return;
                    
                    Game.highScore = Game.score > Game.highScore ? Game.score : Game.highScore;
                    Game.gameWindow.updateScore(0);
                    Game.score = 0;
                    Game.gameSpeed = 5;
                    Game.gameWindow.updateHighScore(Game.highScore);
                    Game.gameWindow.resetMap();
                    this.body.head.position.set(0, 0, 0);
                    this.body.bodyParts.forEach((element) => Game.gameWindow.scene.remove(element));
                    this.body.bodyParts.clear();
                    this.body.bodyParts.add(this.body.head);
                }
            });

        }
    }
}
