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

    let selection_string = `#input > .input-form > .container >`;

    // force scroll to be on top at start

    $('html, body').animate({
        
        scrollTop: 0
    }, 1000);

    // clicking on begin

    $('header > .container > .begin').click(function () {

        enfa = new Automata();
        enfa.E = [0, 1];
        enfa.Q = [0, 1, 2, 3, 4, 5];
        enfa.iState = 0;
        enfa.F = [1, 2, 4];
        enfa.transitions[0] = {};
        enfa.transitions[1] = {};
        enfa.transitions[2] = {};
        enfa.transitions[3] = {};
        enfa.transitions[4] = {};
        enfa.transitions[5] = {};

        enfa.transitions[0][0] = [3];
        enfa.transitions[0][1] = [1];
        enfa.transitions[1][0] = [2];
        enfa.transitions[1][1] = [5];
        enfa.transitions[2][0] = [2];
        enfa.transitions[2][1] = [5];
        enfa.transitions[3][0] = [0];
        enfa.transitions[3][1] = [4];
        enfa.transitions[4][0] = [2];
        enfa.transitions[4][1] = [5];
        enfa.transitions[5][0] = [5];
        enfa.transitions[5][1] = [5];

        // let x = new Dfa(enfa);
        let x = new MinimizeDfa(enfa);
        console.log(x.Q);
        console.log(x.iState);
        console.log(x.E);
        console.log(x.F);
        console.log(x.transitions);

        $('html, body').animate({
            
            scrollTop: $(this).parent().parent().height(),
        }, 1000);

        $('html, body').css('background', 'var(--ebony-clay)');
        
        $(`${ selection_string } .input-states > .states-number`).focus();
    });

    // getting number of states

    $(`${ selection_string } .input-states > .progress-button`).click(function () {  

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

            $(`${ selection_string } .input-alphabet-1 > .inputs-number`).focus();
        }
    });

    // getting size of alphabet

    $(`${ selection_string } .input-alphabet-1 > .progress-button`).click(function () {  

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
    
                $(`${ selection_string } .input-alphabet-2 > .progress-button`).before(
                    `<input type="text" class="input" />`
                );
            }
    
            let scrollPos = $('html, body').height() * 3;
    
            $('html, body').animate({
    
                scrollTop: scrollPos
            }, 1000);

            $(`${ selection_string } .input-alphabet-2`).children('.input')[1].focus();
        }
    });

    // getting alphabet elements

    $(`${ selection_string } .input-alphabet-2 > .progress-button`).click(function () {

        let fields = $(this).parent().children('.input');
        let regex = /^\s*$/;
        let focus = 0;

        let array = [$(fields[0]).val()];

        for (let i = 1; i < fields.length; i++) {

            if (!$(fields[i]).val().match(regex))
                array.push($(fields[i]).val());
        }
        
        let selector = `${ selection_string } .input-alphabet-2 > .input`;

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

            let transitions = `${ selection_string } .input-transitions > .transition-container`;
            
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

    // getting transitions

    let state;
    let input;
    let output;

    let transitions = {};

    $(`${ selection_string } .input-transitions > .transition-container >
        .states`).on('click', 'button', function () {

        let log = $(this).parent().parent().parent().find('.show-chosen');

        $(log).fadeOut(300, function () {
            
            $(log).children().remove();
        });

        state = $(this).text();
        input = null;
        output = null;
    });

    $(`${ selection_string } .input-transitions > .transition-container >
        .inputs`).on('click', 'button', function () {

        input = $(this).text();
        if (input == 'ε')
            input = '$';
        output = null;
    });

    $(`${ selection_string } .input-transitions > .transition-container >
        .outputs`).on('click', 'button', function () {

        let log = $(this).parent().parent().parent().find('.show-chosen');

        output = $(this).text();

        if (state != null && input != null) {

            let a = state;
            let b = (input == '$') ? 'ε' : input;
            let c = output;

            $(log).append(`<p>You chose:</p>
                <p>δ (${ a }, ${ b }) = ${ c }</p>`);

            $(log).children().css('font-size', 'medium');
            
            $(log).fadeIn(300);

            if ($(transitions).prop(state)) {

                if ($(transitions[state]).prop(input)) {

                    output = [...transitions[state][input], ...[output]];
                    output = [...new Set(output)];

                    transitions[state][input] = output;
                } else {
                    
                    transitions[state][input] = [output];
                }
            } else {

                transitions[state] = {
    
                    [input]: [output]
                };
            }
        }

        state = null;
        input = null;
        output = null;
    });

    enfa.transitions = transitions;

    $(`${ selection_string } .input-transitions > .progress-button`).click(function () {

        let log = $(this).parent().find('.show-chosen');

        $(log).fadeOut(300, function () {
            
            $(log).children().remove();
        });

        let scrollPos = $('html, body').height() * 5;
    
        $('html, body').animate({

            scrollTop: scrollPos
        }, 1000);

        $(`${ selection_string } .input-finals-1 > .finals-number`).focus();
    });

    // getting the size of final states

    $(`${ selection_string } .input-finals-1 > .progress-button`).click(function () {  

        let box = $(this).parent().find('.finals-number');
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
    
                $(`${ selection_string } .input-finals-2 > .progress-button`).before(
                    `<input type="text" class="input" />`
                );
            }
    
            let scrollPos = $('html, body').height() * 6;
    
            $('html, body').animate({
    
                scrollTop: scrollPos
            }, 1000);

            $(`${ selection_string } .input-finals-2`).children('.input')[0].focus();
        }
    });

    // getting final states

    $(`${ selection_string } .input-finals-2 > .progress-button`).click(function () {

        let fields = $(this).parent().children('.input');
        let regex = /^\d+$/;
        let focus = 0;

        let array = [];

        for (let i = 0; i < fields.length; i++) {

            if ($(fields[i]).val().match(regex) && $(fields[i]).val() < enfa.Q.length)
                array.push($(fields[i]).val());
        }
        
        let selector = `${ selection_string } .input-finals-2 > .input`;

        for (let i = 0; i < fields.length; i++) {

            if (!$(fields[i]).val().match(regex) || !($(fields[i]).val() < enfa.Q.length)) {

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

            enfa.F = array;

            $(selector).css('box-shadow', '0 0 10px var(--oslo-gray-blurred)');
            $(selector).css('border', '1px solid var(--oslo-gray)');

            let scrollPos = $('html, body').height() * 7;
    
            $('html, body').animate({
    
                scrollTop: scrollPos
            }, 1000);

            $('html, body').css('background', 'var(--outer-space)');

            let inputs = `{ `;

            for (let i = 0; i < enfa.E.length; i++) {

                if (i != enfa.E.length - 1)
                    inputs += `${ enfa.E[i] }, `;
                else
                    inputs += `${ enfa.E[i]} }`; 
            }

            $('#output > .results > .inputs').text(inputs);

            let setofstates = `{ `;

            for (let i = 0; i < enfa.Q.length; i++) {

                if (i != enfa.Q.length - 1)
                    setofstates += `${ enfa.Q[i] }, `;
                else
                    setofstates += `${ enfa.Q[i] } }`;
            }

            $('#output > .results > .states').text(setofstates);

            $('#output > .results > .initial-state').text(0);

            let finalstates = `{ `;

            for (let i = 0; i < enfa.F.length; i++) {

                if (i != enfa.F.length - 1)
                    finalstates += `${ enfa.F[i] }, `;
                else
                    finalstates += `${ enfa.F[i] } }`;
            }

            $('#output > .results > .final-states').text(finalstates);
        }
    });
};

$(document).ready(main());