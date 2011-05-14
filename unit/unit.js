// Not sure why this isn't set by default in qunit.js..
QUnit.jsDump.HTML = false;

$(function() { // START CLOSURE

    $('#jq_version').html($.fn.jquery);

    var event_name = "click";

    test(event_name, function() {
        // expect( 21 );

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

//        ok($.data(document, 'events') == undefined, event_name + '-specific ' + originating_event_name + ' event should not be bound to document yet');


        bound.outside(event_name, 'live', function(e) {
            elems.push(this);
            targets.push(e.target);
        });

        //  equals( $.data( document, 'events' )[ event_name ][0].namespace, event_name +'-special-event', event_name + '-specific ' + event_name + ' event should be bound to document' );


        elems = [];
        targets = [];
        $(a).trigger(event_name);
        same(targets, [a,a,a,a,a], 'target should be the ' + event_name + ' event target element');
        same(elems, [a1,b,b1,b2,c], 'event should have been triggered on these elements');

        ok(true, "trigger on a element ok");

        elems = [];
        targets = [];
        $(a1).trigger(event_name);
        same(targets, [a1,a1,a1,a1], 'target should be the ' + event_name + ' event target element');
        same(elems, [b,b1,b2,c], 'event should have been triggered on these elements');

        ok(true, "trigger on a1 element ok");

        elems = [];
        targets = [];
        $(b).trigger(event_name);
        same(targets, [b,b,b,b,b], 'target should be the ' + event_name + ' event target element');
        same(elems, [a,a1,b1,b2,c], 'event should have been triggered on these elements');

        ok(true, "trigger on b element ok");

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

        $(a).add(a1).outside(event_name, 'die');

        elems = [];
        targets = [];
        $(body).trigger(event_name);
        same(targets, [body,body,body,body], 'target should be the ' + event_name + ' event target element');
        same(elems, [b,b1,b2,c], 'event should have been triggered on these elements');

        // bound.unbind( event_name );


//        $(".a2-live").outside(event_name, "live", function(e) {
//            //alert("live live live works");
//            elems.push(this);
//            targets.push(e.target);
//        });
//
//        var a2 = $('<div id="a2" class="a2-live"></div>').appendTo(a);
//        a2 = a2[0];
//
//        elems = [];
//        targets = [];
//        $(c).trigger(event_name);
//        same(targets, [c], 'target should be the ' + event_name + ' event target element');
//        same(elems, [a2], 'event should have been triggered on these elements');
//
//        elems = [];
//        targets = [];
//        $(a2).trigger(event_name);
//        same(targets, [], 'should not be triggered at all');
//        same(elems, [], 'should not be triggered at all');
//
//
//        $(".a2-live").outside(event_name, "die");
//        $(".a2-live").remove();
//
//        a2 = $('<div id="a3" class="a2-live"><div id="a4" class="a2-live"></div></div>').appendTo(a);
//        var a3 = $("#a3")[0];
//        var a4 = $("#a4")[0];
//
//        $(".a2-live").outside(event_name, "live", function(e) {
//            elems.push(this);
//            targets.push(e.target);
//        });
//
//        elems = [];
//        targets = [];
//        $(a4).trigger(event_name);
//        same(targets, [a4]);
//        same(elems, [a3]);
//
//
//            $(".a2-live").outside(event_name, "die");
        ////////////////////////////////////////////////

        bound.outside(event_name, "die");
        elems = [];
        targets = [];
        $(body).trigger(event_name);
        same(targets, [], 'event should not trigger');
        same(elems, [], 'event should not trigger');

        div.remove();
    });


}); // END CLOSURE
