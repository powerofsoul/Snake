export enum EventType {
    CLICK, UP, DOWN, LEFT, RIGHT
}

interface IEvent {
    Type: EventType;
    EventAction: IEventAction;
}

interface IEventAction {
    (): void;
}

export class MoveEvent {
    moveUpEvent: InputEvent;
    moveDownEvent: InputEvent;
    moveRightEvent: InputEvent;
    moveLeftEvent: InputEvent;

    constructor(moveUpEvent: InputEvent, moveDownEvent: InputEvent, moveRightEvent: InputEvent, moveLeftEvent: InputEvent) {
        this.moveUpEvent = moveUpEvent;
        this.moveDownEvent = moveDownEvent;
        this.moveRightEvent = moveRightEvent;
        this.moveLeftEvent = moveLeftEvent;
    }
}

export class InputEvent implements IEvent {
    Type: EventType;
    EventAction: IEventAction;

    constructor(name: EventType, eventAction: IEventAction) {
        this.Type = name;
        this.EventAction = eventAction;
        if (name == EventType.CLICK)
            this.AssignMouseEvent();
        else
            this.AssignKeyboardEvent();
    }

    private AssignMouseEvent() {
        document.addEventListener("click", () => {
            this.EventAction();
        });
    }

    private AssignKeyboardEvent() {
        document.addEventListener("keydown", (e) => {
            switch (this.Type) {
                case EventType.DOWN:
                    if (e.key == "s")
                        this.EventAction();
                    break;
                case EventType.UP:
                    if (e.key == "w")
                        this.EventAction();
                    break;
                case EventType.RIGHT:
                    if (e.key == "d")
                        this.EventAction();
                    break;
                case EventType.LEFT:
                    if (e.key == "a")
                        this.EventAction();
                    break;
            }
        });
    }
}
