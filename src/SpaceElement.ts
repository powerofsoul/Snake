import THREE = require("three");
import { InputEvent, EventType } from "./EventSubscriber";
import {Game} from "./main";

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}

function DirectionToVector3(direction:Direction){
    switch(direction){
        case Direction.UP:
            return new THREE.Vector3(0,1,0);
        case Direction.DOWN:
            return new THREE.Vector3(0,-1,0);
        case Direction.LEFT:
            return new THREE.Vector3(0,-1,0);
        case Direction.RIGHT:
            return new THREE.Vector3(0,1,0);
    }
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

export class Collision{
    origin:THREE.Vector3;
    near:number;
    far:number;

    Cast(direction:Direction): THREE.Intersection[]{
        let raycaster = new THREE.Raycaster(this.origin,DirectionToVector3(direction),this.near ,this.far);
        return raycaster.intersectObjects(Game.gameWindow.scene.children);
    }

    constructor(origin: THREE.Vector3,near:number,far:number){
        this.origin = origin;
        this.near = near;
        this.far = far;
    }
}
