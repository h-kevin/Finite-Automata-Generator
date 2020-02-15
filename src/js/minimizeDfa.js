/* Class to minimize a given dfa. */

// imports
import automata from './automata.js';

export default class minimizeDfa {

    constructor(dfaAutomata) {

        this._DFA = this.minimize(dfaAutomata._DFA);
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

        minDfa.E = dfa._E;

        let table = [];

        for (let i of dfa._Q) {

            for (let j of dfa._Q) {

                if (i == j)
                    break;

                if (!table[i])
                    table[i] = [];

                if ((dfa._F.includes(i) && !dfa._F.includes(j))
                    || (!dfa._F.includes(i) && dfa._F.includes(j)))
                    table[i][j] = 'checked';
                else
                    table[i][j] = 'unchecked';
            }
        }

        let a = -1;
        let b = -1;
        let flag = 0;

        do {

            flag = 0;

            for (let input of dfa._E) {
    
                for (let i of dfa._Q) {
    
                    for (let j of dfa._Q) {
    
                        if (i == j)
                            break;
    
                        if (table[i][j] == 'unchecked') {
    
                            if (dfa._transitions[i][input])
                                a = dfa._transitions[i][input];
    
                            if (dfa._transitions[j][input])
                                b = dfa._transitions[j][input];
    
                            if (table[a]) {

                                if (table[a][b]) {

                                    if (table[a][b] == 'checked') {
        
                                        table[i][j] = 'checked';
                                        flag = 1;
                                    }
                                }
                            } else if (table[b]) {
                                
                                if (table[b][a]) {

                                    if (table[b][a] == 'checked') {
        
                                        table[i][j] = 'checked';
                                        flag = 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } while (flag == 1);

        let combinations = [];

        for (let i of dfa._Q) {

            for (let j of dfa._Q) {

                if (i == j)
                    break;

                if (table[i][j] == 'unchecked') {

                    combinations.push([i, j]);
                }
            }
        }

        for (let i = 0; i < combinations.length; i++) {

            for (let j of combinations) {

                if (combinations[i] != j) {

                    for (let element of j) {

                        if (combinations[i].includes(element)) {

                            combinations[i] = [...combinations[i], ...j];
                            combinations[i] = [...new Set(combinations[i])];
                        }
                    }
                }
            }
        }

        for (let i = 0; i < combinations.length; i++) {

            for (let j = 0; j < combinations.length; j++) {

                for (let element of combinations[j]) {

                    if (combinations[i].includes(element))
                        combinations.splice(j, 1);
                }
            }
        }

        let otherelemenets = [];

        for (let state of dfa._Q) {

            flag = 1;

            for (let element of combinations) {

                if (element.length > 1) {

                    if (element.includes(state))
                        flag = 0;
                }
            }

            if (flag == 1)
                otherelemenets.push(state);
        }

        minDfa.transitions = {};

        let dest = -1;

        for (let input of minDfa.E) {

            dest = -1;

            for (let element of combinations) {
    
                for (let subel of element) {
    
                    if (dfa._transitions[subel]) {

                        if (dfa._transitions[subel][input]) {

                            dest = dfa._transitions[subel][input][0];
                            break;
                        }
                    }
                } 

                for (let matchel of combinations) {

                    if (matchel.includes(dest)) {

                        if (!minDfa.transitions[element.join(',q').replace(/,(?!q)/g, 'q')]) {

                            minDfa.transitions[element.join(',q').replace(/,(?!q)/g, 'q')] = {};
                            minDfa.transitions[element.join(',q').replace(/,(?!q)/g, 'q')][input] = [];
                        } else if (!minDfa.transitions[element.join(',q').replace(/,(?!q)/g, 'q')][input])
                            minDfa.transitions[element.join(',q').replace(/,(?!q)/g, 'q')][input] = [];
        
                        minDfa.transitions[element.join(',q').replace(/,(?!q)/g, 'q')][input]
                            = [matchel.join(',q').replace(/,(?!q)/g, 'q')];
                        break;
                    } else {

                        for (let e of otherelemenets) {

                            if (e == dest) {
            
                                if (!minDfa.transitions[element.join(',q')
                                    .replace(/,(?!q)/g, 'q')]) {
            
                                    minDfa.transitions[element.join(',q')
                                        .replace(/,(?!q)/g, 'q')] = {};
                                    minDfa.transitions[element.join(',q')
                                        .replace(/,(?!q)/g, 'q')][input] = [];
                                } else if (!minDfa.transitions[element.join(',q')
                                    .replace(/,(?!q)/g, 'q')][input])
                                    minDfa.transitions[element.join(',q')
                                        .replace(/,(?!q)/g, 'q')][input] = [];
                
                                minDfa.transitions[element.join(',q')
                                    .replace(/,(?!q)/g, 'q')][input] = [e.toString()];
                                break;
                            }
                        }
                    }
                }
            }

            dest = -1;

            for (let element of otherelemenets) {

                if (dfa._transitions[element])
                    if (dfa._transitions[element][input])
                        dest = dfa._transitions[element][input];
                
                for (let matchel of combinations) {
    
                    if (matchel.includes(dest)) {
    
                        if (!minDfa.transitions[element.toString()]) {
    
                            minDfa.transitions[element.toString()] = {};
                            minDfa.transitions[element.toString()][input] = [];
                        } else if (!minDfa.transitions[element.toString()][input])
                            minDfa.transitions[element.toString()][input] = [];
        
                        minDfa.transitions[element.toString()][input]
                            = matchel.join(',q').replace(/,(?!q)/g, 'q');
                        break;
                    }
                }
    
                for (let e of otherelemenets) {
    
                    if (e == dest) {
    
                        if (!minDfa.transitions[element.toString()]) {
    
                            minDfa.transitions[element.toString()] = {};
                            minDfa.transitions[element.toString()][input] = [];
                        } else if (!minDfa.transitions[element.toString()][input])
                            minDfa.transitions[element.toString()][input] = [];
        
                        minDfa.transitions[element.toString()][input] = [e.toString()];
                        break;
                    }
                }
            }
        }

        minDfa.F = [];

        for (let element of combinations) {

            for (let subel of element) {

                if (dfa._F.includes(subel)) {

                    minDfa.F.push(element.join(',q').replace(/,(?!q)/g, 'q'));
                    break;
                }
            }
        }

        for (let element of otherelemenets) {

            if (dfa._F.includes(element)) {

                minDfa.F.push(element.toString());
            }
        }

        combinations = [...combinations, ...otherelemenets];
        combinations = [...new Set(combinations)];

        for (let element of combinations) {

            if (element.toString().length > 1) {

                minDfa.Q.push(element.join(',q').replace(/,(?!q)/g, 'q'));
                if (element.toString().includes(dfa._iState))
                    minDfa.iState = element.join(',q').replace(/,(?!q)/g, 'q');
            } else {

                minDfa.Q.push(element.toString());
                if (element.toString() == dfa._iState)
                    minDfa.iState = element.toString();
            }
        }
        
        return minDfa;
    }
};