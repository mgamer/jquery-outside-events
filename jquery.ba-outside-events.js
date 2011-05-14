(function(jQuery, document) {

    var bindings = {};
    var live_handler = {};

    jQuery.fn.outside = function(event_name, attach_method, handler) {

        if (attach_method == 'live') {

            if (live_handler[event_name] == null) {
                live_handler[event_name] = liveOutsideHandlerFactory();
                $(document).bind(event_name, live_handler[event_name]);
            }

            bindings[event_name] = bindings[event_name] || [];
            bindings[event_name].push({
                targetSelector: this.selector,
                targetElements: this,
                without: [],
                handler: handler
            });

        }

        if (attach_method == 'die') {
            var _that = this;
            $.each(bindings[event_name], function(idx, elem) {
                elem.without.push(_that.selector || _that);
            });
        }

        function liveOutsideHandlerFactory() {
            return function(event) {
                var event_name = event.type;

                if (bindings[event_name]) {
                    $.each(bindings[event_name], function(idx, binding) {
                        var handler = binding.handler;
                        var target_elements = $(binding.targetElements || $(binding.targetSelector));

                        $.each(binding.without, function(idx, elem) {
                            target_elements = target_elements.not($(elem));
                        });

                        target_elements.each(function(idx, elem) {

                            if (elem != event.target && !$(elem).has(event.target).length) {

                                handler.apply(elem, [event]);
                            }
                        });
                    });

                }
            }
        }


    };
})(jQuery, document);