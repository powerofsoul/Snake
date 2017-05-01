import { List } from "./Utils"
import THREE = require('three');
import {BodyGeometry, Directions} from "./SpaceElement";

class Head extends BodyGeometry {

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
