import { List } from "./Utils"
import THREE = require('three');

interface IBodyPart {
    width: number;
    height: number;
    position: THREE.Vector2;
}

interface IBodyGeometry {
    geometry: THREE.BoxGeometry;
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh;
}

class BodyGeometry implements IBodyGeometry, IBodyPart {
    width: number;
    height: number;
    position: THREE.Vector2;
    geometry: THREE.BoxGeometry;
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh;

    constructor(color: string, position: THREE.Vector2, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.geometry = new THREE.BoxGeometry(width, height, 0);
        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}

class Head extends BodyGeometry implements IBodyPart {
    position: THREE.Vector2;

    constructor(startPosition: THREE.Vector2, color: string, width: number = 30, height: number = 30) {
        super(color, startPosition, width, height);
        this.position = startPosition;
    }
}

class Body {
    head: Head;
    bodyParts: List<IBodyPart>;

    constructor(startPosition: THREE.Vector2, color: string) {
        this.head = new Head(startPosition, color);
        this.bodyParts = new List<IBodyPart>()
    }

    public getMesh(){
        var meshes = new THREE.Group();
        meshes.add(this.head.mesh);
        return meshes;
    }
}

export class Snake {
    body: Body;
    constructor(startPostion: THREE.Vector2, color: string) {
        this.body = new Body(startPostion, color);
    }

    public getMesh(){
        return this.body.getMesh();
    }
}
