/* Class to convert a given NFA to DFA. */

// imports
import automata from './automata';
import stack from './stack';

// class implementation

export default class dfa {

    constructor(nfaAutomata) {

        this._DFA = this._transform(nfaAutomata);
    }

    // getters and setters

    get DFA() {

        return this._DFA;
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

        while (!unchecked.isEmpty()) {

            let state = unchecked.pop();
            let closures = [];
            let isfinal = false;

            for (let i = 0; i < nfa.E.length; i++) {

                closures = nfa.transitions[state][nfa.E[i]];

                if (closures.length == 0) {

                    let previous = state.split(",");
                    let prevcls = [];

                    for (let j = 0; j < previous.length; j++) {

                        prevcls = [...prevcls, ...nfa.transitions[previous[j]][nfa.E[i]]];
                    }

                    closures = [...new Set(prevcls)];
                }

                for (let element of nfa.F) {

                    if (closures.includes(element))
                        isfinal = true;
                }
                
                clsState = closures.toString();

                if (isfinal)
                    dfa.F.push(clsState);

                if (!dfa.Q.includes(clsState)) {

                    unchecked.push(clsState);
                    dfa.Q.push(clsState);
                }

                dfa.transitions[state][i] = [clsState];
            }
        }

        return dfa;
    }
}