import { List } from "./Utils"
import THREE = require('three');
import {SpaceElement, Directions} from "./SpaceElement";

interface IBodyPart {
    width: number;
    height: number;
}

class BodyGeometry extends SpaceElement implements IBodyPart {
    width: number;
    height: number;


    constructor(color: string, position: THREE.Vector3, width: number, height: number) {
        super(new THREE.BoxGeometry(width, height, 0) , new THREE.MeshBasicMaterial({ color: color }));
        this.width = width;
        this.height = height;
        this.position.set(position.x,position.y,position.z);
    }
}

class Head extends BodyGeometry implements IBodyPart {

    constructor(startPosition: THREE.Vector3, color: string, width: number = 30, height: number = 30) {
        super(color, startPosition, width, height);
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

    public move(){
        this.bodyParts.forEach((item) => item.move(Directions.UP,10));
    }
}

export class Snake{
    body: Body;
    constructor(startPostion: THREE.Vector3, color: string) {
        this.body = new Body(startPostion, color);
    }

    public getMesh() {
        return this.body.getMesh();
    }

    public move(){
        this.body.move();
    }
}
