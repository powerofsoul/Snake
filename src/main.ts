import THREE = require('three');
import { GameWindow } from "./GameWindow";
import { Snake } from "./Snake";
import { InputEvent, EventType } from "./EventSubscriber"

export class Game {
    static gameSpeed: number = 10;

    constructor() {
        this.init();
    }

    init() {
        var gameWindow = new GameWindow();
        var snake = new Snake(new THREE.Vector3(0, 0, 0), "white");
        gameWindow.AddToWindow(snake);
    }
}
function StartGame() {
    var m = new Game();
}
window.onload = StartGame;
