/*!
 * Test cases are borrowed from jQuery Outside Events project by Ben Alman
 *
 * http://benalman.com/projects/jquery-outside-events-plugin/
 *
 */


// Not sure why this isn't set by default in qunit.js..
QUnit.jsDump.HTML = false;

$(function() { // START CLOSURE

    $('#jq_version').html($.fn.jquery);

    var events = [
        // Default "outside" events.
        { outside: 'clickoutside',      originating: 'click' },
        { outside: 'dblclickoutside',   originating: 'dblclick' },
        { outside: 'focusoutside',      originating: 'focusin' },
        { outside: 'bluroutside',       originating: 'focusout' },
        { outside: 'mousemoveoutside',  originating: 'mousemove' },
        { outside: 'mousedownoutside',  originating: 'mousedown' },
        { outside: 'mouseupoutside',    originating: 'mouseup' },
        { outside: 'mouseoveroutside',  originating: 'mouseover' },
        { outside: 'mouseoutoutside',   originating: 'mouseout' },
        { outside: 'keydownoutside',    originating: 'keydown' },
        { outside: 'keypressoutside',   originating: 'keypress' },
        { outside: 'keyupoutside',      originating: 'keyup' },
        { outside: 'changeoutside',     originating: 'change' },
        { outside: 'selectoutside',     originating: 'select' },
        { outside: 'submitoutside',     originating: 'submit' },

        // A custom "outside" event.
        { outside: 'super-duper-awesome-outside', originating: 'omg-ponies' }
    ];

//test( '$.addOutsideEvent', function() {
//  expect( 1 );
//
//  $.addOutsideEvent( 'omg-ponies', 'super-duper-awesome-outside' );
//
//  ok( !!$.event.special[ 'super-duper-awesome-outside' ], 'custom super-duper-awesome-outside event has been initialized' );
//});

    $.map(events, function(e) {
        var event_name = e.originating,
                originating_event_name = e.originating;

        test(event_name, function() {
            //  expect( 21 );

            var div = $('<div><div id="a"><div id="a1"></div></div><div id="b"><div id="b1"><div id="b2"></div></div></div><div id="c"></div></div>').appendTo('body'),
                    bound = div.find('*'),
                    a = $('#a')[0],
                    a1 = $('#a1')[0],
                    b = $('#b')[0],
                    b1 = $('#b1')[0],
                    b2 = $('#b2')[0],
                    c = $('#c')[0],
                    body = $('body')[0],
                    elems,
                    targets;

            // ok( $.data( document, 'events' ) == undefined, event_name + '-specific ' + event_name + ' event should not be bound to document yet' );

            var handler = function(e) {
                elems.push(this);
                targets.push(e.target);
            };

            bound.outside(event_name, 'bind', handler);

            //  equals( $.data( document, 'events' )[ event_name ][0].namespace, event_name +'-special-event', event_name + '-specific ' + event_name + ' event should be bound to document' );

            elems = [];
            targets = [];
            $(a).trigger(event_name);
            same(targets, [a,a,a,a,a], 'target should be the ' + event_name + ' event target element');
            same(elems, [a1,b,b1,b2,c], 'event should have been triggered on these elements');

            elems = [];
            targets = [];
            $(a1).trigger(event_name);
            same(targets, [a1,a1,a1,a1], 'target should be the ' + event_name + ' event target element');
            same(elems, [b,b1,b2,c], 'event should have been triggered on these elements');

            elems = [];
            targets = [];
            $(b).trigger(event_name);
            same(targets, [b,b,b,b,b], 'target should be the ' + event_name + ' event target element');
            same(elems, [a,a1,b1,b2,c], 'event should have been triggered on these elements');

            elems = [];
            targets = [];
            $(b1).trigger(event_name);
            same(targets, [b1,b1,b1,b1], 'target should be the ' + event_name + ' event target element');
            same(elems, [a,a1,b2,c], 'event should have been triggered on these elements');

            elems = [];
            targets = [];
            $(b2).trigger(event_name);
            same(targets, [b2,b2,b2], 'target should be the ' + event_name + ' event target element');
            same(elems, [a,a1,c], 'event should have been triggered on these elements');

            elems = [];
            targets = [];
            $(c).trigger(event_name);
            same(targets, [c,c,c,c,c], 'target should be the ' + event_name + ' event target element');
            same(elems, [a,a1,b,b1,b2], 'event should have been triggered on these elements');

            elems = [];
            targets = [];
            $(body).trigger(event_name);
            same(targets, [body,body,body,body,body,body], 'target should be the ' + event_name + ' event target element');
            same(elems, [a,a1,b,b1,b2,c], 'event should have been triggered on these elements');

            $(a).add(a1).outside(event_name, 'unbind');

            elems = [];
            targets = [];
            $(body).trigger(event_name);
            same(targets, [body,body,body,body], 'target should be the ' + event_name + ' event target element');
            same(elems, [b,b1,b2,c], 'event should have been triggered on these elements');


            $(".active:even").outside(event_name, 'live', handler);

            $(a).append('<div id="active0" class="active"></div><div id="active1" class="active"></div><div id="active2" class="active"></div><div id="active3" class="active"></div>');

            var active0 = $("#active0")[0],
                    active1 = $("#active1")[0],
                    active2 = $("#active2")[0],
                    active3 = $("#active3")[0];



            elems = [];
            targets = [];
            $(body).trigger(event_name);
            same(targets, [body,body,body,body,body,body], 'target should be the ' + event_name + ' event target element');
            same(elems, [b,b1,b2,c,active0,active2], 'event should have been triggered on these elements');


            $("#active2").outside(event_name, 'die');
            $("#active3").outside(event_name, 'live', handler);
            elems = [];
            targets = [];
            $(body).trigger(event_name);
            same(targets, [body,body,body,body,body,body], 'target should be the ' + event_name + ' event target element');
            same(elems, [b,b1,b2,c,active0,active3], 'event should have been triggered on these elements');



            $(".active").outside(event_name, 'die');
            elems = [];
            targets = [];
            $(body).trigger(event_name);
            same(targets, [body,body,body,body], 'target should be the ' + event_name + ' event target element');
            same(elems, [b,b1,b2,c], 'event should have been triggered on these elements');

            bound.outside(event_name, 'die');

            // ok( $.data( document, 'events' ) == undefined, event_name +'-specific ' + event_name + ' event should no longer be bound to document' );

            elems = [];
            targets = [];
            $(body).trigger(event_name);
            same(targets, [], 'event should not trigger');
            same(elems, [], 'event should not trigger');

            div.remove();

        });

    });


}); // END CLOSURE
