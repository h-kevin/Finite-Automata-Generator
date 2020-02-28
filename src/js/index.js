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

        /**
         * Example values to test the program.
         * 
         * enfa.E = ['$', '0', '1'];
         * enfa.Q = [0, 1, 2];
         * enfa.iState = 0;
         * enfa.F = [2];
         * 
         * enfa.transitions[0][0] = [0];
         * enfa.transitions[0]['$'] = [1];
         * enfa.transitions[1][1] = [1];
         * enfa.transitions[1]['$'] = [2];
         * enfa.transitions[2][0] = [2];
         * enfa.transitions[2][1] = [2];
         */

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

            if(enfa.Q.length > 10) {

                let transitions = `${ selection_string } .input-transitions > .transition-container`;

                $(`${ transitions } > .states > button, ${ transitions } > .inputs > button,
                    ${ transitions } > .outputs > button`).attr('class', 'overten');
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

        let array = [$(fields[0]).val().replace('ε', '$')];

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

                if (enfa.Q.length <= 10) {

                    $(`${ transitions } > .states`).append(`<button type="button">q${ i }</button>`);
                    $(`${ transitions } > .outputs`).append(`<button type="button">q${ i }</button>`);
                } else {

                    $(`${ transitions } > .states`).append(
                        `<button class="overten" type="button">q${ i }</button>`);
                    $(`${ transitions } > .outputs`).append(
                        `<button class="overten" type="button">q${ i }</button>`);
                }
            }

            for (let i = 1; i < enfa.E.length; i++) {

                if(enfa.Q.length <= 10) {
                    
                    $(`${ transitions } > .inputs`).append(
                        `<button type="button">${ enfa.E[i] }</button>`);
                } else {

                    $(`${ transitions } > .inputs`).append(
                        `<button class="overten" type="button">${ enfa.E[i] }</button>`);
                }
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

        state = $(this).text().replace('q', '');
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

        output = $(this).text().replace('q', '');

        if (state != null && input != null) {

            let a = `q${ state }`;
            let b = (input == '$') ? 'ε' : input;
            let c = `q${ output }`;

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

            nfa = new Nfa(JSON.parse(JSON.stringify(enfa)));

            $(selector).css('box-shadow', '0 0 10px var(--oslo-gray-blurred)');
            $(selector).css('border', '1px solid var(--oslo-gray)');

            let scrollPos = $('html, body').height() * 7;
    
            $('html, body').animate({
    
                scrollTop: scrollPos
            }, 1000);

            $('html, body').css('background', 'var(--outer-space)');

            let inputs = `{ `;

            inputs += `ε, `;

            for (let i = 1; i < enfa.E.length; i++) {

                if (i != enfa.E.length - 1)
                    inputs += `${ enfa.E[i] }, `;
                else
                    inputs += `${ enfa.E[i] } }`; 
            }

            $('#output > .results > .inputs').text(inputs);

            let setofstates = `{ `;

            for (let i = 0; i < enfa.Q.length; i++) {

                if (i != enfa.Q.length - 1)
                    setofstates += `q${ enfa.Q[i] }, `;
                else
                    setofstates += `q${ enfa.Q[i] } }`;
            }

            $('#output > .results > .states').text(setofstates);

            $('#output > .results > .initial-state').text('q0');

            let finalstates = `{ `;

            for (let i = 0; i < enfa.F.length; i++) {

                if (i != enfa.F.length - 1)
                    finalstates += `q${ enfa.F[i] }, `;
                else
                    finalstates += `q${ enfa.F[i] } }`;
            }

            $('#output > .results > .final-states').text(finalstates);

            let transitions = ``;
            let states = Object.keys(enfa.transitions);

            for (let state of states) {

                if (enfa.transitions[state]) {

                    for (let input of enfa.E) {

                        if (enfa.transitions[state][input]) {
    
                            transitions += `<p>δ (q${ state }, ${ input.replace('$', 'ε') }) = `;
    
                            if (enfa.transitions[state][input].length == 1) {
    
                                transitions += `q${ enfa.transitions[state][input] }</p>`;
                            } else if (enfa.transitions[state][input].length > 1) {
    
                                transitions += `{ q${ enfa.transitions[state][input][0] }`;
    
                                let array = Object.values(enfa.transitions[state][input]);

                                for (let element of array) {
    
                                    if (element != enfa.transitions[state][input][0])
                                        transitions += `, q${ element }`;
                                }
    
                                transitions += ` }</p>`;
                            }
                        }
                    }
                }
            }

            $('#output > .results > .transitions > .text-area').html(transitions);
        }
    });

    // generating output

    let clickcount = 0;

    $('#output > .results > .toggle-transitions').click(function () {

        if (clickcount % 2 == 0) {
            
            $('#output > .results > .paragraph, #output > .results > .field').fadeOut(500, function () {
                
                $('#output > .results > .transitions').fadeIn('300');
            });
            
            clickcount++;
        } else {

            $('#output > .results > .transitions').fadeOut(500, function () {
                
                $('#output > .results > .paragraph, #output > .results > .field').fadeIn('300');
            });

            clickcount = 0;
        }
    });

    // transforming

    let outputstage = 0;

    $('#output > .results > .transform-minimize-reset').click(function () {

        if (outputstage == 0) {

            $(`#output > .results, #output > .results > .transitions`).fadeOut(1000, function () {

                $('#output > .results > .header').text(`The NFA`);

                let inputs = `{ `;

                for (let i = 0; i < nfa.E.length; i++) {

                    if (i != nfa.E.length - 1)
                        inputs += `${ nfa.E[i] }, `;
                    else
                        inputs += `${ nfa.E[i] } }`; 
                }

                $('#output > .results > .inputs').text(inputs);

                let setofstates = `{ `;

                for (let i = 0; i < nfa.Q.length; i++) {

                    if (i != nfa.Q.length - 1)
                        setofstates += `q${ nfa.Q[i] }, `;
                    else
                        setofstates += `q${ nfa.Q[i] } }`;
                }

                $('#output > .results > .states').text(setofstates);

                $('#output > .results > .initial-state').text('q0');

                let finalstates = `{ `;

                for (let i = 0; i < nfa.F.length; i++) {

                    if (i != nfa.F.length - 1)
                        finalstates += `q${ nfa.F[i] }, `;
                    else
                        finalstates += `q${ nfa.F[i] } }`;
                }

                $('#output > .results > .final-states').text(finalstates);

                let transitions = ``;
                let states = Object.keys(nfa.transitions);

                for (let state of states) {

                    if (nfa.transitions[state]) {

                        for (let input of nfa.E) {

                            if (nfa.transitions[state][input] && nfa.transitions[state][input].length > 0) {
        
                                transitions += `<p>δ (q${ state }, ${ input }) = `;
        
                                if (nfa.transitions[state][input].length == 1) {
        
                                    transitions += `q${ nfa.transitions[state][input] }</p>`;
                                } else if (nfa.transitions[state][input].length > 1) {
        
                                    transitions += `{ q${ nfa.transitions[state][input][0] }`;
        
                                    let array = Object.values(nfa.transitions[state][input]);

                                    for (let element of array) {
        
                                        if (element != nfa.transitions[state][input][0])
                                            transitions += `, q${ element }`;
                                    }
        
                                    transitions += ` }</p>`;
                                }
                            }
                        }
                    }
                }

                $('#output > .results > .transitions > .text-area').html(transitions);

                dfa = new Dfa(JSON.parse(JSON.stringify(nfa)));

                $(`#output > .results, #output > .results > .paragraph,
                    #output > .results > .field`).fadeIn('300');
            });

            clickcount = 0;
            outputstage++;
        } else if (outputstage == 1) {

            $(`#output > .results, #output > .results > .transitions`).fadeOut(1000, function () {

                $('#output > .results > .header').text(`The DFA`);

                let inputs = `{ `;

                for (let i = 0; i < dfa.E.length; i++) {

                    if (i != dfa.E.length - 1)
                        inputs += `${ dfa.E[i] }, `;
                    else
                        inputs += `${ dfa.E[i] } }`; 
                }

                $('#output > .results > .inputs').text(inputs);

                let setofstates = `{ `;

                for (let i = 0; i < dfa.Q.length; i++) {

                    if (i != dfa.Q.length - 1)
                        setofstates += `q${ dfa.Q[i].replace(/,/g, 'q') }, `;
                    else
                        setofstates += `q${ dfa.Q[i].replace(/,/g, 'q') } }`;
                }

                $('#output > .results > .states').text(setofstates);

                $('#output > .results > .initial-state').text('q0');

                let finalstates = `{ `;

                for (let i = 0; i < dfa.F.length; i++) {

                    if (i != dfa.F.length - 1) {

                        if (dfa.F[i].length == 1)
                            finalstates += `q${ dfa.F[i] }, `;
                        else
                            finalstates += `q${ dfa.F[i].replace(/,/g, 'q') }, `;
                    } else {

                        if (dfa.F[i].length == 1)
                            finalstates += `q${ dfa.F[i] } }`;
                        else
                            finalstates += `q${ dfa.F[i].replace(/,/g, 'q') } }`;
                    }
                }

                $('#output > .results > .final-states').text(finalstates);

                let transitions = ``;
                let states = Object.keys(dfa.transitions);

                for (let state of states) {

                    if (dfa.transitions[state]) {

                        for (let input of dfa.E) {

                            if (dfa.transitions[state][input] && dfa.transitions[state][input].length > 0
                                    && dfa.transitions[state][input][0].toString() != '') {
        
                                transitions += `<p>δ (q${ state.replace(/,/g, 'q') }, ${ input }) = `;
        
                                if (dfa.transitions[state][input].length == 1) {
        
                                    if (dfa.transitions[state][input][0].length == 1)
                                        transitions += `q${ dfa.transitions[state][input][0] }</p>`;
                                    else
                                        transitions += 
                                            `q${ dfa.transitions[state][input][0].replace(/,/g, 'q') }</p>`;
                                } else if (dfa.transitions[state][input].length > 1) {
        
                                    if (dfa.transitions[state][input][0].length == 1)
                                        transitions += `{ q${ dfa.transitions[state][input][0] }`;
                                    else
                                    transitions += 
                                        `{ q${ dfa.transitions[state][input][0].replace(/,/g, 'q') }`;
        
                                    let array = Object.values(dfa.transitions[state][input]);

                                    for (let element of array) {
        
                                        if (element != dfa.transitions[state][input][0]) {

                                            if (element.length == 1)
                                                transitions += `{ q${ element }`;
                                            else
                                                transitions += `{ q${ element.replace(/,/g, 'q') }`;
                                        }
                                    }
        
                                    transitions += ` }</p>`;
                                }
                            }
                        }
                    }
                }

                $('#output > .results > .transitions > .text-area').html(transitions);

                $('#output > .results > .transform-minimize-reset').text('Minimize');
                
                mindfa = new MinimizeDfa(JSON.parse(JSON.stringify(dfa)));

                $(`#output > .results, #output > .results > .paragraph,
                    #output > .results > .field`).fadeIn('300');
            });

            clickcount = 0;
            outputstage++;
        } else if (outputstage == 2) {

            $(`#output > .results, #output > .results > .transitions`).fadeOut(1000, function () {

                $('#output > .results > .header').text(`The Minimized DFA`);

                let inputs = `{ `;

                for (let i = 0; i < mindfa.E.length; i++) {

                    if (i != mindfa.E.length - 1)
                        inputs += `${ mindfa.E[i] }, `;
                    else
                        inputs += `${ mindfa.E[i] } }`; 
                }

                $('#output > .results > .inputs').text(inputs);

                let setofstates = `{ `;

                for (let i = 0; i < mindfa.Q.length; i++) {

                    if (i != mindfa.Q.length - 1)
                        setofstates += `q${ mindfa.Q[i] }, `;
                    else
                        setofstates += `q${ mindfa.Q[i] } }`;
                }

                $('#output > .results > .states').text(setofstates);

                $('#output > .results > .initial-state').text(`q${ mindfa.iState }`);

                let finalstates = `{ `;

                for (let i = 0; i < mindfa.F.length; i++) {

                    if (i != mindfa.F.length - 1)

                        finalstates += `q${ mindfa.F[i] } , `;
                    else
                        finalstates += `q${ mindfa.F[i] } }`;
                }

                $('#output > .results > .final-states').text(finalstates);

                let transitions = ``;
                let states = Object.keys(mindfa.transitions);

                for (let state of states) {

                    if (mindfa.transitions[state]) {

                        for (let input of mindfa.E) {

                            if (mindfa.transitions[state][input]) {
        
                                transitions += `<p>δ (q${ state }; ${ input }) = `;
        
                                if (mindfa.transitions[state][input].length == 1)
                                    transitions += `q${ mindfa.transitions[state][input][0] }</p>`;
                                else if (mindfa.transitions[state][input].length > 1) {

                                    transitions += `{ q${ mindfa.transitions[state][input][0] }`;
        
                                    let array = Object.values(mindfa.transitions[state][input]);

                                    for (let element of array) {
        
                                        if (element != mindfa.transitions[state][input][0])
                                            transitions += `${ element }`;
                                    }
        
                                    transitions += ` }</p>`;
                                }
                            }
                        }
                    }
                }

                $('#output > .results > .transitions > .text-area').html(transitions);

                $('#output > .results > .transform-minimize-reset').text('Reset');

                $(`#output > .results, #output > .results > .paragraph,
                    #output > .results > .field`).fadeIn('300');
            });

            clickcount = 0;
            outputstage++;
        } else if (outputstage == 3) {

            $('html, body').animate({
    
                scrollTop: 0
            }, 1000, function () {

                location.reload();
            });

            $('html, body').css('background', 'var(--cloud-burst)');
        }
    });
};

$(document).ready(main());