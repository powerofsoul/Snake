import THREE = require ("three");

export interface GameElement{
    action():void;
    getMesh(): THREE.Mesh | THREE.Group;
}