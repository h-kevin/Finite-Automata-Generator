/* Index file containing the user interface. */

// imports
import Automata from './automata.js';
import Nfa from './nfa.js';
import Dfa from './dfa.js';
import MinimizeDfa from './minimizeDfa.js';

// execution

function main () {

    // variables

    let enfa = new Automata();
    let nfa, dfa, mindfa;

    // force scroll to be on top at start

    $('html, body').animate({
        
        scrollTop: 0
    }, 1000);

    // clicking on begin

    $('header > .container > .begin').click(function () {

        $('html, body').animate({
            
            scrollTop: $(this).parent().parent().height(),
        }, 1000);

        $('html, body').css('background', 'var(--ebony-clay)');
        
        $('#input > .input-form > .container > .input-states > .states-number').focus();
    });

    // getting number of states

    $('#input > .input-form > .container > .input-states > .progress-button').click(function () {  

        let box = $(this).parent().find('.states-number');
        let number = box.val();
        let regex = /^\s*$/;

        if (number.match(regex) || isNaN(number)) {

            box.css('box-shadow', '0 0 10px var(--peru-tan-blurred)');
            box.css('border', '1px solid var(--peru-tan)');
        } else {

            box.css('box-shadow', '0 0 10px var(--oslo-gray-blurred)');
            box.css('border', '1px solid var(--oslo-gray)');

            for (let i = 0; i < number; i++) {
    
                enfa.Q.push(i);
            }
    
            let scrollPos = $('html, body').height() * 2;
    
            $('html, body').animate({
    
                scrollTop: scrollPos
            }, 1000);

            $('#input > .input-form > .container > .input-alphabet-1 > .inputs-number').focus();
        }
    });

    // getting size of alphabet

    $('#input > .input-form > .container > .input-alphabet-1 > .progress-button').click(function () {  

        let box = $(this).parent().find('.inputs-number');
        let number = box.val();
        let regex = /^\s*$/;

        if (number.match(regex) || isNaN(number)) {

            box.css('box-shadow', '0 0 10px var(--peru-tan-blurred)');
            box.css('border', '1px solid var(--peru-tan)');
        } else {

            box.css('box-shadow', '0 0 10px var(--oslo-gray-blurred)');
            box.css('border', '1px solid var(--oslo-gray)');

            for (let i = 0; i < number - 1; i++) {
    
                $('#input > .input-form > .container > .input-alphabet-2 > .progress-button').before(
                    `<input type="text" class="input" />`
                );
            }
    
            let scrollPos = $('html, body').height() * 3;
    
            $('html, body').animate({
    
                scrollTop: scrollPos
            }, 1000);
        }
    });
};

$(document).ready(main());