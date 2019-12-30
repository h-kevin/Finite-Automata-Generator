/* Class to convert a regular expression string into an epsilon-nfa. */

class regexToEnfa {

    // constructors

    constructor(regex) {

        this._regex = regex;
    }

    // getters and setters

    get regex() {

        return this._regex;
    }

    set regex(str) {

        this._regex = str;
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

    // method to build epsilon-nfa from a given string regex

    build(regex) {

        let eNFA = new automata();

        eNFA.E = this.findInputs(regex);
        eNFA.iState = "0";

        for (let i = 0; i < regex.length; i++) {

            if (i == 0 && regex.charAt(i) != '(') {

                automaton = this.operation1(regex.charAt(i));
                eNFA.Q = automaton.setOfStates;
                eNFA.transitions = automaton.transitions;
                eNFA.F = eNFA.Q[eNFA.Q.length - 1];
            } else if (i == 0 )
        }
    }
}