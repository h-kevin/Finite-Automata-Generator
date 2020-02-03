/* Index file containing the user interface. */

// imports
import Automata from './automata.js';
import nfa from './nfa.js';
import dfa from './dfa.js';
import minimizeDfa from './minimizeDfa.js';

// execution

function main () {

    // clicking on begin

    $('header > .container > .begin').click(function () {

        $('html, body').animate({
            
            scrollTop: $(this).parent().parent().height(),
        }, 1000);

        $('html, body').css('background', 'var(--regal-blue)');
    });
};

$(document).ready(main());