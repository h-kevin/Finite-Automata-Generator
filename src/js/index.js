/* Index file containing the user interface. */

// imports
import Automata from './automata.js';
// import nfa from './nfa.js';
// import dfa from './dfa.js';
// import minimizeDfa from './minimizeDfa.js';

// execution

function main () {

    // setting up the e-nfa with input from the user

    let enfa = new Automata();
    enfa.E = ['a', 'b'];
    enfa.Q = [0, 1, 2];
    enfa.iState = 0;
    enfa.F = [2];
    $('#output').append(`<p>Fuck you all! ${enfa.Q}</p>`);
};

main();