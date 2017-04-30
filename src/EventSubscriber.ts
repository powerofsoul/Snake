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

export class InputEvent implements IEvent {
    Type: EventType;
    EventAction: IEventAction;

    constructor(name: EventType, eventAction: IEventAction) {
        this.Type = name;
        this.EventAction = eventAction;
        this.AssignToEvent();
    }

    private AssignToEvent() {
        document.addEventListener("keydown",(e)=>{
            switch(this.Type){
                case EventType.DOWN:
                    if(e.key == "s")
                        this.EventAction();
                break;
                case EventType.UP:
                    if(e.key == "w")
                        this.EventAction();
                break;
                case EventType.RIGHT:
                    if(e.key=="d")
                        this.EventAction();
                break;
                case EventType.LEFT:
                    if(e.key == "a")
                        this.EventAction();
                break;
            }
        });
    }
}
