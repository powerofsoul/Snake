export class List<T>{
    private items: T[];
    public size: number;

    public constructor() {
        this.clear();
    }

    public clear() {
        this.items = [];
        this.size = 0;
    }

    public add(item: T) {
        this.items.push(item);
        this.size ++;
    }

    public removeAt(index: number) {
        this.items.splice(index, 1);
        this.size --;
    }

    public removeItem(item: T) {
        var index = this.items.findIndex(i => i == item);
        if (index >= 0) {
            this.removeAt(index);
        }
        this.size--;
    }

    public forEach(callBack: CallBack<T>) {
        this.items.forEach(item => {
            callBack(item);
        });
    }

    public last(): T {
        return this.items[this.items.length - 1];
    }

    public getAt(index:number){
        return this.items[index];
    }

}

interface CallBack<T> {
    (item: T): void;
}