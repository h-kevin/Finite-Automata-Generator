/* Class to convert a given NFA to DFA. */

// imports
import automata from './automata.js';
import stack from './stack.js';

// class implementation

export default class dfa {

    constructor(nfaAutomata) {

        this._DFA = this.transform(nfaAutomata);
    }

    // getters and setters

    get E() {

        return this._DFA.E;
    }

    get Q() {

        return this._DFA.Q;
    }

    get transitions() {

        return this._DFA.transitions;
    }

    get iState() {

        return this._DFA.iState;
    }

    get F() {

        return this._DFA.F;
    }

    // method to transform a nfa to a dfa

    transform(nfa) {

        let dfa = new automata();

        dfa.iState = 0;
        dfa.E = nfa.E;
        
        let unchecked = new stack();

        unchecked.push(nfa.iState);
        dfa.Q.push(nfa.iState);

        if (nfa.F.includes(nfa.iState))
            dfa.F.push(nfa.iState);

        let state = 0;
        let closures = [];
        let isfinal = false;

        while (!unchecked.isEmpty()) {

            state = unchecked.pop();
            isfinal = false;

            for (let input of nfa.E) {

                closures.length = 0;

                if (nfa.transitions[state])
                    if (nfa.transitions[state][input])
                        closures = [...new Set(nfa.transitions[state][input])];

                if (closures.length == 0) {

                    let previous = state.split(',');
                    let prevcls = [];

                    for (let element of previous) {

                        if (nfa.transitions[element])
                            if (nfa.transitions[element][input])
                                prevcls = [...prevcls, ...nfa.transitions[element][input]];
                    }

                    closures = [...new Set(prevcls)];
                }

                for (let element of nfa.F) {

                    if (closures.includes(parseInt(element)))
                        isfinal = true;
                }
                
                let clsState = closures.toString();

                if (isfinal)
                    dfa.F.push(clsState);

                let condition = (
                    clsState.length > 1 ?
                        !dfa.Q.includes(clsState.toString()) : !dfa.Q.includes(parseInt(clsState))
                );

                if (condition && clsState != '') {

                    unchecked.push(clsState);
                    dfa.Q.push(clsState);
                    
                }

                if (!dfa.transitions[state]) {

                    dfa.transitions[state] = {};
                    dfa.transitions[state][input] = [];
                } else if (!dfa.transitions[state][input])
                    dfa.transitions[state][input] = [];

                dfa.transitions[state][input] = [clsState];
            }
        }

        return dfa;
    }
};