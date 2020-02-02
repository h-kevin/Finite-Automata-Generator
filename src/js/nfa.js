/* Class to convert a given e-NFA to a NFA. */

// imports
import automata from './automata.js';

// class implementation

export default class nfa {

    constructor(enfaAutomata) {

        this._NFA = this._transform(enfaAutomata);
    }

    // getters and setters

    get NFA() {

        return this._NFA;
    }

    // method to find epsilon closures

    epsiloncls(enfa, q) {

        let qclosures = {

            [q]: false // is member, but not checked
        }

        let i = 0;
        let iterator = Object.keys(qclosures)[i];

        while (i < Object.keys(qclosures).length) {

            if (qclosures[iterator] == false) {

                qclosures[iterator] == true; // member is checked
                
                let ecls = enfa.transitions[iterator]['$'];
                let eclsobj = {};

                for (let j = 0; j < ecls.length; j++) {

                    eclsobj[ecls[j]] = false;
                }

                qclosures = {...qclosures, ...eclsobj};

                i++;
                iterator = Object.keys(qclosures)[i];
            }
        }

        return qclosures;
    }

    // method to find closures for a certain input

    inputcls(enfa, q, input) {

        let intrans = enfa.transitions[q][input];

        let inclosures = {};

        for (let i = 0; i < intrans.length; i++) {

            inclosures[intrans[i]] = true;
        }

        return inclosures;
    }

    // method to transform an e-nfa to a nfa

    transform(enfa) {

        let nfa = new automata();

        nfa.E = enfa.E;
        nfa.Q = enfa.Q;
        nfa.iState = 0;

        let closure1 = [];
        let closure2 = [];
        let closure3 = [];

        // The structure of automata transitions:
        // 
        // automata.transitions = {
        // 
        //     automata.Q[]: {
        // 
        //         automata.E: [closure]
        //     }
        // }

        for (let i = 0; i < enfa.Q.length; i++) {

            let newel = Object.getOwnPropertyNames(
                this.epsiloncls(enfa, i)
            );
            
            closure1 = [...new Set(newel)]; // removes duplicates

            for (let j = 0; j < enfa.E.length; j++) {
    
                for (let k = 0; k < closure1.length; k++) {
    
                    let newel = Object.getOwnPropertyNames(
                        this.inputcls(enfa, closure1[k], enfa.E[j])
                    );
    
                    closure2 = [...closure2, ...newel];
                    closure2 = [...new Set(closure2)];
    
                    for (let l = 0; l < closure2.length; l++) {
            
                        let newel = Object.getOwnPropertyNames(
                            this.epsiloncls(enfa, closure2[l])
                        );
                        
                        closure3 = [...closure3, ...newel];
                        closure3 = [...new Set(closure3)];

                        nfa.transitions[i][enfa.E[j]] = closure3;
                        closure3.length = 0;
                    }
                    
                    closure2.length = 0;
                }
            }
        } 

        let endstates = [];

        for (let i = 0; i < enfa.Q.length; i++) {

            let closures = Object.getOwnPropertyNames(
                this.epsiloncls(enfa, i)
            );

            for (let j = 0; j < closures.length; j++) {

                for (let k = 0; k < enfa.F.length; k++) {

                    if (closures[j] == enfa.F[k])
                        endstates.push(i);
                }
            }
        }

        nfa.F = endstates;

        return nfa;
    }
};