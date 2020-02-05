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
            box.focus();
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
            box.focus();
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

            $('#input > .input-form > .container > .input-alphabet-2').children('.input')[1].focus();
        }
    });

    // getting alphabet elements

    $('#input > .input-form > .container > .input-alphabet-2 > .progress-button').click(function () {

        let fields = $(this).parent().children('.input');
        let regex = /^\s*$/;
        let focus = 0;

        let array = [$(fields[0]).val()];

        for (let i = 1; i < fields.length; i++) {

            if (!$(fields[i]).val().match(regex))
                array.push($(fields[i]).val());
        }
        
        let selector = `#input > .input-form > .container > .input-alphabet-2 > .input`;

        for (let i = 1; i < fields.length; i++) {

            if ($(fields[i]).val().match(regex)) {

                $(fields[i]).focus(function () {
                    
                    $(fields[i]).css('box-shadow', '0 0 10px var(--peru-tan-blurred)');
                });

                $(fields[i]).blur(function () {

                    $(fields[i]).css('box-shadow', 'none');
                });

                $(fields[i]).css('border', '1px solid var(--peru-tan)');
                
                if (focus == 0) {

                    $(fields[i]).focus();
                    focus = 1;
                }
            } else {

                $(fields[i]).focus(function () {
                    
                    $(fields[i]).css('box-shadow', '0 0 10px var(--oslo-gray-blurred)');
                });

                $(fields[i]).blur(function () {

                    $(fields[i]).css('box-shadow', 'none');
                });

                $(fields[i]).css('border', '1px solid var(--oslo-gray)');
            }
        }

        if (array.length == fields.length) {

            enfa.E = array;

            $(selector).css('box-shadow', '0 0 10px var(--oslo-gray-blurred)');
            $(selector).css('border', '1px solid var(--oslo-gray)');

            let transitions = `#input > .input-form > .container >
                                .input-transitions > .transition-container`;
            
            for (let i = 1; i < enfa.Q.length; i++) {

                $(`${ transitions } > .states`).append(`<button type="button">${ i }</button>`);
                $(`${ transitions } > .outputs`).append(`<button type="button">${ i }</button>`);
            }

            for (let i = 1; i < enfa.E.length; i++) {

                $(`${ transitions } > .inputs`).append(`<button type="button">${ enfa.E[i] }</button>`);
            }

            let scrollPos = $('html, body').height() * 4;
    
            $('html, body').animate({
    
                scrollTop: scrollPos
            }, 1000);
        }
    });
};

$(document).ready(main());