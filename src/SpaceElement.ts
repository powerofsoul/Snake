import THREE = require("three");
import { InputEvent, EventType } from "./EventSubscriber";
export enum Direction {
    UP, DOWN, LEFT, RIGHT
}

export class SpaceElement extends THREE.Mesh {
    public facedDirection: Direction;

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

    constructor(geometry: THREE.Geometry, material: THREE.Material, facedDirection: Direction) {
        super(geometry, material);
        if (facedDirection === undefined)
            this.facedDirection = Direction.UP;
        else
            this.facedDirection = Direction.DOWN;
    }
}

interface IBodyPart {
    width: number;
    height: number;
}

export class BodyGeometry extends SpaceElement implements IBodyPart {
    width: number;
    height: number;

    constructor(color: string, position: THREE.Vector3, width: number, height: number, facedDirection: Direction) {
        super(new THREE.BoxGeometry(width, height, 0), new THREE.MeshBasicMaterial({ color: color }), facedDirection);
        this.width = width;
        this.height = height;
        this.position.set(position.x, position.y, position.z);
    }
}