var virt = require("virt"),
    clamp = require("clamp"),
    propTypes = require("prop_types"),
    Divider = require("./Divider");


var PanelPrototype;


module.exports = Panel;


function Panel(props, children, context) {
    var _this = this;

    if (process.env.NODE_ENV !== "production") {
        if (
            (props.left && !props.right) ||
            (props.right && !props.left) ||
            (props.top && !props.bottom) ||
            (props.bottom && !props.top) ||
            (props.top && (props.left || props.right)) ||
            (props.bottom && (props.left || props.right)) ||
            (props.content && (props.left || props.right || props.top || props.bottom))
        ) {
            throw new Error("Panel(props, children, context) invalid props, left must have right, top must have bottom");
        }
    }

    virt.Component.call(this, props, children, context);

    this.state = {
        divider: clampDivider(props.divider, props)
    };

    this.onDrag = function(delta) {
        return _this.__onDrag(delta);
    };
}
virt.Component.extend(Panel, "virt-ui-Panel");

Panel.propTypes = {
    divider: propTypes.number,
    min: propTypes.number,
    max: propTypes.number,
    minPixel: propTypes.number,
    maxPixel: propTypes.number,
    width: propTypes.number,
    height: propTypes.number,
    content: propTypes.object,
    left: propTypes.object,
    right: propTypes.object,
    top: propTypes.object,
    bottom: propTypes.object
};

Panel.contextTypes = {
    muiTheme: propTypes.implement({
        styles: propTypes.implement({
            panel: propTypes.implement({
                backgroundColor: propTypes.string.isRequired,
                borderColor: propTypes.string.isRequired
            }).isRequired
        }).isRequired
    }).isRequired
};

Panel.defaultProps = {
    divider: 0.5,
    min: 0.1,
    max: 0.9,
    minPixel: NaN,
    maxPixel: NaN,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    content: null,
    left: null,
    right: null,
    top: null,
    bottom: null
};

PanelPrototype = Panel.prototype;

PanelPrototype.__onDrag = function(delta) {
    var props = this.props,
        vertical = props.left && props.right,
        divider = 0;

    if (vertical) {
        divider = delta / props.width;
    } else {
        divider = delta / props.height;
    }

    this.setState({
        divider: clampDivider(this.state.divider + divider, props)
    });
};

function clampDivider(divider, props) {
    var vertical = props.left && props.right,
        scalar = (vertical ? props.width : props.height),
        min = props.min,
        max = props.max,
        minPixel = props.minPixel,
        maxPixel = props.maxPixel;

    if ((minPixel || maxPixel) && scalar) {
        minPixel = minPixel || (min * scalar);
        maxPixel = maxPixel || (max * scalar);
        min = minPixel / scalar;
        max = maxPixel / scalar;
    }

    return clamp(divider, min, max);
}

PanelPrototype.getTheme = function() {
    return this.context.muiTheme.styles.panel;
};

PanelPrototype.getStyles = function() {
    var props = this.props,
        styles = {
            root: {
                backgroundColor: this.getTheme().backgroundColor,
                zIndex: 1000,
                position: "absolute",
                left: props.x + "px",
                top: props.y + "px",
                width: props.width + "px",
                height: props.height + "px"
            }
        };

    return styles;
};

PanelPrototype.renderChildren = function() {
    var props = this.props,
        divider = clampDivider(this.state.divider, props),
        vertical = props.left && props.right,
        width = props.width,
        height = props.height,
        children = this.children,
        content = props.content,
        leftChild = props.left || props.top,
        rightChild = props.right || props.bottom,
        renderChildren, renderLeftChild, renderRightChild;

    if (content) {
        return content;
    } else if (children.length) {
        return children;
    } else {
        renderChildren = new Array(3);

        renderLeftChild = virt.cloneView(leftChild, {
            x: 0,
            y: 0,
            width: vertical ? (width * divider) : width,
            height: vertical ? height : (height * divider)
        });

        renderRightChild = virt.cloneView(rightChild, {
            x: vertical ? renderLeftChild.props.width : 0,
            y: vertical ? 0 : renderLeftChild.props.height,
            width: vertical ? (width * (1 - divider)) : width,
            height: vertical ? height : (height * (1 - divider))
        });

        renderChildren[0] = renderLeftChild;
        renderChildren[1] = virt.createView(Divider, {
            x: renderRightChild.props.x,
            y: renderRightChild.props.y,
            vertical: !!vertical,
            onDrag: this.onDrag
        });
        renderChildren[2] = renderRightChild;

        return renderChildren;
    }
};

PanelPrototype.render = function() {
    var styles = this.getStyles();

    return (
        virt.createView("div", {
            className: "virt-ui-Panel",
            style: styles.root
        }, this.renderChildren())
    );
};
