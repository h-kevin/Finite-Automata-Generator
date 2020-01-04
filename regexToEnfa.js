/* Class to convert a regular expression string into an epsilon-nfa. */

class regexToEnfa {

    // constructors

    constructor(regex) {

        this._regex = regex;
        this._eNFA = new automata();
        this._stack = new stack();
        this._automaton = {};
    }

    // getters and setters

    get regex() {

        return this._regex;
    }

    set regex(str) {

        this._regex = str;
    }

    get eNFA() {

        return this._eNFA;
    }

    set eNFA(a) {

        this._eNFA = a;
    }

    get stack() {

        return this._stack;
    }

    set stack(s) {

        this._stack = s;
    }

    get automaton() {

        return this._automaton;
    }

    set automaton(a) {

        this._automaton = a;
    }

    // method to find the inputs

    findInputs(regex) {

        let inputs = [];
        let ch = '?';

        for (let i = 0; i < regex.length; i++) {

            ch = regex.charAt(i);

            if (ch > 47 && ch < 58 || ch > 64 && ch < 91 || ch > 96 && ch < 123)
                if (!inputs.includes(ch))
                    includes.push(ch);
        }

        return inputs;
    }

    // method to convert a

    operation1(input) {

        let automaton = {

            setOfStates: ["0", "1"],
            
            transitions: {

                0: {

                    [input]: ["1"]
                }
            }
        }
        return automaton;
    }

    // method to convert a*

    operation2(input, Q, transitions) {

        let last = Q[Q.length - 1];
        last = parseInt(last);

        let tmp = [];
        
        for (let i = 0; i < 4; i++) {

            last++;
            tmp.push(last);
        }

        let setOfStates = [...Q, ...tmp];

        transitions[tmp[0]] = {

            "$": [tmp[1], tmp[3]]
        }

        transitions[tmp[1]] = {

            [input]: [tmp[2]]
        }

        transitions[tmp[2]] = {

            "$": [tmp[1], tmp[3]]
        }

        let automaton = {

            setOfStates: setOfStates,
            transitions: transitions
        }
        return automaton;
    }

    // method to convert a+

    operation3(input, Q, transitions) {

        let last = Q[Q.length - 1];
        last = parseInt(last);

        let tmp = [];
        
        for (let i = 0; i < 6; i++) {

            last++;
            tmp.push(last);
        }

        let setOfStates = [...Q, ...tmp];

        transitions[tmp[0]] = {

            [input]: [tmp[1]]
        }

        transitions[tmp[1]] = {

            "$": [tmp[2]]
        }

        transitions[tmp[2]] = {

            "$": [tmp[3], tmp[5]]
        }

        transitions[tmp[3]] = {

            [input]: [tmp[4]]
        }

        transitions[tmp[4]] = {

            "$": [tmp[3], tmp[5]]
        }

        let automaton = {

            setOfStates: setOfStates,
            transitions: transitions
        }
        return automaton;
    }

    // method to convert ab

    operation4(input1, input2, Q, transitions) {

        let last = Q[Q.length - 1];
        last = parseInt(last);

        let tmp = [];
        
        for (let i = 0; i < 4; i++) {

            last++;
            tmp.push(last);
        }

        let setOfStates = [...Q, ...tmp];

        transitions[tmp[0]] = {

            [input1]: [tmp[1]]
        }

        transitions[tmp[1]] = {

            "$": [tmp[2]]
        }

        transitions[tmp[2]] = {

            [input2]: [tmp[3]]
        }

        let automaton = {

            setOfStates: setOfStates,
            transitions: transitions
        }
        return automaton;
    }

    // method to convert a|b

    operation5(input1, input2, Q, transitions) {

        let last = Q[Q.length - 1];
        last = parseInt(last);

        let tmp = [];
        
        for (let i = 0; i < 6; i++) {

            last++;
            tmp.push(last);
        }

        let setOfStates = [...Q, ...tmp];

        transitions[tmp[0]] = {

            "$": [tmp[1], tmp[3]]
        }

        transitions[tmp[1]] = {

            [input1]: [tmp[2]]
        }

        transitions[tmp[2]] = {

            "$": [tmp[5]]
        }

        transitions[tmp[3]] = {

            [input2]: [tmp[4]]
        }

        transitions[tmp[4]] = {

            "$": [tmp[5]]
        }

        let automaton = {

            setOfStates: setOfStates,
            transitions: transitions
        }
        return automaton;
    }

    // method to join two automatas a and b

    join(a, b) {

        if (a.Q.length == 0) {

            return b;
        } else {

            a.E = [...a.E, ...b.E];
            a.iState = b.iState;
            a.transitions[a.F[0]] = {
                
                "$": [b.Q[0]]
            }
            a.transitions = {...a.transitions, ...b.transitions};
            a.Q = [...a.Q, ...b.Q, b.Q[b.Q.length - 1] + 1];
            a.F = b.F;
        }
        return a;
    }

    // method to build epsilon-nfa from a given string regex

    build(regex) {

        this._eNFA.E = this.findInputs(regex);
        this._eNFA.iState = "0";
        let ch = '?';

        for (let i = 0; i < regex.length; i++) {

            if (i == 0 && i == regex.length - 1) {

                this._automaton = this.operation1(regex.charAt(i));
                this._eNFA.Q = this._automaton.setOfStates;
                this._eNFA.transitions = this._automaton.transitions;
                this._eNFA.F = this._eNFA.Q[this._eNFA.Q.length - 1];
            }

            if (regex.charAt(i) != '(') {

                ch = regex.charAt(i + 1);

                if (ch == '*') {

                    this._automaton = this.operation2(regex.charAt(i), this._eNFA.Q,
                        this._eNFA.transitions);
                    this._eNFA.Q = this._automaton.setOfStates;
                    this._eNFA.transitions = this._automaton.transitions;
                    this._eNFA.F = this._eNFA.Q[this._eNFA.length - 1];

                    i++;
                }

                if(ch == '+') {

                    this._automaton = this.operation3(regex.charAt(i), this._eNFA.Q,
                        this._eNFA.transitions);
                    this._eNFA.Q = this._automaton.setOfStates;
                    this._eNFA.transitions = this._automaton.transitions;
                    this._eNFA.F = this._eNFA.Q[this._eNFA.length - 1];

                    i++;
                }

                if (ch > 47 && ch < 58 || ch > 64 && ch < 91 || ch > 96 && ch < 123) {

                    this._automaton = this.operation4(regex.charAt(i), ch, this._eNFA.Q,
                        this._eNFA.transitions);
                    this._eNFA.Q = this._eNFA.setOfStates;
                    this._eNFA.transitions = this._automaton.transitions;
                    this._eNFA.F = this._eNFA.Q[this._eNFA.length - 1];

                    i++;
                }

                if(ch == '|') {

                    this._automaton = this.operation5(regex.charAt(i), regex.charAt(i + 2),
                        this._eNFA.Q, this._eNFA.transitions);
                    this._eNFA.Q = this._eNFA.setOfStates;
                    this._eNFA.transitions = this._automaton.transitions;
                    this._eNFA.F = this._eNFA.Q[this._eNFA.length - 1];

                    i += 2;
                }
            }

            
        }
    }
}