import { List } from "./Utils"
import THREE = require('three');
export namespace Snake {

    interface BodyPart {
        imageLocation: string;
        width: number;
        height: number;

        position: THREE.Vector2;
    }

    class Head implements BodyPart {
        imageLocation: string;
        width: number;
        height: number;
        position: THREE.Vector2;

        constructor(startPosition: THREE.Vector2, imageLocation: string="images/head.png", width: number = 30, height: number = 30) {
            this.imageLocation = imageLocation;
            this.position = startPosition;
            this.width = width;
            this.height = height;
        }
    }

    class Body {
        head: Head;
        bodyParts: List<BodyPart>;

        constructor(startPosition:THREE.Vector2){
            this.head= new Head(startPosition);
            this.bodyParts = new List<BodyPart>()
        }
    }

}