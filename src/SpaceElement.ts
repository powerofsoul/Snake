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