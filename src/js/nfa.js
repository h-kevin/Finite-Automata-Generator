/* Class to convert a given e-NFA to a NFA. */

// imports
import automata from './automata.js';

// class implementation

export default class nfa {

    constructor(enfaAutomata) {

        this._NFA = this.transform(enfaAutomata);
    }

    // getters and setters

    get E() {

        return this._NFA.E;
    }

    get Q() {

        return this._NFA.Q;
    }

    get transitions() {

        return this._NFA.transitions;
    }

    get iState() {

        return this._NFA.iState;
    }

    get F() {

        return this._NFA.F;
    }

    // method to find epsilon closures

    epsiloncls(enfa, q) {

        let qclosures = {

            [q]: false // is member, but not checked
        }

        let unchecked = [];

        unchecked[q] = 'check';

        for (let i = 0; i < unchecked.length; i++) {

            if (unchecked[i] == null)
                unchecked[i] = undefined;
        }

        let i = q;
        let old = i;

        while (i < unchecked.length) {

            old = i;

            if (unchecked[i] == 'check') {

                unchecked[i] = 'checked';
                qclosures[i] = true;

                let ecls = [];
                
                if (enfa._transitions[i])
                    if (enfa._transitions[i]['$'])
                        ecls = enfa._transitions[i]['$'];

                let eclsobj = {};

                for (let j = 0; j < ecls.length; j++) {

                    eclsobj[ecls[j]] = false;

                    if (unchecked[ecls[j]] != 'checked')
                        unchecked[ecls[j]] = 'check';
                }

                for (let j = 0; j < unchecked.length; j++) {

                    if (unchecked[i] == null)
                        unchecked[j] = undefined;
                }

                for (let j = 0; j < unchecked.length; j++) {

                    if (unchecked[j] == 'check') {

                        i = j;
                        break;
                    }
                }

                qclosures = {...qclosures, ...eclsobj};
            }

            i = (old == i) ? i + 1 : i;
        }
        
        return qclosures;
    }

    // method to transform an e-nfa to a nfa

    transform(enfa) {

        let nfa = new automata();

        nfa.E = enfa._E;
        nfa.E.splice(nfa.E.indexOf('$'), 1);
        nfa.Q = enfa._Q;
        nfa.iState = 0;

        let closure1 = [];
        let closure2 = {};
        let closure3 = [];

        // The structure of automata transitions:
        // 
        // automata.transitions = {
        // 
        //     automata.Q[]: {
        // 
        //         automata.E[]: [closure]
        //     }
        // }

        for (let state of enfa._Q) {

            let newel = Object.getOwnPropertyNames(
                this.epsiloncls(enfa, state)
            );

            closure1.length = 0;
            closure1 = [...new Set(newel)]; // removes dublicates

            for (let input of enfa._E) {

                if (input != '$') {

                    for (let element of closure1) {

                        if (!closure2[input])
                            closure2[input] = [];

                        if (enfa._transitions[element])
                            if (enfa._transitions[element][input])
                                closure2[input] = 
                                    [...closure2[input], ...enfa._transitions[element][input]];
                        
                        closure2[input] = [...new Set(closure2[input])];
                    }

                    for (let element of closure2[input]) {

                        let newel = Object.getOwnPropertyNames(
                            this.epsiloncls(enfa, element)
                        );

                        closure3 = [...closure3, ...newel];
                        closure3 = [...new Set(closure3)];
                    }

                    if (!nfa.transitions[state]) {

                        nfa.transitions[state] = {};
                        nfa.transitions[state][input] = [];
                    } else if (!nfa.transitions[state][input])
                        nfa.transitions[state][input] = [];

                    nfa.transitions[state][input] = [...new Set(closure3)];
                    closure2[input].length = 0;
                    closure3.length = 0;
                }
            }
        }

        let endstates = [];

        for (let state of enfa._Q) {

            let closures = Object.getOwnPropertyNames(
                this.epsiloncls(enfa, state)
            );

            closures = [...new Set(closures)];

            let finals = enfa._F;

            for (let element of closures) {

                if (finals.includes(element)) {

                    endstates.push(state);
                    break;
                }
            }
        }

        nfa.F = endstates;
        return nfa;
    }
};