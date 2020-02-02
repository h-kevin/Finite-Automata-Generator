/* Class that holds the basic structure for all finite automata. */

export default class automata {

    // constructor

    constructor() {

        this._E = [];
        this._Q = [];
        this._iState = 0;
        this._F = [];
        this._transitions = {};
    }

    // getters and setters

    get E() {

        return this._E;
    }

    set E(setOfInputs) {

        this._E = setOfInputs;
    }

    get Q() {

        return this._Q;
    }

    set Q(setOfStates) {

        this._Q = setOfStates;
    }

    get transitions() {

        return this._transitions;
    }

    set transitions(stateTransitions) {

        this._transitions = stateTransitions;
    }

    get iState() {

        return this._iState;
    }

    set iState(initialState) {

        this._iState = initialState;
    }

    get F() {

        return this._F;
    }

    set F(finalStates) {

        this._F = finalStates;
    }
};