import { List } from "./Utils"
import THREE = require('three');
import { BodyGeometry, Direction } from "./SpaceElement";
import { InputEvent, EventType, MoveEvent } from "./EventSubscriber"
class Head extends BodyGeometry {
    moveEvent: MoveEvent;

    constructor(startPosition: THREE.Vector3, color: string, width: number = 30, height: number = 30) {
        super(color, startPosition, width, height, Direction.UP);
        this.moveEvent = new MoveEvent(
            new InputEvent(EventType.UP, () =>
                this.facedDirection = Direction.UP
            ),
            new InputEvent(EventType.DOWN, () =>
                this.facedDirection = Direction.DOWN
            ),
            new InputEvent(EventType.RIGHT, () =>
                this.facedDirection = Direction.RIGHT
            ),
            new InputEvent(EventType.LEFT, () =>
                this.facedDirection = Direction.LEFT
            )
        )
    }
}

class Body {
    head: Head;
    bodyParts: List<BodyGeometry>;

    constructor(startPosition: THREE.Vector3, color: string) {
        this.head = new Head(startPosition, color);
        this.bodyParts = new List<BodyGeometry>();
        this.bodyParts.add(this.head);
    }

    public getMesh() {
        var meshes = new THREE.Group();
        meshes.add(this.head);
        this.bodyParts.forEach(item => meshes.add(item));
        return meshes;
    }

    public move(speed:number) {
        
        var newPos = new THREE.Vector3().getPositionFromMatrix(this.head.matrixWorld);
        this.head.move(speed);
        var lastPos = newPos;
        for(var i=1;i<this.bodyParts.size;i++){
            lastPos = new THREE.Vector3().getPositionFromMatrix(this.bodyParts.getAt(i).matrixWorld);
            this.bodyParts.getAt(i).position.set(newPos.x,newPos.y,newPos.z);
            newPos = lastPos;
        }
    }

    public addTail(scene: THREE.Scene) {
        var lastBodyPart = this.bodyParts.last();

        switch (lastBodyPart.facedDirection) {
            case Direction.UP:
                var newPosition = new THREE.Vector3().getPositionFromMatrix(lastBodyPart.matrixWorld);
                newPosition.y -= 30;
                this.bodyParts.add(new BodyGeometry("red", newPosition, 30, 30, lastBodyPart.facedDirection));
                break;
            case Direction.DOWN:
                var newPosition = new THREE.Vector3().getPositionFromMatrix(lastBodyPart.matrixWorld);
                newPosition.y += 30;
                this.bodyParts.add(new BodyGeometry("red", newPosition, 30, 30, lastBodyPart.facedDirection));
                break;
            case Direction.RIGHT:
                var newPosition = new THREE.Vector3().getPositionFromMatrix(lastBodyPart.matrixWorld);
                newPosition.x -= 30;
                this.bodyParts.add(new BodyGeometry("red", newPosition, 30, 30, lastBodyPart.facedDirection));
                break;
            case Direction.LEFT:
                var newPosition = new THREE.Vector3().getPositionFromMatrix(lastBodyPart.matrixWorld);
                newPosition.x += 30;
                this.bodyParts.add(new BodyGeometry("red", newPosition, 30, 30, lastBodyPart.facedDirection));
                break;
        }

        scene.add(this.bodyParts.last());
    }
}

export class Snake {
    body: Body;
    constructor(startPostion: THREE.Vector3, color: string) {
        this.body = new Body(startPostion, color);
    }

    public getMesh() {
        return this.body.getMesh();
    }

    public move(speed:number) {
        this.body.move(speed);
    }
}
