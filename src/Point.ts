import { GameElement } from "./GameElement";
import { BodyGeometry,Direction } from "./SpaceElement";
import THREE= require("three");

export class Point extends BodyGeometry implements GameElement{
    getMesh(): THREE.Mesh[] {
        var meshes : THREE.Mesh[]= [];
        meshes.push(this);
        return meshes;
    }

    action(){

    }

    constructor(startPosition:THREE.Vector3,width:number,height:number,color:string){
        super(color,startPosition,width,height, Direction.UP);
        this.name = "point";
    }
}