/* JavaScript implementation of the Stack data structure. */

class stack {

    constructor() {

        this._items = [];
    }

    push(element) {

        this._items.push(element);
    }

    pop() {

        if (this._items.length == 0)
            return "Stack is empty...";
        else
            return this._items.pop();
    }

    peek() {

        return this._items[this._items.length - 1];
    }

    isEmpty() {

        return this._items.length == 0;
    }

    printStack() {

        let str = "[ ";

        for (let i = 0; i < this._items.length; i++)
            str += this._items[i] + " ";

        str += "]";

        return str;
    }

    
}