import THREE = require("three");
import { InputEvent, EventType } from "./EventSubscriber";
export enum Direction {
    UP, DOWN, LEFT, RIGHT
}

class MoveEvent {
    moveUpEvent: InputEvent;
    moveDownEvent: InputEvent;
    moveRightEvent: InputEvent;
    moveLeftEvent: InputEvent;

    constructor(moveUpEvent: InputEvent, moveDownEvent: InputEvent, moveRightEvent: InputEvent, moveLeftEvent: InputEvent) {
        this.moveUpEvent = moveUpEvent;
        this.moveDownEvent = moveDownEvent;
        this.moveRightEvent = moveRightEvent;
        this.moveLeftEvent = moveLeftEvent;
    }
}

export class SpaceElement extends THREE.Mesh {
    facedDirection: Direction;
    moveEvents: MoveEvent;

    public move(amount: number) {
        switch (this.facedDirection) {
            case Direction.UP:
                this.position.y += amount;
                break;
            case Direction.RIGHT:
                this.position.x += amount;
                break;
            case Direction.LEFT:
                this.position.x -= amount;
                break;
            case Direction.DOWN:
                this.position.y -= amount;
                break;
        }
    }

    constructor(geometry: THREE.Geometry, material: THREE.Material, facedDirection?: Direction) {
        super(geometry, material);
        if (facedDirection === undefined)
            this.facedDirection = Direction.UP;
        else
            this.facedDirection = Direction.DOWN;

        this.moveEvents = new MoveEvent(
            new InputEvent(EventType.UP, () => this.facedDirection = Direction.UP),
            new InputEvent(EventType.DOWN, () => this.facedDirection = Direction.DOWN),
            new InputEvent(EventType.RIGHT, () => this.facedDirection = Direction.RIGHT),
            new InputEvent(EventType.LEFT, () => this.facedDirection = Direction.LEFT),
        )
    }
}

interface IBodyPart {
    width: number;
    height: number;
}

export class BodyGeometry extends SpaceElement implements IBodyPart {
    width: number;
    height: number;

    constructor(color: string, position: THREE.Vector3, width: number, height: number) {
        super(new THREE.BoxGeometry(width, height, 0), new THREE.MeshBasicMaterial({ color: color }));
        this.width = width;
        this.height = height;
        this.position.set(position.x, position.y, position.z);
    }
}