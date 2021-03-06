/* JavaScript implementation of the Stack data structure. */

export default class stack {

    constructor() {

        this._items = [];
    }

    // method to insert an element in the stack

    push(element) {

        this._items.push(element);
    }

    // method to remove the top element from the stack

    pop() {

        if (this._items.length == 0)
            return "Stack is empty...";
        else
            return this._items.pop();
    }

    // method to check the top element of the stack

    peek() {

        return this._items[this._items.length - 1];
    }

    // method to check if the stack is empty

    isEmpty() {

        return this._items.length == 0;
    }

    // method to print all elements of the stack

    printStack() {

        let str = "[ ";

        for (let i = 0; i < this._items.length; i++)
            str += this._items[i] + " ";

        str += "]";

        return str;
    }    
};