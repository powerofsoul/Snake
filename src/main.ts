import THREE = require('three');
import { GameWindow } from "./GameWindow";
import { Snake } from "./Snake";
import { InputEvent, EventType } from "./EventSubscriber"
import { BodyGeometry,Direction } from "./SpaceElement";
export class Game {
    static gameSpeed: number = 10;
    static gameWindow : GameWindow;

    static init():any {
        Game.gameWindow = new GameWindow();
        var snake = new Snake(new THREE.Vector3(0, 0, 0), "white");
        Game.gameWindow.AddToWindow(snake);
    }
}

window.onload = Game.init;
