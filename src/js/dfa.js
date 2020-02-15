/* Class to convert a given NFA to DFA. */

// imports
import automata from './automata.js';
import stack from './stack.js';

// class implementation

export default class dfa {

    constructor(nfaAutomata) {

        this._DFA = this.transform(nfaAutomata._NFA);
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

    // method to transform an nfa to a dfa

    transform(nfa) {

        let dfa = new automata();

        dfa.iState = 0;
        dfa.E = nfa._E;
        
        let unchecked = new stack();
        unchecked.push(nfa._iState.toString());
        dfa.Q.push(nfa._iState.toString());

        if (nfa._F.includes(nfa._iState))
            dfa.F.push(nfa._iState.toString());

        let state = 0;
        let closures = [];
        let newstate = [];
        let isfinal = false;

        while (!unchecked.isEmpty()) {

            state = unchecked.pop();
            isfinal = false;

            for (let input of nfa._E) {

                closures.length = 0;

                if (nfa._transitions[state])
                    if (nfa._transitions[state][input])
                        closures = [...new Set(nfa._transitions[state][input])];

                if (closures.length == 0) {

                    newstate = state.split(',');
                    let newstatecls = [];

                    for (let element of newstate) {

                        if (nfa._transitions[element])
                            if (nfa._transitions[element][input])
                                newstatecls = [...newstatecls, ...nfa._transitions[element][input]];
                    }

                    closures = [...new Set(newstatecls)];
                }

                for (let element of nfa._F) {

                    isfinal = closures.includes(element.toString());
                }
                
                newstate = closures.toString();

                if (isfinal && !dfa.F.includes(newstate))
                    dfa.F.push(newstate);

                let condition = (
                    newstate.length > 1 ?
                        !dfa.Q.includes(newstate.toString()) : !dfa.Q.includes(newstate)
                );

                if (newstate.length > 0 && condition) {

                    unchecked.push(newstate);
                    dfa.Q.push(newstate);
                }

                if (!dfa.transitions[state]) {

                    dfa.transitions[state] = {};
                    dfa.transitions[state][input] = [];
                } else if (!dfa.transitions[state][input])
                    dfa.transitions[state][input] = [];

                dfa.transitions[state][input] = [newstate];
            }
        }

        return dfa;
    }
};