var EventEmitter = require("@nathanfaucett/event_emitter"),
    keyMirror = require("@nathanfaucett/key_mirror");


var PanelStore = module.exports = new EventEmitter(-1),

    EVENT_CHANGE = "change",

    consts = PanelStore.consts = keyMirror([
        "PANEL_CREATE",
        "PANEL_UPDATE",
        "PANEL_DELETE"
    ]),

    _id = 1,
    _panels = {};


function create(divider) {
    var panel = {
        id: _id++,
        divider: divider
    };

    _panels[panel.id] = panel;
}

function destroy(id) {
    delete _panels[id];
}

PanelStore.toJSON = function() {
    return _panels.slice();
};

PanelStore.fromJSON = function(json) {
    _panels = json;
};

PanelStore.getDivider = function(id) {
    var panel = _panels[id];

    if (panel) {
        return panel.divider;
    }
};

PanelStore.setDivider = function(id, divider) {
    var panel = _panels[id];

    if (panel) {
        panel.divider = divider;
    }
};

PanelStore.addChangeListener = function(callback) {
    this.on(EVENT_CHANGE, callback);
};

PanelStore.removeChangeListener = function(callback) {
    this.off(EVENT_CHANGE, callback);
};

PanelStore.emitChange = function() {
    this.emit(EVENT_CHANGE);
};

PanelStore.registerCallback = function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case consts.PANEL_CREATE:
            create();
            PanelStore.emitChange();
            break;
        case consts.PANEL_DELETE:
            destroy(action.id);
            PanelStore.emitChange();
            break;
    }
};
