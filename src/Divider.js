var virt = require("virt"),
    propTypes = require("prop_types");


var DividerPrototype;


module.exports = Divider;


function Divider(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.dragging = false;
    this.previous = NaN;

    this.onMouseDown = function(e) {
        return _this.__onMouseDown(e);
    };
    this.onMouseUp = function(e) {
        return _this.__onMouseUp(e);
    };
    this.onMouseMove = function(e) {
        return _this.__onMouseMove(e);
    };
}
virt.Component.extend(Divider, "virt-ui-Divider");

DividerPrototype = Divider.prototype;

Divider.propTypes = {
    x: propTypes.number,
    y: propTypes.number,
    vertical: propTypes.bool,
    onDrag: propTypes.func.isRequired
};

Divider.defaultProps = {
    x: 0,
    y: 0,
    vertical: false
};

DividerPrototype.getTheme = function() {
    return this.context.muiTheme.styles.panel;
};

DividerPrototype.__onMouseDown = function() {
    this.dragging = true;
};
DividerPrototype.__onMouseUp = function() {
    if (this.dragging) {
        this.dragging = false;
        this.previous = NaN;
    }
};
DividerPrototype.__onMouseMove = function(e) {
    var props = this.props,
        delta, tmp;

    if (this.dragging) {
        if (props.vertical) {
            delta = e.pageX;
        } else {
            delta = e.pageY;
        }
        tmp = delta;

        if (!this.previous) {
            this.previous = delta;
        }

        delta = delta - this.previous;
        this.previous = tmp;

        props.onDrag(delta);
    }
};

DividerPrototype.componentDidMount = function() {
    this.onGlobalEvent("onMouseMove", this.onMouseMove);
    this.onGlobalEvent("onMouseUp", this.onMouseUp);
    this.onGlobalEvent("onBlur", this.onMouseUp);
};

DividerPrototype.componentWillUnmount = function() {
    this.offGlobalEvent("onMouseMove", this.onMouseMove);
    this.offGlobalEvent("onMouseUp", this.onMouseUp);
    this.offGlobalEvent("onBlur", this.onMouseUp);
};

DividerPrototype.getStyles = function() {
    var props = this.props,
        vertical = props.vertical,
        styles = {
            root: {
                position: "absolute",
                zIndex: 1001,
                left: (vertical ? props.x - 4 : props.x) + "px",
                top: (vertical ? props.y : props.y - 4) + "px"
            },
            bar: {
                position: "absolute"
            },
            innerBar: {
                position: "absolute",
                backgroundColor: "#000"
            }
        };

    if (vertical) {
        styles.root.cursor = "ew-resize";

        styles.innerBar.height = styles.bar.height = styles.root.height = "100%";
        styles.bar.width = styles.root.width = "9px";
        styles.innerBar.width = "1px";
        styles.innerBar.left = "4px";
    } else {
        styles.root.cursor = "ns-resize";

        styles.innerBar.width = styles.bar.width = styles.root.width = "100%";
        styles.bar.height = styles.root.height = "9px";
        styles.innerBar.height = "1px";
        styles.innerBar.top = "4px";
    }

    return styles;
};

DividerPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
                className: "Divider",
                style: styles.root,
                onMouseDown: this.onMouseDown
            },
            virt.createView("div", {
                    style: styles.bar
                },
                virt.createView("div", {
                    style: styles.innerBar
                })
            )
        )
    );
};
