/* Class to convert a given e-NFA to a NFA. */

class nfa {

    constructor(automata) {

        this._nfa = transform(automata);
    }

    epsiloncls(enfa, q) {

        let qclosures = {

            [q]: false // is member, but not checked
        }

        for (let i = 0; i < qclosures.length; i++) {

            if (qclosures[i] == false) {

                qclosures[i] == true; // member is checked
                
                let ecls = enfa.transitions[i]['$'];
                let eclsobj = {};

                for (let j = 0; j < ecls.length; j++) {

                    eclsobj[ecls[j]] = false;
                }

                qclosures = {...qclosures, ...eclsobj};
            }
        }

        return qclosures;
    }

    inputcls(enfa, q, input) {

        let intrans = enfa.transitions[q][input];

        let inclosures = {};

        for (let i = 0; i < intrans.length; i++) {

            if (intrans[i] == q)
                inclosures[intrans[i]] = true;
            else
                inclosures[intrans[i]] = false;
        }

        for (let i = 0; i < inclosures.length; i++) {

            if (inclosures[i])
        }
    }

    transform(enfa) {

        let nfa = new automata();

        nfa.E = enfa.E;
        nfa.Q = enfa.Q;

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

            closure1 = Object.getOwnPropertyNames(
                this.epsiloncls(enfa, i)
            );
            
            for (let j = 0; j < enfa.E.length; j++) {

                for (let k = 0; k < closure1.length; k++) {

                    
                }
            }
        }
    }
}