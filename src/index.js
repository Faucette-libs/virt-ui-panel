var virt = require("@nathanfaucett/virt"),
    clamp = require("@nathanfaucett/clamp"),
    propTypes = require("@nathanfaucett/prop_types"),
    isNumber = require("@nathanfaucett/is_number"),
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
    onResize: propTypes.func,
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
    bottom: propTypes.object,
    style: propTypes.object
};

Panel.contextTypes = {
    theme: propTypes.implement({
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
    min: NaN,
    max: NaN,
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
    bottom: null,
    style: {}
};

PanelPrototype = Panel.prototype;

PanelPrototype.__onDrag = function(offset) {
    var props = this.props,
        vertical = props.left && props.right,
        divider = 0;

    if (vertical) {
        divider = offset / props.width;
    } else {
        divider = offset / props.height;
    }

    divider = clampDivider(divider, props);

    if (props.onResize) {
        props.onResize(divider);
    }

    this.setState({
        divider: divider
    });
};

function clampDivider(divider, props) {
    var vertical = props.left && props.right,
        min = props.min,
        max = props.max,
        minPixel = props.minPixel,
        maxPixel = props.maxPixel,
        scalar = (vertical ? props.width : props.height);

    if (scalar) {
        if (minPixel) {
            minPixel = minPixel || (min * scalar);
            min = minPixel / scalar;
        }
        if (maxPixel) {
            maxPixel = maxPixel || (max * scalar);
            max = maxPixel / scalar;
        }
    }

    if (min || max) {
        if (!max) {
            return clamp(divider, min, 1);
        } else if (!min) {
            return clamp(divider, 0, max);
        } else {
            return clamp(divider, min, max);
        }
    } else {
        return clamp(divider, 0, 1);
    }
}

PanelPrototype.getTheme = function() {
    return this.context.theme.styles.panel;
};

PanelPrototype.getStyles = function() {
    var props = this.props,
        style = props.style,
        styles = {
            root: {
                backgroundColor: style.backgroundColor || this.getTheme().backgroundColor,
                zIndex: isNumber(style.zIndex) ? style.zIndex : 1000,
                position: style.position || "absolute",
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
        renderChildren, renderLeftChild, renderRightChild, leftProps, rightProps;

    if (content) {
        return content;
    } else if (children.length) {
        return children;
    } else {
        renderChildren = new Array(3);

        leftProps = {
            x: 0,
            y: 0,
            width: vertical ? (width * divider) : width,
            height: vertical ? height : (height * divider)
        };
        if (leftChild.type === Panel) {
            renderLeftChild = virt.cloneView(leftChild, leftProps);
        } else {
            renderLeftChild = virt.createView(Panel, leftProps, virt.cloneView(leftChild));
        }

        rightProps = {
            x: vertical ? renderLeftChild.props.width : 0,
            y: vertical ? 0 : renderLeftChild.props.height,
            width: vertical ? (width * (1 - divider)) : width,
            height: vertical ? height : (height * (1 - divider))
        };
        if (rightChild.type === Panel) {
            renderRightChild = virt.cloneView(rightChild, rightProps);
        } else {
            renderRightChild = virt.createView(Panel, rightProps, virt.cloneView(rightChild));
        }

        renderChildren[0] = renderLeftChild;
        renderChildren[1] = virt.createView(Divider, {
            panel: this,
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
