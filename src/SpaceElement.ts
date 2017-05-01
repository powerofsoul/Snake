import THREE = require("three");

export enum Directions{
    UP,DOWN,LEFT,RIGHT
}

export class SpaceElement extends THREE.Mesh {
    public move(direction:Directions,amount:number) {
        switch(direction){
            case Directions.UP:
                this.position.y += amount;
            break;
            case Directions.RIGHT:
                this.position.x +=amount;
            case Directions.LEFT:
                this.position.x -= amount;
            case Directions.DOWN:
                this.position.y = amount;      
        }
    }
    constructor(geometry: THREE.Geometry, material:THREE.Material){
        super(geometry,material);
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
        super(new THREE.BoxGeometry(width, height, 0) , new THREE.MeshBasicMaterial({ color: color }));
        this.width = width;
        this.height = height;
        this.position.set(position.x,position.y,position.z);
    }
}