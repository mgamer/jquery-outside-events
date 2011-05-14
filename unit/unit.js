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

        $(".a2-live").outside(event_name, "live", function(e) {
            //alert("live live live works");
            elems.push(this);
            targets.push(e.target);
        });

        var a2 = $('<div id="a2" class="a2-live"></div>').appendTo(a);
        a2 = a2[0];

        elems = [];
        targets = [];
        $(c).trigger(event_name);
        same(targets, [c], 'target should be the ' + event_name + ' event target element');
        same(elems, [a2], 'event should have been triggered on these elements');

        elems = [];
        targets = [];
        $(a2).trigger(event_name);
        same(targets, [], 'should not be triggered at all');
        same(elems, [], 'should not be triggered at all');


        $(".a2-live").outside(event_name, "die");
        $(".a2-live").remove();

        a2 = $('<div id="a3" class="a2-live"><div id="a4" class="a2-live"></div></div>').appendTo(a);
        var a3 = $("#a3")[0];
        var a4 = $("#a4")[0];

        $(".a2-live").outside(event_name, "live", function(e) {
            elems.push(this);
            targets.push(e.target);
        });

        elems = [];
        targets = [];
        $(a4).trigger(event_name);
        same(targets, [a4]);
        same(elems, [a3]);


            $(".a2-live").outside(event_name, "die");
        ////////////////////////////////////////////////

        elems = [];
        targets = [];
        $(body).trigger(event_name);
        same(targets, [], 'event should not trigger');
        same(elems, [], 'event should not trigger');

        div.remove();
    });


}); // END CLOSURE
