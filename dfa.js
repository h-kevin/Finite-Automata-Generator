/* Class to convert a given NFA to DFA. */

class dfa {

    constructor(nfaAutomata) {

        this._DFA = transform(nfaAutomata);
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

                for (element in nfa.F) {

                    if (closures.includes(element))
                        isfinal = true;
                }
                
                clsState = closures.toString();

                if (!dfa.Q.includes(clsState)) {

                    unchecked.push(clsState);
                    dfa.Q.push(clsState);
                }

                dfa.transitions[state][i] = [clsState];

                if (isfinal)
                    dfa.F.push(clsState);
            }
        }

        return dfa;
    }
}