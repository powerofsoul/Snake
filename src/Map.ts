import { List, getRandomInt } from "./Utils";
var mapLayoutsJson = require("../src/mapLayouts");
import THREE = require('three');

export class Map {
    public MapLayouts: List<MapLayout> = new List<MapLayout>();

    private currentLayout: number;

    public setRandomLayout() {
        return getRandomInt(0, this.MapLayouts.size -1);
    };

    constructor() {
        this.LoadMap();
        this.currentLayout = this.setRandomLayout();
    }

    public LoadMap(): void {
        for (var i = 0; i < mapLayoutsJson.Maps.length; i++) {
            var currentMap = mapLayoutsJson.Maps[i];
            var walls: List<Wall> = new List<Wall>();
            
            for (var j = 0; j < currentMap.Walls.length; j++) {
                var currentWall = currentMap.Walls[j];
                walls.add(new Wall(new THREE.Vector2(Number.parseInt(currentWall.position.x), Number.parseInt(currentWall.position.y)),
                    new Size(currentWall.size.width, currentWall.size.height),currentWall.color));
            }

            this.MapLayouts.add(new MapLayout(walls, currentMap.name));
        }
    }

    public GetMesh(){
        var meshes : THREE.Mesh[] = [];
        var currentLayout = this.MapLayouts.getAt(this.currentLayout);
        currentLayout.Walls.forEach(wall=>{
           var tempWall = new THREE.Mesh( new THREE.BoxGeometry(wall.size.width, wall.size.height, 0), new THREE.MeshBasicMaterial({ color: wall.color }));
           tempWall.position.setX(wall.position.x);
           tempWall.position.setY(wall.position.y);
           tempWall.name = "wall";
           meshes.push(tempWall);
        })

        return meshes;
    }

    public GetMeshGroup(){
        var group : THREE.Group = new THREE.Group();

        this.GetMesh().forEach(mesh => group.add(mesh));

        return group;
    }
}

export class MapLayout {
    public Walls: List<Wall>;
    public Name: string;

    constructor(walls: List<Wall>, name: string) {
        this.Walls = walls;
        this.Name = name;
    }
}

export class Wall {
    public position: THREE.Vector2;
    public size: Size;
    public color:string;
    constructor(position: THREE.Vector2, size: Size, color:string) {
        this.position = position;
        this.size = size;
        this.color = color;
    }
}

class Size {
    public width: number;
    public height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}