export class List<T>{
    private items: T[];
    private size: number;

    public constructor() {
        this.clear();
    }

    public clear() {
        this.items = [];
        this.size = 0;
    }

    public add(item: T) {
        this.items.push(item);
    }

    public removeAt(index: number) {
        this.items.splice(index, 1);
    }

    public removeItem(item: T) {
        var index = this.items.findIndex(i => i == item);
        if (index >= 0) {
            this.removeAt(index);
        }
    }

    public forEach(callBack: CallBack<T>) {
        this.items.forEach(item => {
            callBack(item);
        });
    }
}

interface CallBack<T> {
    (item: T): void;
}