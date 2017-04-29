import Jquery = require("jquery")

enum EventType{
    RightClick,LeftClick,UP,DOWN,LEFT,RIGHT
}

interface IEvent{
    Type : EventType;
    EventAction : IEventAction;
}

interface IEventAction{
    ():void;
}

class InputEvent implements IEvent{
    Type:EventType;
    EventAction:IEventAction;

    constructor(name:EventType,eventAction:IEventAction){
        this.Type = name;
        this.EventAction = eventAction;
    }
}