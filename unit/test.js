function liveHandler(event) {
    var stop, elems = [], selectors = [], args = arguments, related, match, handleObj, elem, j, i, l, data, events = jQuery.data(this, "events");
    if (event.liveFired === this ||
        !events || !events.live || event.button && event.type === "click") {
        return;
    }
    event.liveFired = this;
    var live = events.live.slice(0);
    for (j = 0; j < live.length; j++) {
        handleObj = live[j];
        if (handleObj.origType.replace(rnamespaces, "") === event.type) {
            selectors.push(handleObj.selector);
        } else {
            live.splice(j--, 1);
        }
    }
    match = jQuery(event.target).closest(selectors, event.currentTarget);
    for (i = 0, l = match.length; i < l; i++) {
        for (j = 0; j < live.length; j++) {
            handleObj = live[j];
            if (match[i].selector === handleObj.selector) {
                elem = match[i].elem;
                related = null;
                if (handleObj.preType === "mouseenter" ||
                    handleObj.preType === "mouseleave") {
                    related = jQuery(event.relatedTarget).closest(handleObj.selector)[0];
                }
                if (!related || related !== elem) {
                    elems.push({elem: elem, handleObj: handleObj});
                }
            }
        }
    }
    for (i = 0, l = elems.length; i < l; i++) {
        match = elems[i];
        event.currentTarget = match.elem;
        event.data = match.handleObj.data;
        event.handleObj = match.handleObj;
        if (match.handleObj.origHandler.apply(match.elem, args) === false) {
            stop = false;
            break;
        }
    }
    return stop;
}