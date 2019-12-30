/* Class that holds the basic structure for all finite automata. */

class automata {

    constructor(E = null, Q = null, transitions = null, iState = null, F = null) {

        this._E = E;
        this._Q = Q;
        this._transitions = transitions;
        this._iState = iState;
        this._F = F;
    }

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
}