import THREE = require('three');
import { GameWindow } from "./GameWindow";
import { Snake } from "./Snake";
import { InputEvent, EventType } from "./EventSubscriber"
import { BodyGeometry } from "./SpaceElement";
import { Point } from "./Point";

export class Game {
    static gameSpeed: number = 15;
    static gameWindow: GameWindow;
    static score:number = 0;
    static highScore:number = 0;
    static StartGame() {
        Game.gameWindow = new GameWindow();
        var snake = new Snake(new THREE.Vector3(0, 0, 0), "red");
        var point = new Point(new THREE.Vector3(0,30,0),30,30,"pink");
        Game.gameWindow.AddToWindow(snake);
        Game.gameWindow.AddToWindow(point);
    }
}


window.onload = Game.StartGame;
