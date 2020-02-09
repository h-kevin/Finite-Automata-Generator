/* Class to minimize a given dfa. */

// imports
import automata from './automata.js';

export default class minimizeDfa {

    constructor(dfaAutomata) {

        this._DFA = this.minimize(dfaAutomata);
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

    // method to minimize dfa

    minimize(dfa) {

        let minDfa = new automata();
        
        minDfa.iState = dfa.iState;
        minDfa.E = dfa.E;

        let partitions = {};
        let nonfinal = [];
        let k = 0;

        for (let state of dfa.Q) {

            if (!dfa.F.includes(state))
                nonfinal.push(state);
        }

        partitions[0] = [nonfinal, dfa.F];
        let newinnerset = [];
        let lastpart = -1;

        do {

            k++;
            partitions[k] = [];
            newinnerset.length = 0;

            let sets = JSON.parse(JSON.stringify(partitions[k - 1]));

            for (let innerset of sets) {

                for (let j = 0; j < innerset.length - 1; j++) {

                    let disting = false;
                    let cls1 = -1;
                    let cls2 = -1;

                    for (let input of dfa.E) {

                        if (dfa.transitions[innerset[j]])
                            if (dfa.transitions[innerset[j]][input])
                                cls1 = parseInt(dfa.transitions[innerset[j]][input]);

                        if (dfa.transitions[innerset[j + 1]])
                            if (dfa.transitions[innerset[j + 1]][input])
                                cls2 = parseInt(dfa.transitions[innerset[j + 1]][input]);

                        for (let innerset of sets) {

                            if (innerset.includes(cls1) && !innerset.includes(cls2))
                                disting = true;
                            
                            if (innerset.includes(cls2) && !innerset.includes(cls1))
                                disting = true;
                        }

                        if (disting == true)
                            break;
                    }

                    if (disting == true) {

                        newinnerset.push(cls2);
                        innerset = innerset.splice(innerset.indexOf(cls2), 1);
                        j--;
                    }
                }
            }

            if (newinnerset.length != 0) {

                for (let innerset of sets) {

                    partitions[k].push(innerset);
                }

                partitions[k].push(newinnerset);
                lastpart = k;
            }
        } while (newinnerset.length != 0);

        let newstates = [];

        if (partitions[lastpart]) {

            for (let innerset of partitions[lastpart]) {
    
                newstates.push(innerset.toString());
            }
        }

        minDfa.Q = newstates;

        if (minDfa.Q.length == 1)
            minDfa.iState = newstates.toString();

        let setofstates = [];
        let closures = [];
        let isfinal = false;

        for (let input of dfa.E) {

            for (let state of minDfa.Q) {
    
                setofstates = state.split(",");
                
                for (let splitstate of setofstates) {
    
                    if (dfa.F.includes(splitstate))
                        isfinal = true;
                    
                    closures = [...closures, ...dfa.transitions[splitstate][input]];
                }
    
                if (isfinal && !minDfa.F.includes(state))
                    minDfa.F.push(state);
                
                minDfa.transitions[state][input] = [...new Set(closures)];

                closures.length = 0;
                isfinal = false;
            }
        }
        
        return minDfa;
    }
};