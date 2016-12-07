(function(dependencies, chunks, undefined, global) {
    
    var cache = [],
        cacheCallbacks = {};
    

    function Module() {
        this.id = null;
        this.filename = null;
        this.dirname = null;
        this.exports = {};
        this.loaded = false;
    }

    Module.prototype.require = require;

    function require(index) {
        var module = cache[index],
            callback, exports;

        if (module !== undefined) {
            return module.exports;
        } else {
            callback = dependencies[index];

            cache[index] = module = new Module();
            exports = module.exports;

            callback.call(exports, require, exports, module, undefined, global);
            module.loaded = true;

            return module.exports;
        }
    }

    require.resolve = function(path) {
        return path;
    };

    
    require.async = function async(index, callback) {
        var module = cache[index],
            callbacks, node;

        if (module) {
            callback(module.exports);
        } else if ((callbacks = cacheCallbacks[index])) {
            callbacks[callbacks.length] = callback;
        } else {
            node = document.createElement("script");
            callbacks = cacheCallbacks[index] = [callback];

            node.type = "text/javascript";
            node.charset = "utf-8";
            node.async = true;

            function onLoad() {
                var i = -1,
                    il = callbacks.length - 1;

                while (i++ < il) {
                    callbacks[i](require(index));
                }
                delete cacheCallbacks[index];
            }

            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0)) {
                node.attachEvent("onreadystatechange", onLoad);
            } else {
                node.addEventListener("load", onLoad, false);
            }

            node.src = chunks[index];

            document.head.appendChild(node);
        }
    };

    global["hkMfgGSd-h1xW-4L5R-u7xm-s483vjNQ4gJI1"] = function(asyncDependencies) {
        var i = -1,
            il = asyncDependencies.length - 1,
            dependency, index;

        while (i++ < il) {
            dependency = asyncDependencies[i];
            index = dependency[0];

            if (dependencies[index] === null) {
                dependencies[index] = dependency[1];
            }
        }
    };

    

    if (typeof(define) === "function" && define.amd) {
        define([], function() {
            return require(0);
        });
    } else if (typeof(module) !== "undefined" && module.exports) {
        module.exports = require(0);
    } else {
        
        require(0);
        
    }
}([
function(require, exports, module, undefined, global) {
/*@=-/var/www/html/faucette/virt-ui-panel/example/src/index.js-=@*/
var virt = require(1),
    virtDOM = require(2),
    propTypes = require(3),
    Panel = require(4);


var AppPrototype;


function App(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.state = {
        size: {
            width: 0,
            height: 0
        }
    };

    this.onResize = function(data, next) {
        return _this.__onResize(data, next);
    };
}
virt.Component.extend(App, "App");
AppPrototype = App.prototype;

App.childContextTypes = {
    theme: propTypes.object.isRequired,
    size: propTypes.object.isRequired
};

AppPrototype.__onResize = function(data, next) {
    this.setState({
        size: data
    }, next);
};

AppPrototype.componentDidMount = function() {
    var _this = this;

    this.onMessage("virt.resize", this.onResize);

    this.emitMessage("virt.getDeviceDimensions", null, function(error, data) {
        if (!error) {
            _this.setState({
                size: data
            });
        }
    });
};

AppPrototype.componentWillUnmount = function() {
    RouteStore.removeChangeListener(this.onChange);
    this.offMessage("virt.resize", this.onResize);
};

AppPrototype.getChildContext = function() {
    return {
        size: this.state.size,
        theme: {
            styles: {
                panel: {
                    backgroundColor: "#eee",
                    borderColor: "#aaa"
                }
            }
        }
    };
};

AppPrototype.render = function() {
    var size = this.state.size;

    return (
        virt.createView("App", {
                style: {
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%"
                }
            },
            virt.createView(Panel, {
                width: size.width,
                height: size.height,
                minPixel: 49,
                max: 0.5,
                divider: (size.height ? 49 / size.height : 0),
                top: virt.createView(Panel, virt.createView("p", "Menu")),
                bottom: virt.createView(Panel, {
                    minPixel: 128,
                    max: 0.9,
                    divider: 0.25,
                    left: virt.createView(Panel, virt.createView("p", "Left")),
                    right: virt.createView(Panel, virt.createView("p", "Right"))
                })
            })
        )
    );
};

virtDOM.render(virt.createView(App), document.getElementById("app"));

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/index.js-=@*/
var View = require(5);


var virt = exports;


virt.Root = require(6);
virt.Component = require(7);

virt.View = View;
virt.cloneView = View.clone;
virt.createView = View.create;
virt.createFactory = View.createFactory;

virt.getChildKey = require(8);
virt.getRootIdFromId = require(9);

virt.consts = require(10);

virt.isAncestorIdOf = require(11);
virt.traverseAncestors = require(12);
virt.traverseDescendants = require(13);
virt.traverseTwoPhase = require(14);

virt.context = require(15);
virt.owner = require(16);
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/index.js-=@*/
var renderString = require(72),
    nativeDOMComponents = require(73),
    nativeDOMHandlers = require(74);


var virtDOM = exports;


virtDOM.virt = require(1);

virtDOM.addNativeComponent = function(type, constructorFn) {
    nativeDOMComponents[type] = constructorFn;
};
virtDOM.addNativeHandler = function(name, fn) {
    nativeDOMHandlers[name] = fn;
};

virtDOM.render = require(75);
virtDOM.unmount = require(76);

virtDOM.renderString = function(view, id) {
    return renderString(view, null, id || ".0");
};

virtDOM.findDOMNode = require(77);
virtDOM.findRoot = require(78);
virtDOM.findEventHandler = require(79);
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/prop_types@0.0.2/src/index.js-=@*/
var i18n = require(215),
    isArray = require(20),
    isRegExp = require(216),
    isNullOrUndefined = require(23),
    emptyFunction = require(38),
    isFunction = require(19),
    has = require(25),
    indexOf = require(57);


var propTypes = exports,
    defaultLocale = "en";


i18n = i18n.create(true, false);


i18n.add("en", {
    prop_types: {
        regexp: "Invalid %s of value %s supplied to %s, expected RexExp.",
        instance_of: "Invalid %s of type %s supplied to %s, expected instance of %s.",
        one_of: "Invalid %s of value %s supplied to %s, expected one of %s.",
        is_required: "Required %s was not specified in %s.",
        primitive: "Invalid %s of type %s supplied to %s expected %s.",
        anonymous: "anonymous"
    }
});


propTypes.createTypeChecker = createTypeChecker;

function createTypeChecker(validate) {

    function checkType(props, propName, callerName, locale) {
        if (isNullOrUndefined(props[propName])) {
            return null;
        } else {
            return validate(props, propName, callerName || ("<<" + i18n(locale || defaultLocale, "prop_types.anonymous") + ">>"), locale || defaultLocale);
        }
    }

    checkType.isRequired = function checkIsRequired(props, propName, callerName, locale) {
        callerName = callerName || ("<<" + i18n(locale || defaultLocale, "prop_types.anonymous") + ">>");

        if (isNullOrUndefined(props[propName])) {
            return new TypeError(i18n(locale || defaultLocale, "prop_types.is_required", propName, callerName));
        } else {
            return validate(props, propName, callerName, locale || defaultLocale);
        }
    };

    return checkType;
}

propTypes.array = createPrimitiveTypeChecker("array");
propTypes.bool = createPrimitiveTypeChecker("boolean");
propTypes["boolean"] = propTypes.bool;
propTypes.func = createPrimitiveTypeChecker("function");
propTypes["function"] = propTypes.func;
propTypes.number = createPrimitiveTypeChecker("number");
propTypes.object = createPrimitiveTypeChecker("object");
propTypes.string = createPrimitiveTypeChecker("string");

propTypes.regexp = createTypeChecker(function validateRegExp(props, propName, callerName, locale) {
    var propValue = props[propName];

    if (isRegExp(propValue)) {
        return null;
    } else {
        return new TypeError(i18n(locale || defaultLocale, "prop_types.regexp", propName, propValue, callerName));
    }
});

propTypes.instanceOf = function createInstanceOfCheck(expectedClass) {
    return createTypeChecker(function validateInstanceOf(props, propName, callerName, locale) {
        var propValue = props[propName],
            expectedClassName;

        if (propValue instanceof expectedClass) {
            return null;
        } else {
            expectedClassName = expectedClass.name || ("<<" + i18n(locale || defaultLocale, "prop_types.anonymous") + ">>");

            return new TypeError(
                i18n(locale || defaultLocale, "prop_types.instance_of", propName, getPreciseType(propValue), callerName, expectedClassName)
            );
        }
    });
};

propTypes.any = createTypeChecker(emptyFunction.thatReturnsNull);

propTypes.oneOf = function createOneOfCheck(expectedValues) {
    return createTypeChecker(function validateOneOf(props, propName, callerName, locale) {
        var propValue = props[propName];

        if (indexOf(expectedValues, propValue) !== -1) {
            return null;
        } else {
            return new TypeError(
                i18n(locale || defaultLocale, "prop_types.one_of", propName, propValue, callerName, JSON.stringify(expectedValues))
            );
        }
    });
};

propTypes.arrayOf = function createArrayOfCheck(checkType) {

    if (!isFunction(checkType)) {
        throw new TypeError(
            "Invalid Function Interface for arrayOf, checkType must be a function" +
            "Function(props: Object, propName: String, callerName: String, locale) return Error or null."
        );
    }

    return createTypeChecker(function validateArrayOf(props, propName, callerName, locale) {
        var error = propTypes.array(props, propName, callerName, locale),
            propValue, i, il;

        if (error) {
            return error;
        } else {
            propValue = props[propName];
            i = -1;
            il = propValue.length - 1;

            while (i++ < il) {
                error = checkType(propValue, i, callerName + "[" + i + "]", locale);
                if (error) {
                    return error;
                }
            }

            return null;
        }
    });
};

propTypes.implement = function createImplementCheck(expectedInterface) {
    var key;

    for (key in expectedInterface) {
        if (has(expectedInterface, key) && !isFunction(expectedInterface[key])) {
            throw new TypeError(
                "Invalid Function Interface for " + key + ", must be functions " +
                "Function(props: Object, propName: String, callerName: String, locale) return Error or null."
            );
        }
    }

    return createTypeChecker(function validateImplement(props, propName, callerName, locale) {
        var results = null,
            localHas = has,
            propInterface = props[propName],
            propKey, propValidate, result;

        for (propKey in expectedInterface) {
            if (localHas(expectedInterface, propKey)) {
                propValidate = expectedInterface[propKey];
                result = propValidate(propInterface, propKey, callerName + "." + propKey, locale || defaultLocale);

                if (result) {
                    results = results || [];
                    results[results.length] = result;
                }
            }
        }

        return results;
    });
};

function createPrimitiveTypeChecker(expectedType) {
    return createTypeChecker(function validatePrimitive(props, propName, callerName, locale) {
        var propValue = props[propName],
            type = getPropType(propValue);

        if (type !== expectedType) {
            callerName = callerName || ("<<" + i18n(locale || defaultLocale, "prop_types.anonymous") + ">>");

            return new TypeError(
                i18n(locale || defaultLocale, "prop_types.primitive", propName, getPreciseType(propValue), callerName, expectedType)
            );
        } else {
            return null;
        }
    });
}

function getPropType(value) {
    var propType = typeof(value);

    if (isArray(value)) {
        return "array";
    } else if (value instanceof RegExp) {
        return "object";
    } else {
        return propType;
    }
}

function getPreciseType(propValue) {
    var propType = getPropType(propValue);

    if (propType === "object") {
        if (propValue instanceof Date) {
            return "date";
        } else if (propValue instanceof RegExp) {
            return "regexp";
        } else {
            return propType;
        }
    } else {
        return propType;
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-virt-ui-panel@0.0.1/src/index.js-=@*/
var process = require(17);
var virt = require(1),
    clamp = require(156),
    propTypes = require(3),
    isNumber = require(24),
    Divider = require(219);


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
            renderRightChild = virt.createView(Panel, rightProps,  virt.cloneView(rightChild));
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

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/View.js-=@*/
var process = require(17);
var isPrimitive = require(18),
    isFunction = require(19),
    isArray = require(20),
    isString = require(21),
    isObject = require(22),
    isNullOrUndefined = require(23),
    isNumber = require(24),
    has = require(25),
    arrayMap = require(26),
    extend = require(27),
    propsToJSON = require(28),
    owner = require(16),
    context = require(15);


var ViewPrototype;


module.exports = View;


function View(type, key, ref, props, children, owner, context) {
    this.__owner = owner;
    this.__context = context;
    this.type = type;
    this.key = key;
    this.ref = ref;
    this.props = props;
    this.children = children;
}
ViewPrototype = View.prototype;

ViewPrototype.__View__ = true;

ViewPrototype.copy = function(view) {
    this.__owner = view.__owner;
    this.__context = view.__context;
    this.type = view.type;
    this.key = view.key;
    this.ref = view.ref;
    this.props = view.props;
    this.children = view.children;
    return this;
};

ViewPrototype.clone = function() {
    return new View(this.type, this.key, this.ref, this.props, this.children, this.__owner, this.__context);
};

ViewPrototype.toJSON = function() {
    return toJSON(this);
};

View.isView = isView;
View.isPrimitiveView = isPrimitiveView;
View.isViewComponent = isViewComponent;
View.isViewJSON = isViewJSON;
View.toJSON = toJSON;

View.clone = function(view, config, children) {
    var props = extend({}, view.props),
        key = view.key,
        ref = view.ref,
        viewOwner = view.__owner,
        childrenLength = arguments.length - 2,
        childArray, i, il;

    if (config) {
        if (isString(config.ref)) {
            ref = config.ref;
            viewOwner = owner.current;
        }
        if (isString(config.key)) {
            key = config.key;
        }
        extractConfig(props, config);
    }

    if (childrenLength === 1 && !isArray(children)) {
        children = [children];
    } else if (childrenLength > 1) {
        childArray = new Array(childrenLength);
        i = -1;
        il = childrenLength - 1;
        while (i++ < il) {
            childArray[i] = arguments[i + 2];
        }
        children = childArray;
    } else {
        children = view.children;
    }

    if (process.env.NODE_ENV !== "production") {
        ensureValidChildren(children);
    }

    return new View(view.type, key, ref, props, children, viewOwner, context.current);
};

View.create = function(type, config, children) {
    var isConfigArray = isArray(config);

    if (isConfigArray || isChild(config)) {
        if (isConfigArray) {
            children = config;
        } else if (arguments.length > 1) {
            children = extractChildren(arguments, 1);
        }
        config = null;
    } else if (!isNullOrUndefined(children)) {
        if (isArray(children)) {
            children = children;
        } else if (arguments.length > 2) {
            children = extractChildren(arguments, 2);
        }
    } else {
        children = [];
    }

    return construct(type, config, children);
};

View.createFactory = function(type) {
    return function factory(config, children) {
        var isConfigArray = isArray(config);

        if (isConfigArray || isChild(config)) {
            if (isConfigArray) {
                children = config;
            } else if (config && arguments.length > 0) {
                children = extractChildren(arguments, 0);
            }
            config = null;
        } else if (!isNullOrUndefined(children)) {
            if (isArray(children)) {
                children = children;
            } else if (arguments.length > 1) {
                children = extractChildren(arguments, 1);
            }
        }

        return construct(type, config, children);
    };
};

function construct(type, config, children) {
    var props = {},
        key = null,
        ref = null;

    if (config) {
        if (isString(config.key)) {
            key = config.key;
        }
        if (isString(config.ref)) {
            ref = config.ref;
        }
        extractConfig(props, config);
    }
    if (type && type.defaultProps) {
        extractDefaults(props, type.defaultProps);
    }
    if (process.env.NODE_ENV !== "production") {
        ensureValidChildren(children);
    }

    return new View(type, key, ref, props, children, owner.current, context.current);
}

function extractConfig(props, config) {
    var localHas = has,
        propName;

    for (propName in config) {
        if (localHas(config, propName)) {
            if (!(propName === "key" || propName === "ref")) {
                props[propName] = config[propName];
            }
        }
    }
}

function extractDefaults(props, defaultProps) {
    var localHas = has,
        propName;

    for (propName in defaultProps) {
        if (localHas(defaultProps, propName)) {
            if (isNullOrUndefined(props[propName])) {
                props[propName] = defaultProps[propName];
            }
        }
    }
}

function toJSON(view) {
    if (isPrimitive(view)) {
        return view;
    } else {
        return {
            type: view.type,
            key: view.key,
            ref: view.ref,
            props: propsToJSON(view.props),
            children: arrayMap(view.children, toJSON)
        };
    }
}

function isView(obj) {
    return isObject(obj) && obj.__View__ === true;
}

function isViewComponent(obj) {
    return isView(obj) && isFunction(obj.type);
}

function isViewJSON(obj) {
    return (
        isObject(obj) &&
        isString(obj.type) &&
        isObject(obj.props) &&
        isArray(obj.children)
    );
}

function isPrimitiveView(object) {
    return isString(object) || isNumber(object);
}

function isChild(object) {
    return isView(object) || isPrimitiveView(object);
}

function extractChildren(args, offset) {
    var children = [],
        i = offset - 1,
        il = args.length - 1,
        j = 0,
        arg;

    while (i++ < il) {
        arg = args[i];

        if (!isNullOrUndefined(arg) && arg !== "" && !isArray(arg)) {
            children[j++] = arg;
        }
    }

    return children;
}

function ensureValidChildren(children) {
    var i = -1,
        il = children.length - 1;

    while (i++ < il) {
        if (!isChild(children[i])) {
            throw new TypeError("child of a View must be a String, Number or a View");
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Root.js-=@*/
var process = require(17);
var isFunction = require(19),
    isNull = require(29),
    isUndefined = require(30),
    emptyFunction = require(38),
    Transaction = require(39),
    shouldUpdate = require(40),
    EventManager = require(41),
    Node = require(42);


var RootPrototype,
    ROOT_ID = 0;


module.exports = Root;


function Root() {

    this.id = "." + (ROOT_ID++).toString(36);
    this.childHash = {};

    this.eventManager = new EventManager();

    this.nativeComponents = {};
    this.adapter = null;

    this.__transactions = [];
    this.__transactionCallbacks = [];
    this.__currentTransaction = null;
}
RootPrototype = Root.prototype;

RootPrototype.registerNativeComponent = function(type, constructor) {
    this.nativeComponents[type] = constructor;
};

RootPrototype.appendNode = function(node) {
    var id = node.id,
        childHash = this.childHash;

    if (childHash[id]) {
        throw new Error("Root appendNode(node) trying to override node at " + id);
    } else {
        node.root = this;
        childHash[id] = node;
    }
};

RootPrototype.removeNode = function(node) {
    var id = node.id,
        childHash = this.childHash;

    if (!isUndefined(childHash[id])) {
        node.root = null;
        delete childHash[id];
    } else {
        throw new Error("Root removeNode(node) trying to remove node that does not exists with id " + id);
    }
};

RootPrototype.__processTransaction = function() {
    var _this = this,
        transactions = this.__transactions,
        transactionCallbacks = this.__transactionCallbacks,
        transaction, callback;

    if (isNull(this.__currentTransaction) && transactions.length !== 0) {
        this.__currentTransaction = transaction = transactions[0];
        callback = transactionCallbacks[0];

        this.adapter.messenger.emit("virt.handleTransaction", transaction, function onHandleTransaction() {

            _this.__currentTransaction = null;

            transactions.shift();
            transactionCallbacks.shift();

            transaction.queue.notifyAll();
            Transaction.release(transaction);

            callback();

            if (transactions.length !== 0) {
                _this.__processTransaction();
            }
        });
    }
};

RootPrototype.__enqueueTransaction = function(transaction, callback) {
    var transactions = this.__transactions,
        index = transactions.length;

    transactions[index] = transaction;
    this.__transactionCallbacks[index] = isFunction(callback) ? callback : emptyFunction;
    this.__processTransaction();
};

RootPrototype.unmount = function(callback) {
    var node = this.childHash[this.id],
        transaction;

    if (node) {
        transaction = Transaction.create();

        transaction.unmount(this.id);
        node.__unmount(transaction);

        this.__enqueueTransaction(transaction, callback);
    }
};

RootPrototype.update = function(node, state, callback) {
    var transaction = Transaction.create();

    node.update(node.currentView, state, transaction);
    this.__enqueueTransaction(transaction, callback);
};

RootPrototype.forceUpdate = function(node, callback) {
    var transaction = Transaction.create();

    node.forceUpdate(node.currentView, transaction);
    this.__enqueueTransaction(transaction, callback);
};

RootPrototype.enqueueUpdate = function(node, nextState, callback) {
    var _this = this,
        transaction = this.__currentTransaction;

    function onHandleTransaction() {
        if (!isUndefined(_this.childHash[node.id])) {
            _this.update(node, nextState, callback);
        }
    }

    if (isNull(transaction)) {
        process.nextTick(onHandleTransaction);
    } else {
        transaction.queue.enqueue(onHandleTransaction);
    }
};

RootPrototype.render = function(nextView, id, callback) {
    var transaction = Transaction.create(),
        node;

    if (isFunction(id)) {
        callback = id;
        id = null;
    }

    id = id || this.id;
    node = this.childHash[id];

    if (node) {
        if (shouldUpdate(node.currentView, nextView)) {

            node.forceUpdate(nextView, transaction);
            this.__enqueueTransaction(transaction, callback);

            return this;
        } else {
            if (this.id === id) {
                node.__unmount(transaction);
                transaction.unmount(id);
            } else {
                node.unmount(transaction);
            }
        }
    }

    node = Node.create(this.id, id, nextView);
    this.appendNode(node);
    node.mount(transaction);

    this.__enqueueTransaction(transaction, callback);

    return this;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Component.js-=@*/
var inherits = require(64),
    extend = require(27),
    isNull = require(29),
    componentState = require(59);


var ComponentPrototype;


module.exports = Component;


function Component(props, children, context) {
    this.__node = null;
    this.__mountState = componentState.UNMOUNTED;
    this.props = props;
    this.children = children;
    this.context = context;
    this.state = null;
    this.refs = {};
}

ComponentPrototype = Component.prototype;

Component.extend = function(child, displayName) {
    inherits(child, this);
    child.displayName = child.prototype.displayName = displayName || ComponentPrototype.displayName;
    return child;
};

ComponentPrototype.displayName = "virt.Component";

ComponentPrototype.render = function() {
    throw new Error("render() render must be defined on Components");
};

ComponentPrototype.setState = function(state, callback) {
    var node = this.__node,
        nextState = extend({}, this.state, state);

    if (this.__mountState === componentState.MOUNTED) {
        node.root.update(node, nextState, callback);
    } else if (!isNull(node.root)) {
        node.root.enqueueUpdate(node, nextState, callback);
    }
};

ComponentPrototype.replaceState = function(state, callback) {
    var node = this.__node;

    if (this.__mountState === componentState.MOUNTED) {
        node.root.update(node, state, callback);
    } else if (!isNull(node.root)) {
        node.root.enqueueUpdate(node, state, callback);
    }
};

ComponentPrototype.forceUpdate = function(callback) {
    var node = this.__node;

    if (this.__mountState === componentState.MOUNTED) {
        node.root.forceUpdate(node, callback);
    } else if (!isNull(node.root)) {
        node.root.enqueueUpdate(node, node.component.state, callback);
    }
};

ComponentPrototype.isMounted = function() {
    return this.__mountState === componentState.MOUNTED;
};

ComponentPrototype.getInternalId = function() {
    return this.__node.id;
};

ComponentPrototype.emitMessage = function(name, data, callback) {
    this.__node.root.adapter.messenger.emit(name, data, callback);
};

ComponentPrototype.sendMessage = ComponentPrototype.emitMessage;

ComponentPrototype.onMessage = function(name, callback) {
    this.__node.root.adapter.messenger.on(name, callback);
};

ComponentPrototype.offMessage = function(name, callback) {
    this.__node.root.adapter.messenger.off(name, callback);
};

ComponentPrototype.onGlobalEvent = function(name, listener, callback) {
    var root = this.__node.root,
        eventManager = root.eventManager,
        topLevelType = eventManager.propNameToTopLevel[name];

    eventManager.globalOn(topLevelType, listener);
    this.emitMessage("virt.onGlobalEvent", topLevelType, callback);
};

ComponentPrototype.offGlobalEvent = function(name, listener, callback) {
    var root = this.__node.root,
        eventManager = root.eventManager,
        topLevelType = eventManager.propNameToTopLevel[name];

    eventManager.globalOff(topLevelType, callback);
    this.emitMessage("virt.offGlobalEvent", topLevelType, callback);
};

ComponentPrototype.getChildContext = function() {};

ComponentPrototype.componentDidMount = function() {};

ComponentPrototype.componentDidUpdate = function( /* previousProps, previousChildren, previousState, previousContext */ ) {};

ComponentPrototype.componentWillMount = function() {};

ComponentPrototype.componentWillUnmount = function() {};

ComponentPrototype.componentWillReceiveProps = function( /* nextProps, nextChildren, nextContext */ ) {};

ComponentPrototype.componentWillUpdate = function( /* nextProps, nextChildren, nextState, nextContext */ ) {};

ComponentPrototype.shouldComponentUpdate = function( /* nextProps, nextChildren, nextState, nextContext */ ) {
    return true;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/getChildKey.js-=@*/
var getViewKey = require(69);


module.exports = getChildKey;


function getChildKey(parentId, child, index) {
    return parentId + "." + getViewKey(child, index);
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/getRootIdFromId.js-=@*/
module.exports = getRootIdFromId;


function getRootIdFromId(id) {
    var index;

    if (id && id.charAt(0) === "." && id.length > 1) {
        index = id.indexOf(".", 1);
        return index > -1 ? id.substr(0, index) : id;
    } else {
        return null;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/consts.js-=@*/
var keyMirror = require(55);


module.exports = keyMirror([
    "TEXT",
    "REPLACE",
    "PROPS",
    "ORDER",
    "INSERT",
    "REMOVE",
    "MOUNT",
    "UNMOUNT"
]);
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/isAncestorIdOf.js-=@*/
var isBoundary = require(70);


module.exports = isAncestorIdOf;


function isAncestorIdOf(ancestorID, descendantID) {
    return (
        descendantID.indexOf(ancestorID) === 0 &&
        isBoundary(descendantID, ancestorID.length)
    );
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/traverseAncestors.js-=@*/
var traversePath = require(71);


module.exports = traverseAncestors;


function traverseAncestors(id, callback) {
    traversePath(id, "", callback, false, true);
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/traverseDescendants.js-=@*/
var traversePath = require(71);


module.exports = traverseDescendant;


function traverseDescendant(id, callback) {
    traversePath("", id, callback, true, false);
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/traverseTwoPhase.js-=@*/
var traversePath = require(71);


module.exports = traverseTwoPhase;


function traverseTwoPhase(id, callback) {
    if (id) {
        traversePath(id, "", callback, false, true);
        traversePath("", id, callback, true, false);
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/context.js-=@*/
module.exports = global.__GLOBAL_VIRT_CONTEXT__ || (
    global.__GLOBAL_VIRT_CONTEXT__ = {
        current: null
    }
);
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/owner.js-=@*/
module.exports = global.__GLOBAL_VIRT_OWNER__ || (
    global.__GLOBAL_VIRT_OWNER__ = {
        current: null
    }
);
},
function(require, exports, module, undefined, global) {
/*@=-process@0.11.9/browser.js-=@*/
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_primitive@0.0.2/src/index.js-=@*/
var isNullOrUndefined = require(23);


module.exports = isPrimitive;


function isPrimitive(obj) {
    var typeStr;
    return isNullOrUndefined(obj) || ((typeStr = typeof(obj)) !== "object" && typeStr !== "function") || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_function@0.0.1/src/index.js-=@*/
var objectToString = Object.prototype.toString,
    isFunction;


if (objectToString.call(function() {}) === "[object Object]") {
    isFunction = function isFunction(value) {
        return value instanceof Function;
    };
} else if (typeof(/./) === "function" || (typeof(Uint8Array) !== "undefined" && typeof(Uint8Array) !== "function")) {
    isFunction = function isFunction(value) {
        return objectToString.call(value) === "[object Function]";
    };
} else {
    isFunction = function isFunction(value) {
        return typeof(value) === "function" || false;
    };
}


module.exports = isFunction;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_array@0.0.1/src/index.js-=@*/
var isNative = require(31),
    isLength = require(32),
    isObject = require(22);


var objectToString = Object.prototype.toString,
    nativeIsArray = Array.isArray,
    isArray;


if (isNative(nativeIsArray)) {
    isArray = nativeIsArray;
} else {
    isArray = function isArray(value) {
        return (
            isObject(value) &&
            isLength(value.length) &&
            objectToString.call(value) === "[object Array]"
        ) || false;
    };
}


module.exports = isArray;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_string@0.0.1/src/index.js-=@*/
module.exports = isString;


function isString(value) {
    return typeof(value) === "string" || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_object@0.0.1/src/index.js-=@*/
var isNull = require(29);


module.exports = isObject;


function isObject(value) {
    var type = typeof(value);
    return type === "function" || (!isNull(value) && type === "object") || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_null_or_undefined@0.0.1/src/index.js-=@*/
var isNull = require(29),
    isUndefined = require(30);


module.exports = isNullOrUndefined;

/**
  isNullOrUndefined accepts any value and returns true
  if the value is null or undefined. For all other values
  false is returned.
  
  @param {Any}        any value to test
  @returns {Boolean}  the boolean result of testing value

  @example
    isNullOrUndefined(null);   // returns true
    isNullOrUndefined(undefined);   // returns true
    isNullOrUndefined("string");    // returns false
**/
function isNullOrUndefined(value) {
    return isNull(value) || isUndefined(value);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_number@0.0.1/src/index.js-=@*/
module.exports = isNumber;


function isNumber(value) {
    return typeof(value) === "number" || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/has@0.0.2/src/index.js-=@*/
var isNative = require(31),
    getPrototypeOf = require(35),
    isNullOrUndefined = require(23);


var nativeHasOwnProp = Object.prototype.hasOwnProperty,
    baseHas;


module.exports = has;


function has(object, key) {
    if (isNullOrUndefined(object)) {
        return false;
    } else {
        return baseHas(object, key);
    }
}

if (isNative(nativeHasOwnProp)) {
    baseHas = function baseHas(object, key) {
        if (object.hasOwnProperty) {
            return object.hasOwnProperty(key);
        } else {
            return nativeHasOwnProp.call(object, key);
        }
    };
} else {
    baseHas = function baseHas(object, key) {
        var proto = getPrototypeOf(object);

        if (isNullOrUndefined(proto)) {
            return key in object;
        } else {
            return (key in object) && (!(key in proto) || proto[key] !== object[key]);
        }
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/array-map@0.0.1/src/index.js-=@*/
module.exports = arrayMap;


function arrayMap(array, callback) {
    var length = array.length,
        i = -1,
        il = length - 1,
        results = new Array(length);

    while (i++ < il) {
        results[i] = callback(array[i], i, array);
    }

    return results;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/extend@0.0.2/src/index.js-=@*/
var keys = require(36),
    isNative = require(31);


var nativeAssign = Object.assign,
    extend, baseExtend;


if (isNative(nativeAssign)) {
    extend = nativeAssign;
} else {
    extend = function extend(out) {
        var i = 0,
            il = arguments.length - 1;

        while (i++ < il) {
            baseExtend(out, arguments[i]);
        }

        return out;
    };
    baseExtend = function baseExtend(a, b) {
        var objectKeys = keys(b),
            i = -1,
            il = objectKeys.length - 1,
            key;

        while (i++ < il) {
            key = objectKeys[i];
            a[key] = b[key];
        }
    };
}


module.exports = extend;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/propsToJSON.js-=@*/
var has = require(25),
    isNull = require(29),
    isPrimitive = require(18);


module.exports = propsToJSON;


function propsToJSON(props) {
    return toJSON(props, {});
}

function toJSON(props, json) {
    var localHas = has,
        key, value;

    for (key in props) {
        if (localHas(props, key)) {
            value = props[key];

            if (isPrimitive(value)) {
                json = isNull(json) ? {} : json;
                json[key] = value;
            } else {
                value = toJSON(value, null);
                if (!isNull(value)) {
                    json = isNull(json) ? {} : json;
                    json[key] = value;
                }
            }
        }
    }

    return json;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_null@0.0.1/src/index.js-=@*/
module.exports = isNull;


function isNull(value) {
    return value === null;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_undefined@0.0.1/src/index.js-=@*/
module.exports = isUndefined;


function isUndefined(value) {
    return value === void(0);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_native@0.0.2/src/index.js-=@*/
var isFunction = require(19),
    isNullOrUndefined = require(23),
    escapeRegExp = require(33);


var reHostCtor = /^\[object .+?Constructor\]$/,

    functionToString = Function.prototype.toString,

    reNative = RegExp("^" +
        escapeRegExp(Object.prototype.toString)
        .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ),

    isHostObject;


module.exports = isNative;


function isNative(value) {
    return !isNullOrUndefined(value) && (
        isFunction(value) ?
        reNative.test(functionToString.call(value)) : (
            typeof(value) === "object" && (
                (isHostObject(value) ? reNative : reHostCtor).test(value) || false
            )
        )
    ) || false;
}

try {
    String({
        "toString": 0
    } + "");
} catch (e) {
    isHostObject = function isHostObject() {
        return false;
    };
}

isHostObject = function isHostObject(value) {
    return !isFunction(value.toString) && typeof(value + "") === "string";
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_length@0.0.1/src/index.js-=@*/
var isNumber = require(24);


var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;


module.exports = isLength;


function isLength(value) {
    return isNumber(value) && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/escape_regexp@0.0.1/src/index.js-=@*/
var toString = require(34);


var reRegExpChars = /[.*+?\^${}()|\[\]\/\\]/g,
    reHasRegExpChars = new RegExp(reRegExpChars.source);


module.exports = escapeRegExp;


function escapeRegExp(string) {
    string = toString(string);
    return (
        (string && reHasRegExpChars.test(string)) ?
        string.replace(reRegExpChars, "\\$&") :
        string
    );
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/to_string@0.0.1/src/index.js-=@*/
var isString = require(21),
    isNullOrUndefined = require(23);


module.exports = toString;


function toString(value) {
    if (isString(value)) {
        return value;
    } else if (isNullOrUndefined(value)) {
        return "";
    } else {
        return value + "";
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_prototype_of@0.0.1/src/index.js-=@*/
var isObject = require(22),
    isNative = require(31),
    isNullOrUndefined = require(23);


var nativeGetPrototypeOf = Object.getPrototypeOf,
    baseGetPrototypeOf;


module.exports = getPrototypeOf;


function getPrototypeOf(value) {
    if (isNullOrUndefined(value)) {
        return null;
    } else {
        return baseGetPrototypeOf(value);
    }
}

if (isNative(nativeGetPrototypeOf)) {
    baseGetPrototypeOf = function baseGetPrototypeOf(value) {
        return nativeGetPrototypeOf(isObject(value) ? value : Object(value)) || null;
    };
} else {
    if ("".__proto__ === String.prototype) {
        baseGetPrototypeOf = function baseGetPrototypeOf(value) {
            return value.__proto__ || null;
        };
    } else {
        baseGetPrototypeOf = function baseGetPrototypeOf(value) {
            return value.constructor ? value.constructor.prototype : null;
        };
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/keys@0.0.1/src/index.js-=@*/
var has = require(37),
    isNative = require(31),
    isNullOrUndefined = require(23),
    isObject = require(22);


var nativeKeys = Object.keys;


module.exports = keys;


function keys(value) {
    if (isNullOrUndefined(value)) {
        return [];
    } else {
        return nativeKeys(isObject(value) ? value : Object(value));
    }
}

if (!isNative(nativeKeys)) {
    nativeKeys = function keys(value) {
        var localHas = has,
            out = [],
            i = 0,
            key;

        for (key in value) {
            if (localHas(value, key)) {
                out[i++] = key;
            }
        }

        return out;
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/has@0.0.1/src/index.js-=@*/
var isNative = require(31),
    getPrototypeOf = require(35),
    isNullOrUndefined = require(23);


var nativeHasOwnProp = Object.prototype.hasOwnProperty,
    baseHas;


module.exports = has;


function has(object, key) {
    if (isNullOrUndefined(object)) {
        return false;
    } else {
        return baseHas(object, key);
    }
}

if (isNative(nativeHasOwnProp)) {
    baseHas = function baseHas(object, key) {
        if (object.hasOwnProperty) {
            return object.hasOwnProperty(key);
        } else {
            return nativeHasOwnProp.call(object, key);
        }
    };
} else {
    baseHas = function baseHas(object, key) {
        var proto = getPrototypeOf(object);

        if (isNullOrUndefined(proto)) {
            return key in object;
        } else {
            return (key in object) && (!(key in proto) || proto[key] !== object[key]);
        }
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/empty_function@0.0.1/src/index.js-=@*/
module.exports = emptyFunction;


function emptyFunction() {}

function makeEmptyFunction(value) {
    return function() {
        return value;
    };
}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() {
    return this;
};
emptyFunction.thatReturnsArgument = function(argument) {
    return argument;
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/index.js-=@*/
var createPool = require(43),
    Queue = require(44),
    arrayForEach = require(45),
    consts = require(10),
    InsertPatch = require(46),
    MountPatch = require(47),
    UnmountPatch = require(48),
    OrderPatch = require(49),
    PropsPatch = require(50),
    RemovePatch = require(51),
    ReplacePatch = require(52),
    TextPatch = require(53);


var TransactionPrototype;


module.exports = Transaction;


function Transaction() {

    this.queue = Queue.getPooled();

    this.removes = {};
    this.patches = {};
    this.__removesArray = [];
    this.__patchesArray = [];

    this.events = {};
    this.eventsRemove = {};
}
createPool(Transaction);
Transaction.consts = consts;
TransactionPrototype = Transaction.prototype;

Transaction.create = function() {
    return Transaction.getPooled();
};

TransactionPrototype.destroy = function() {
    Transaction.release(this);
};

TransactionPrototype.destructor = function() {

    arrayForEach(this.__patchesArray, destroyPatchArray);
    arrayForEach(this.__removesArray, destroyPatchArray);

    this.removes = {};
    this.patches = {};
    this.__removesArray.length = 0;
    this.__patchesArray.length = 0;

    this.events = {};
    this.eventsRemove = {};

    return this;
};

function destroyPatchArray(array) {
    arrayForEach(array, destroyPatch);
}

function destroyPatch(patch) {
    patch.destroy();
}

TransactionPrototype.mount = function(id, next) {
    this.append(MountPatch.create(id, next));
};

TransactionPrototype.unmount = function(id) {
    this.append(UnmountPatch.create(id));
};

TransactionPrototype.insert = function(id, childId, index, next) {
    this.append(InsertPatch.create(id, childId, index, next));
};

TransactionPrototype.order = function(id, order) {
    this.append(OrderPatch.create(id, order));
};

TransactionPrototype.props = function(id, previous, props) {
    this.append(PropsPatch.create(id, previous, props));
};

TransactionPrototype.replace = function(id, childId, index, next) {
    this.append(ReplacePatch.create(id, childId, index, next));
};

TransactionPrototype.text = function(id, index, next, props) {
    this.append(TextPatch.create(id, index, next, props));
};

TransactionPrototype.remove = function(id, childId, index) {
    this.appendRemove(RemovePatch.create(id, childId, index));
};

TransactionPrototype.event = function(id, type) {
    var events = this.events,
        eventArray = events[id] || (events[id] = []);

    eventArray[eventArray.length] = type;
};

TransactionPrototype.removeEvent = function(id, type) {
    var eventsRemove = this.eventsRemove,
        eventArray = eventsRemove[id] || (eventsRemove[id] = []);

    eventArray[eventArray.length] = type;
};

function append(hash, array, value) {
    var id = value.id,
        patchArray;

    if (!(patchArray = hash[id])) {
        patchArray = hash[id] = array[array.length] = [];
    }

    patchArray[patchArray.length] = value;
}

TransactionPrototype.append = function(value) {
    append(this.patches, this.__patchesArray, value);
};

TransactionPrototype.appendRemove = function(value) {
    append(this.removes, this.__removesArray, value);
};

TransactionPrototype.toJSON = function() {
    return {
        removes: this.removes,
        patches: this.patches,
        events: this.events,
        eventsRemove: this.eventsRemove
    };
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/shouldUpdate.js-=@*/
var isString = require(21),
    isNumber = require(24),
    isNullOrUndefined = require(23);


module.exports = shouldUpdate;


function shouldUpdate(previous, next) {
    if (isNullOrUndefined(previous) || isNullOrUndefined(next)) {
        return false;
    } else {
        if (isString(previous) || isNumber(previous)) {
            return isString(next) || isNumber(next);
        } else {
            return (
                previous.type === next.type &&
                previous.key === next.key
            );
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/EventManager.js-=@*/
var indexOf = require(57),
    isUndefined = require(30);


var EventManagerPrototype;


module.exports = EventManager;


function EventManager() {
    this.propNameToTopLevel = {};
    this.events = {};
}
EventManagerPrototype = EventManager.prototype;

EventManagerPrototype.on = function(id, topLevelType, listener, transaction) {
    var events = this.events,
        event = events[topLevelType] || (events[topLevelType] = {});

    event[id] = listener;
    transaction.event(id, topLevelType);
};
EventManagerPrototype.off = function(id, topLevelType, transaction) {
    var events = this.events,
        event = events[topLevelType];

    if (!isUndefined(event[id])) {
        delete event[id];
        transaction.removeEvent(id, topLevelType);
    }
};
EventManagerPrototype.allOff = function(id, transaction) {
    var events = this.events,
        event, topLevelType;

    for (topLevelType in events) {
        if (!isUndefined((event = events[topLevelType])[id])) {
            delete event[id];
            transaction.removeEvent(id, topLevelType);
        }
    }
};

EventManagerPrototype.globalOn = function(topLevelType, listener) {
    var events = this.events,
        event = events[topLevelType] || (events[topLevelType] = {}),
        global = event.global || (event.global = []),
        index = indexOf(global, listener);

    if (index === -1) {
        global[global.length] = listener;
    }
};
EventManagerPrototype.globalOff = function(topLevelType, listener) {
    var events = this.events,
        event = events[topLevelType] || (events[topLevelType] = {}),
        global = event.global || (event.global = []),
        index = indexOf(global, listener);

    if (index !== -1) {
        global.splice(index, 1);
    }
};
EventManagerPrototype.globalAllOff = function() {
    var events = this.events,
        event = events[topLevelType] || (events[topLevelType] = {}),
        global = event.global;

    if (global) {
        global.length = 0;
    }
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Node.js-=@*/
var process = require(17);
var has = require(25),
    createPool = require(43),
    arrayMap = require(26),
    indexOf = require(57),
    isNull = require(29),
    isString = require(21),
    isArray = require(20),
    isFunction = require(19),
    extend = require(27),
    owner = require(16),
    context = require(15),
    shouldUpdate = require(40),
    componentState = require(59),
    getComponentClassForType = require(60),
    View = require(5),
    getChildKey = require(8),
    diffChildren, diffProps;


var NodePrototype,
    isPrimitiveView = View.isPrimitiveView;


module.exports = Node;


diffChildren = require(61);
diffProps = require(62);


function Node(parentId, id, currentView) {

    this.parent = null;
    this.parentId = parentId;
    this.id = id;

    this.context = null;

    this.root = null;

    this.ComponentClass = null;
    this.component = null;

    this.isBottomLevel = true;
    this.isTopLevel = false;

    this.renderedNode = null;
    this.renderedChildren = null;

    this.currentView = currentView;
}
createPool(Node);
NodePrototype = Node.prototype;

Node.create = function(parentId, id, currentView) {
    return Node.getPooled(parentId, id, currentView);
};

NodePrototype.destroy = function() {
    Node.release(this);
};

NodePrototype.appendNode = function(node) {
    var renderedChildren = this.renderedChildren;

    this.root.appendNode(node);
    node.parent = this;

    renderedChildren[renderedChildren.length] = node;
};

NodePrototype.removeNode = function(node) {
    var renderedChildren = this.renderedChildren,
        index;

    node.parent = null;

    index = indexOf(renderedChildren, node);
    if (index !== -1) {
        renderedChildren.splice(index, 1);
    }

    node.destroy();
};

NodePrototype.mountComponent = function() {
    var currentView = this.currentView,
        ComponentClass, component, props, children, context;

    if (isFunction(currentView.type)) {
        this.ComponentClass = ComponentClass = currentView.type;
    } else {
        this.ComponentClass = ComponentClass = getComponentClassForType(currentView.type, this.root.nativeComponents);
        this.isTopLevel = true;
    }

    props = this.__processProps(currentView.props);
    children = currentView.children;
    context = this.__processContext(currentView.__context);

    component = new ComponentClass(props, children, context);

    this.component = component;

    component.__node = this;
    component.props = component.props || props;
    component.children = component.children || children;
    component.context = component.context || context;
};

NodePrototype.mount = function(transaction) {
    transaction.mount(this.id, this.__mount(transaction));
};

NodePrototype.__mount = function(transaction) {
    var renderedView, renderedNode, component;

    this.context = context.current;
    this.mountComponent();

    renderedView = this.renderView();

    if (this.isTopLevel !== true) {
        renderedNode = this.renderedNode = Node.create(this.parentId, this.id, renderedView);
        renderedNode.root = this.root;
        renderedNode.isBottomLevel = false;
        renderedView = renderedNode.__mount(transaction);
    } else {
        mountEvents(this.id, renderedView.props, this.root.eventManager, transaction);
        this.__mountChildren(renderedView, transaction);
    }

    component = this.component;
    component.__mountState = componentState.MOUNTING;

    if (component.componentWillMount) {
        component.componentWillMount();
    }

    transaction.queue.enqueue(function onMount() {
        component.__mountState = componentState.MOUNTED;
        if (component.componentDidMount) {
            component.componentDidMount();
        }
    });

    this.__attachRefs();

    return renderedView;
};

NodePrototype.__mountChildren = function(renderedView, transaction) {
    var _this = this,
        parentId = this.id,
        renderedChildren = this.renderedChildren || (this.renderedChildren = []);

    renderedChildren.length = 0;

    renderedView.children = arrayMap(renderedView.children, function renderChild(child, index) {
        var node, id;

        if (isPrimitiveView(child)) {
            return child;
        } else {
            id = getChildKey(parentId, child, index);
            node = Node.create(parentId, id, child);
            _this.appendNode(node);
            return node.__mount(transaction);
        }
    });
};

NodePrototype.unmount = function(transaction) {
    this.__unmount(transaction);
    transaction.remove(this.parentId, this.id, 0);
};

NodePrototype.__unmount = function(transaction) {
    var component = this.component;

    if (this.isTopLevel !== true) {
        this.renderedNode.__unmount(transaction);
        this.renderedNode = null;
    } else {
        this.__unmountChildren(transaction);
        this.root.eventManager.allOff(this.id, transaction);
        this.renderedChildren.length = 0;
    }

    component.__mountState = componentState.UNMOUNTING;

    if (component.componentWillUnmount) {
        component.componentWillUnmount();
    }

    if (this.isBottomLevel !== false) {
        this.root.removeNode(this);
    }

    this.__detachRefs();

    this.context = null;
    this.component = null;
    this.currentView = null;

    transaction.queue.enqueue(function onUnmount() {
        component.__mountState = componentState.UNMOUNTED;
    });
};

NodePrototype.__unmountChildren = function(transaction) {
    var renderedChildren = this.renderedChildren,
        i = -1,
        il = renderedChildren.length - 1;

    while (i++ < il) {
        renderedChildren[i].__unmount(transaction);
    }
};

NodePrototype.update = function(nextView, nextState, transaction) {
    this.receiveView(nextView, nextState, nextView.__context, transaction);
};

NodePrototype.forceUpdate = function(nextView, transaction) {
    this.receiveView(nextView, this.component.state, nextView.__context, transaction);
};

NodePrototype.receiveView = function(nextView, nextState, nextContext, transaction) {
    var prevView = this.currentView,
        prevContext = this.context;

    this.updateComponent(
        prevView,
        nextView,
        nextState,
        prevContext,
        nextContext,
        transaction
    );
};

NodePrototype.updateComponent = function(
    prevParentView, nextParentView, nextState, prevUnmaskedContext, nextUnmaskedContext, transaction
) {
    var component = this.component,
        nextProps = component.props,
        nextChildren = component.children,
        nextContext = component.context;

    component.__mountState = componentState.UPDATING;

    if (prevParentView !== nextParentView) {
        nextProps = this.__processProps(nextParentView.props);
        nextChildren = nextParentView.children;
        nextContext = this.__processContext(nextParentView.__context);

        if (component.componentWillReceiveProps) {
            component.componentWillReceiveProps(nextProps, nextChildren, nextContext);
        }
    }

    if (
        component.shouldComponentUpdate ?
        component.shouldComponentUpdate(nextProps, nextChildren, nextState, nextContext) :
        true
    ) {
        this.__updateComponent(
            nextParentView, nextProps, nextChildren, nextState, nextContext, nextUnmaskedContext, transaction
        );
    } else {
        this.currentView = nextParentView;
        this.context = nextUnmaskedContext;

        component.props = nextProps;
        component.children = nextChildren;
        component.state = nextState;
        component.context = nextContext;

        component.__mountState = componentState.MOUNTED;
    }
};

NodePrototype.__updateComponent = function(
    nextParentView, nextProps, nextChildren, nextState, nextContext, unmaskedContext, transaction
) {
    var component = this.component,

        prevProps = component.props,
        prevChildren = component.children,
        prevState = component.__previousState,
        prevContext = component.context,

        prevParentView;

    if (component.componentWillUpdate) {
        component.componentWillUpdate(nextProps, nextChildren, nextState, nextContext);
    }

    component.props = nextProps;
    component.children = nextChildren;
    component.state = nextState;
    component.context = nextContext;

    this.context = unmaskedContext;

    if (this.isTopLevel !== true) {
        this.currentView = nextParentView;
        this.__updateRenderedNode(unmaskedContext, transaction);
    } else {
        prevParentView = this.currentView;
        this.currentView = nextParentView;
        this.__updateRenderedView(prevParentView, unmaskedContext, transaction);
    }

    transaction.queue.enqueue(function onUpdate() {
        component.__mountState = componentState.MOUNTED;
        if (component.componentDidUpdate) {
            component.componentDidUpdate(prevProps, prevChildren, prevState, prevContext);
        }
    });
};

NodePrototype.__updateRenderedNode = function(context, transaction) {
    var prevNode = this.renderedNode,
        prevRenderedView = prevNode.currentView,
        nextRenderedView = this.renderView(),
        renderedNode;

    if (shouldUpdate(prevRenderedView, nextRenderedView)) {
        prevNode.receiveView(nextRenderedView, this.component.state, this.__processChildContext(context), transaction);
    } else {
        prevNode.__unmount(transaction);

        renderedNode = this.renderedNode = Node.create(this.parentId, this.id, nextRenderedView);
        renderedNode.root = this.root;
        renderedNode.isBottomLevel = false;

        transaction.replace(this.parentId, this.id, 0, renderedNode.__mount(transaction));
    }

    this.__attachRefs();
};

NodePrototype.__updateRenderedView = function(prevRenderedView, context, transaction) {
    var id = this.id,
        nextRenderedView = this.renderView(),
        propsDiff = diffProps(
            id,
            this.root.eventManager,
            transaction,
            prevRenderedView.props,
            nextRenderedView.props
        );

    if (!isNull(propsDiff)) {
        transaction.props(id, prevRenderedView.props, propsDiff);
    }

    diffChildren(this, prevRenderedView, nextRenderedView, transaction);
};

NodePrototype.renderView = function() {
    var currentView = this.currentView,
        previousContext = context.current,
        renderedView;

    context.current = this.__processChildContext(currentView.__context);
    owner.current = this.component;

    renderedView = this.component.render();

    renderedView.ref = currentView.ref;
    renderedView.key = currentView.key;

    context.current = previousContext;
    owner.current = null;

    return renderedView;
};

function warnError(error) {
    var i, il;

    if (isArray(error)) {
        i = -1;
        il = error.length - 1;
        while (i++ < il) {
            warnError(error[i]);
        }
    } else {
        console.warn(error);
    }
}

NodePrototype.__checkTypes = function(propTypes, props) {
    var localHas = has,
        displayName = this.__getName(),
        propName, error;

    if (propTypes) {
        for (propName in propTypes) {
            if (localHas(propTypes, propName)) {
                error = propTypes[propName](props, propName, displayName);
                if (error) {
                    warnError(error);
                }
            }
        }
    }
};

NodePrototype.__processProps = function(props) {
    var propTypes;

    if (process.env.NODE_ENV !== "production") {
        propTypes = this.ComponentClass.propTypes;

        if (propTypes) {
            this.__checkTypes(propTypes, props);
        }
    }

    return props;
};

NodePrototype.__maskContext = function(context) {
    var maskedContext = context,
        contextTypes, contextName, localHas;

    if (process.env.NODE_ENV !== "production") {
        if (isString(this.ComponentClass)) {
            return null;
        } else if (!isNull(context)) {
            contextTypes = this.ComponentClass.contextTypes;
            maskedContext = null;

            if (contextTypes) {
                maskedContext = {};
                localHas = has;

                for (contextName in contextTypes) {
                    if (localHas(contextTypes, contextName)) {
                        maskedContext[contextName] = context[contextName];
                    }
                }
            }
        }
    }

    return maskedContext;
};

NodePrototype.__processContext = function(context) {
    var maskedContext = this.__maskContext(context),
        contextTypes;

    if (process.env.NODE_ENV !== "production") {
        if (!isNull(maskedContext)) {
            contextTypes = this.ComponentClass.contextTypes;

            if (contextTypes) {
                this.__checkTypes(contextTypes, maskedContext);
            }
        }
    }

    return maskedContext;
};

NodePrototype.__processChildContext = function(currentContext) {
    var component = this.component,
        childContext, childContextTypes, localHas, contextName, displayName;

    if (isFunction(component.getChildContext)) {
        childContext = component.getChildContext();
        childContextTypes = this.ComponentClass.childContextTypes;

        if (process.env.NODE_ENV !== "production") {
            if (childContextTypes) {
                this.__checkTypes(childContextTypes, childContext);
            }

            if (childContextTypes) {
                localHas = has;
                displayName = this.__getName();

                for (contextName in childContext) {
                    if (!localHas(childContextTypes, contextName)) {
                        console.warn(new Error(
                            displayName + " getChildContext(): key " + contextName + " is not defined in childContextTypes"
                        ));
                    }
                }
            }
        }

        return extend({}, currentContext, childContext);
    } else {
        return currentContext;
    }
};

NodePrototype.__attachRefs = function() {
    var view = this.currentView,
        ref = view.ref;

    if (isString(ref)) {
        attachRef(this.component, ref, view.__owner);
    }
};

NodePrototype.__detachRefs = function() {
    var view = this.currentView,
        ref = view.ref;

    if (isString(ref)) {
        detachRef(ref, view.__owner);
    }
};

NodePrototype.__getName = function() {
    var type = this.currentView.type,
        constructor;

    if (isString(type)) {
        return type;
    } else {
        constructor = this.component && this.component.constructor;
        return type.displayName || (constructor && constructor.displayName) || null;
    }
};

function attachRef(component, ref, owner) {
    if (isString(ref)) {
        if (owner) {
            owner.refs[ref] = component;
        } else {
            throw new Error("cannot add ref to view without owner");
        }

    }
}

function detachRef(ref, owner) {
    var refs = owner.refs;
    delete refs[ref];
}

function mountEvents(id, props, eventManager, transaction) {
    var propNameToTopLevel = eventManager.propNameToTopLevel,
        localHas = has,
        key;

    for (key in props) {
        if (localHas(propNameToTopLevel, key)) {
            eventManager.on(id, propNameToTopLevel[key], props[key], transaction);
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/create_pool@0.0.3/src/index.js-=@*/
var isFunction = require(19),
    isNumber = require(24),
    defineProperty = require(54);


var descriptor = {
    configurable: false,
    enumerable: false,
    writable: false,
    value: null
};


module.exports = createPool;


function createPool(Constructor, poolSize) {

    addProperty(Constructor, "instancePool", []);
    addProperty(Constructor, "getPooled", createPooler(Constructor));
    addProperty(Constructor, "release", createReleaser(Constructor));

    poolSize = poolSize || Constructor.poolSize;
    Constructor.poolSize = isNumber(poolSize) ? (poolSize < -1 ? -1 : poolSize) : -1;

    return Constructor;
}

function addProperty(object, name, value) {
    descriptor.value = value;
    defineProperty(object, name, descriptor);
    descriptor.value = null;
}

function createPooler(Constructor) {
    switch (Constructor.length) {
        case 0:
            return createNoArgumentPooler(Constructor);
        case 1:
            return createOneArgumentPooler(Constructor);
        case 2:
            return createTwoArgumentsPooler(Constructor);
        case 3:
            return createThreeArgumentsPooler(Constructor);
        case 4:
            return createFourArgumentsPooler(Constructor);
        case 5:
            return createFiveArgumentsPooler(Constructor);
        default:
            return createApplyPooler(Constructor);
    }
}

function createNoArgumentPooler(Constructor) {
    return function pooler() {
        var instancePool = Constructor.instancePool,
            instance;

        if (instancePool.length) {
            instance = instancePool.pop();
            return instance;
        } else {
            return new Constructor();
        }
    };
}

function createOneArgumentPooler(Constructor) {
    return function pooler(a0) {
        var instancePool = Constructor.instancePool,
            instance;

        if (instancePool.length) {
            instance = instancePool.pop();
            Constructor.call(instance, a0);
            return instance;
        } else {
            return new Constructor(a0);
        }
    };
}

function createTwoArgumentsPooler(Constructor) {
    return function pooler(a0, a1) {
        var instancePool = Constructor.instancePool,
            instance;

        if (instancePool.length) {
            instance = instancePool.pop();
            Constructor.call(instance, a0, a1);
            return instance;
        } else {
            return new Constructor(a0, a1);
        }
    };
}

function createThreeArgumentsPooler(Constructor) {
    return function pooler(a0, a1, a2) {
        var instancePool = Constructor.instancePool,
            instance;

        if (instancePool.length) {
            instance = instancePool.pop();
            Constructor.call(instance, a0, a1, a2);
            return instance;
        } else {
            return new Constructor(a0, a1, a2);
        }
    };
}

function createFourArgumentsPooler(Constructor) {
    return function pooler(a0, a1, a2, a3) {
        var instancePool = Constructor.instancePool,
            instance;

        if (instancePool.length) {
            instance = instancePool.pop();
            Constructor.call(instance, a0, a1, a2, a3);
            return instance;
        } else {
            return new Constructor(a0, a1, a2, a3);
        }
    };
}

function createFiveArgumentsPooler(Constructor) {
    return function pooler(a0, a1, a2, a3, a4) {
        var instancePool = Constructor.instancePool,
            instance;

        if (instancePool.length) {
            instance = instancePool.pop();
            Constructor.call(instance, a0, a1, a2, a3, a4);
            return instance;
        } else {
            return new Constructor(a0, a1, a2, a3, a4);
        }
    };
}

function createApplyConstructor(Constructor) {
    function F(args) {
        return Constructor.apply(this, args);
    }
    F.prototype = Constructor.prototype;

    return function applyConstructor(args) {
        return new F(args);
    };
}

function createApplyPooler(Constructor) {
    var applyConstructor = createApplyConstructor(Constructor);

    return function pooler() {
        var instancePool = Constructor.instancePool,
            instance;

        if (instancePool.length) {
            instance = instancePool.pop();
            Constructor.apply(instance, arguments);
            return instance;
        } else {
            return applyConstructor(arguments);
        }
    };
}

function createReleaser(Constructor) {
    return function releaser(instance) {
        var instancePool = Constructor.instancePool;

        if (isFunction(instance.destructor)) {
            instance.destructor();
        }
        if (Constructor.poolSize === -1 || instancePool.length < Constructor.poolSize) {
            instancePool[instancePool.length] = instance;
        }
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/queue@0.0.2/src/index.js-=@*/
var createPool = require(43);


module.exports = Queue;


function Queue() {
    this.__callbacks = [];
}

createPool(Queue);

Queue.prototype.enqueue = function(callback) {
    var callbacks = this.__callbacks;
    callbacks[callbacks.length] = callback;
    return this;
};

Queue.prototype.notifyAll = function() {
    var callbacks = this.__callbacks,
        i = -1,
        il = callbacks.length - 1;

    while (i++ < il) {
        callbacks[i]();
    }
    callbacks.length = 0;

    return this;
};

Queue.prototype.destructor = function() {
    this.__callbacks.length = 0;
    return this;
};

Queue.prototype.reset = Queue.prototype.destructor;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/array-for_each@0.0.1/src/index.js-=@*/
module.exports = arrayForEach;


function arrayForEach(array, callback) {
    var i = -1,
        il = array.length - 1;

    while (i++ < il) {
        if (callback(array[i], i, array) === false) {
            break;
        }
    }

    return array;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/InsertPatch.js-=@*/
var createPool = require(43),
    consts = require(10);


var InsertPatchPrototype;


module.exports = InsertPatch;


function InsertPatch() {
    this.type = consts.INSERT;
    this.id = null;
    this.childId = null;
    this.index = null;
    this.next = null;
}
createPool(InsertPatch);
InsertPatchPrototype = InsertPatch.prototype;

InsertPatch.create = function(id, childId, index, next) {
    var patch = InsertPatch.getPooled();
    patch.id = id;
    patch.childId = childId;
    patch.index = index;
    patch.next = next;
    return patch;
};

InsertPatchPrototype.destructor = function() {
    this.id = null;
    this.childId = null;
    this.index = null;
    this.next = null;
    return this;
};

InsertPatchPrototype.destroy = function() {
    return InsertPatch.release(this);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/MountPatch.js-=@*/
var createPool = require(43),
    consts = require(10);


var MountPatchPrototype;


module.exports = MountPatch;


function MountPatch() {
    this.type = consts.MOUNT;
    this.id = null;
    this.next = null;
}
createPool(MountPatch);
MountPatchPrototype = MountPatch.prototype;

MountPatch.create = function(id, next) {
    var patch = MountPatch.getPooled();
    patch.id = id;
    patch.next = next;
    return patch;
};

MountPatchPrototype.destructor = function() {
    this.id = null;
    this.next = null;
    return this;
};

MountPatchPrototype.destroy = function() {
    return MountPatch.release(this);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/UnmountPatch.js-=@*/
var createPool = require(43),
    consts = require(10);


var UnmountPatchPrototype;


module.exports = UnmountPatch;


function UnmountPatch() {
    this.type = consts.UNMOUNT;
    this.id = null;
}
createPool(UnmountPatch);
UnmountPatchPrototype = UnmountPatch.prototype;

UnmountPatch.create = function(id) {
    var patch = UnmountPatch.getPooled();
    patch.id = id;
    return patch;
};

UnmountPatchPrototype.destructor = function() {
    this.id = null;
    return this;
};

UnmountPatchPrototype.destroy = function() {
    return UnmountPatch.release(this);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/OrderPatch.js-=@*/
var createPool = require(43),
    consts = require(10);


var OrderPatchPrototype;


module.exports = OrderPatch;


function OrderPatch() {
    this.type = consts.ORDER;
    this.id = null;
    this.order = null;
}
createPool(OrderPatch);
OrderPatchPrototype = OrderPatch.prototype;

OrderPatch.create = function(id, order) {
    var patch = OrderPatch.getPooled();
    patch.id = id;
    patch.order = order;
    return patch;
};

OrderPatchPrototype.destructor = function() {
    this.id = null;
    this.order = null;
    return this;
};

OrderPatchPrototype.destroy = function() {
    return OrderPatch.release(this);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/PropsPatch.js-=@*/
var createPool = require(43),
    consts = require(10);


var PropsPatchPrototype;


module.exports = PropsPatch;


function PropsPatch() {
    this.type = consts.PROPS;
    this.id = null;
    this.previous = null;
    this.next = null;
}
createPool(PropsPatch);
PropsPatchPrototype = PropsPatch.prototype;

PropsPatch.create = function(id, previous, next) {
    var patch = PropsPatch.getPooled();
    patch.id = id;
    patch.previous = previous;
    patch.next = next;
    return patch;
};

PropsPatchPrototype.destructor = function() {
    this.id = null;
    this.previous = null;
    this.next = null;
    return this;
};

PropsPatchPrototype.destroy = function() {
    return PropsPatch.release(this);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/RemovePatch.js-=@*/
var createPool = require(43),
    consts = require(10);


var RemovePatchPrototype;


module.exports = RemovePatch;


function RemovePatch() {
    this.type = consts.REMOVE;
    this.id = null;
    this.childId = null;
    this.index = null;
}
createPool(RemovePatch);
RemovePatchPrototype = RemovePatch.prototype;

RemovePatch.create = function(id, childId, index) {
    var patch = RemovePatch.getPooled();
    patch.id = id;
    patch.childId = childId;
    patch.index = index;
    return patch;
};

RemovePatchPrototype.destructor = function() {
    this.id = null;
    this.childId = null;
    this.index = null;
    return this;
};

RemovePatchPrototype.destroy = function() {
    return RemovePatch.release(this);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/ReplacePatch.js-=@*/
var createPool = require(43),
    consts = require(10);


var ReplacePatchPrototype;


module.exports = ReplacePatch;


function ReplacePatch() {
    this.type = consts.REPLACE;
    this.id = null;
    this.childId = null;
    this.index = null;
    this.next = null;
}
createPool(ReplacePatch);
ReplacePatchPrototype = ReplacePatch.prototype;

ReplacePatch.create = function(id, childId, index, next) {
    var patch = ReplacePatch.getPooled();
    patch.id = id;
    patch.childId = childId;
    patch.index = index;
    patch.next = next;
    return patch;
};

ReplacePatchPrototype.destructor = function() {
    this.id = null;
    this.childId = null;
    this.index = null;
    this.next = null;
    return this;
};

ReplacePatchPrototype.destroy = function() {
    return ReplacePatch.release(this);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/Transaction/TextPatch.js-=@*/
var createPool = require(43),
    propsToJSON = require(28),
    consts = require(10);


var TextPatchPrototype;


module.exports = TextPatch;


function TextPatch() {
    this.type = consts.TEXT;
    this.id = null;
    this.index = null;
    this.next = null;
    this.props = null;
}
createPool(TextPatch);
TextPatchPrototype = TextPatch.prototype;

TextPatch.create = function(id, index, next, props) {
    var patch = TextPatch.getPooled();
    patch.id = id;
    patch.index = index;
    patch.next = next;
    patch.props = props;
    return patch;
};

TextPatchPrototype.destructor = function() {
    this.id = null;
    this.index = null;
    this.next = null;
    this.props = null;
    return this;
};

TextPatchPrototype.destroy = function() {
    return TextPatch.release(this);
};

TextPatchPrototype.toJSON = function() {
    return {
        type: this.type,
        id: this.id,
        index: this.index,
        next: this.next,
        props: propsToJSON(this.props)
    };
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/define_property@0.0.3/src/index.js-=@*/
var isObject = require(22),
    isFunction = require(19),
    isPrimitive = require(18),
    isNative = require(31),
    has = require(25);


var nativeDefineProperty = Object.defineProperty;


module.exports = defineProperty;


function defineProperty(object, name, descriptor) {
    if (isPrimitive(descriptor) || isFunction(descriptor)) {
        descriptor = {
            value: descriptor
        };
    }
    return nativeDefineProperty(object, name, descriptor);
}

defineProperty.hasGettersSetters = true;

if (!isNative(nativeDefineProperty) || !(function() {
        var object = {},
            value = {};

        try {
            nativeDefineProperty(object, "key", {
                value: value
            });
            if (has(object, "key") && object.key === value) {
                return true;
            } else {
                return false;
            }
        } catch (e) {}

        return false;
    }())) {

    defineProperty.hasGettersSetters = false;

    nativeDefineProperty = function defineProperty(object, name, descriptor) {
        if (!isObject(object)) {
            throw new TypeError("defineProperty(object, name, descriptor) called on non-object");
        }
        if (has(descriptor, "get") || has(descriptor, "set")) {
            throw new TypeError("defineProperty(object, name, descriptor) this environment does not support getters or setters");
        }
        object[name] = descriptor.value;
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/key_mirror@0.0.2/src/index.js-=@*/
var keys = require(36),
    isArrayLike = require(56);


module.exports = keyMirror;


function keyMirror(object) {
    return isArrayLike(object) ? keyMirrorArray(object) : keyMirrorObject(Object(object));
}

function keyMirrorArray(array) {
    var i = array.length,
        results = {},
        key;

    while (i--) {
        key = array[i];
        results[key] = array[i];
    }

    return results;
}

function keyMirrorObject(object) {
    var objectKeys = keys(object),
        i = -1,
        il = objectKeys.length - 1,
        results = {},
        key;

    while (i++ < il) {
        key = objectKeys[i];
        results[key] = key;
    }

    return results;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_array_like@0.0.2/src/index.js-=@*/
var isLength = require(32),
    isFunction = require(19),
    isObject = require(22);


module.exports = isArrayLike;


function isArrayLike(value) {
    return !isFunction(value) && isObject(value) && isLength(value.length);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/index_of@0.0.1/src/index.js-=@*/
var isEqual = require(58);


module.exports = indexOf;


function indexOf(array, value, fromIndex) {
    var i = (fromIndex || 0) - 1,
        il = array.length - 1;

    while (i++ < il) {
        if (isEqual(array[i], value)) {
            return i;
        }
    }

    return -1;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_equal@0.0.1/src/index.js-=@*/
module.exports = isEqual;


function isEqual(a, b) {
    return !(a !== b && !(a !== a && b !== b));
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/componentState.js-=@*/
var keyMirror = require(55);


module.exports = keyMirror([
    "MOUNTING",
    "MOUNTED",
    "UPDATING",
    "UNMOUNTING",
    "UNMOUNTED"
]);
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/getComponentClassForType.js-=@*/
var createNativeComponentForType = require(63);


module.exports = getComponentClassForType;


function getComponentClassForType(type, rootNativeComponents) {
    var Class = rootNativeComponents[type];

    if (Class) {
        return Class;
    } else {
        Class = createNativeComponentForType(type);
        rootNativeComponents[type] = Class;
        return Class;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/diffChildren.js-=@*/
var isNull = require(29),
    isUndefined = require(30),
    isNullOrUndefined = require(23),
    getChildKey = require(8),
    shouldUpdate = require(40),
    View = require(5),
    Node;


var isPrimitiveView = View.isPrimitiveView;


module.exports = diffChildren;


Node = require(42);


function diffChildren(node, previous, next, transaction) {
    var root = node.root,
        previousChildren = previous.children,
        nextChildren = reorder(previousChildren, next.children),
        previousLength = previousChildren.length,
        nextLength = nextChildren.length,
        parentId = node.id,
        i = -1,
        il = (previousLength > nextLength ? previousLength : nextLength) - 1;

    while (i++ < il) {
        diffChild(root, node, previous, next, previousChildren[i], nextChildren[i], parentId, i, transaction);
    }

    if (nextChildren.moves) {
        transaction.order(parentId, nextChildren.moves);
    }
}

function diffChild(root, parentNode, previous, next, previousChild, nextChild, parentId, index, transaction) {
    var node, id;

    if (previousChild !== nextChild) {
        if (isNullOrUndefined(previousChild)) {
            if (isPrimitiveView(nextChild)) {
                transaction.insert(parentId, null, index, nextChild);
            } else {
                id = getChildKey(parentId, nextChild, index);
                node = Node.create(parentId, id, nextChild);
                parentNode.appendNode(node);
                transaction.insert(parentId, id, index, node.__mount(transaction));
            }
        } else if (isPrimitiveView(previousChild)) {
            if (isNullOrUndefined(nextChild)) {
                transaction.remove(parentId, null, index);
            } else if (isPrimitiveView(nextChild)) {
                transaction.text(parentId, index, nextChild, next.props);
            } else {
                id = getChildKey(parentId, nextChild, index);
                node = Node.create(parentId, id, nextChild);
                parentNode.appendNode(node);
                transaction.replace(parentId, id, index, node.__mount(transaction));
            }
        } else {
            if (isNullOrUndefined(nextChild)) {
                id = getChildKey(parentId, previousChild, index);
                node = root.childHash[id];
                if (node) {
                    node.unmount(transaction);
                    parentNode.removeNode(node);
                }
            } else if (isPrimitiveView(nextChild)) {
                transaction.replace(parentId, null, index, nextChild);
            } else {
                id = getChildKey(parentId, previousChild, index);
                node = root.childHash[id];

                if (node) {
                    if (shouldUpdate(previousChild, nextChild)) {
                        node.forceUpdate(nextChild, transaction);
                    } else {
                        node.__unmount(transaction);
                        parentNode.removeNode(node);

                        id = getChildKey(parentId, nextChild, index);
                        node = Node.create(parentId, id, nextChild);
                        parentNode.appendNode(node);
                        transaction.replace(parentId, id, index, node.__mount(transaction));
                    }
                } else {
                    id = getChildKey(parentId, nextChild, index);
                    node = Node.create(parentId, id, nextChild);
                    parentNode.appendNode(node);
                    transaction.insert(parentId, id, index, node.__mount(transaction));
                }
            }
        }
    }
}

function reorder(previousChildren, nextChildren) {
    var previousKeys, nextKeys, previousMatch, nextMatch, key, previousLength, nextLength,
        length, shuffle, freeIndex, i, moveIndex, moves, removes, reverse, hasMoves, move, freeChild;

    nextKeys = keyIndex(nextChildren);
    if (isNull(nextKeys)) {
        return nextChildren;
    }

    previousKeys = keyIndex(previousChildren);
    if (isNull(previousKeys)) {
        return nextChildren;
    }

    nextMatch = {};
    previousMatch = {};

    for (key in nextKeys) {
        nextMatch[nextKeys[key]] = previousKeys[key];
    }

    for (key in previousKeys) {
        previousMatch[previousKeys[key]] = nextKeys[key];
    }

    previousLength = previousChildren.length;
    nextLength = nextChildren.length;
    length = previousLength > nextLength ? previousLength : nextLength;
    shuffle = [];
    freeIndex = 0;
    i = 0;
    moveIndex = 0;
    moves = {};
    removes = moves.removes = {};
    reverse = moves.reverse = {};
    hasMoves = false;

    while (freeIndex < length) {
        move = previousMatch[i];

        if (!isUndefined(move)) {
            shuffle[i] = nextChildren[move];

            if (move !== moveIndex) {
                moves[move] = moveIndex;
                reverse[moveIndex] = move;
                hasMoves = true;
            }

            moveIndex++;
        } else if (i in previousMatch) {
            shuffle[i] = void(0);
            removes[i] = moveIndex++;
            hasMoves = true;
        } else {
            while (!isUndefined(nextMatch[freeIndex])) {
                freeIndex++;
            }

            if (freeIndex < length) {
                freeChild = nextChildren[freeIndex];

                if (freeChild) {
                    shuffle[i] = freeChild;
                    if (freeIndex !== moveIndex) {
                        hasMoves = true;
                        moves[freeIndex] = moveIndex;
                        reverse[moveIndex] = freeIndex;
                    }
                    moveIndex++;
                }
                freeIndex++;
            }
        }
        i++;
    }

    if (hasMoves) {
        shuffle.moves = moves;
    }

    return shuffle;
}

function keyIndex(children) {
    var i = -1,
        il = children.length - 1,
        keys = null,
        child;

    while (i++ < il) {
        child = children[i];

        if (!isNullOrUndefined(child.key)) {
            keys = keys || {};
            keys[child.key] = i;
        }
    }

    return keys;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/diffProps.js-=@*/
var isObject = require(22),
    getPrototypeOf = require(35),
    isNull = require(29),
    isNullOrUndefined = require(23);


module.exports = diffProps;


function diffProps(id, eventManager, transaction, previous, next) {
    var result = null,
        propNameToTopLevel = eventManager.propNameToTopLevel,
        key, topLevel, previousValue, nextValue, propsDiff;

    for (key in previous) {
        nextValue = next[key];

        if (isNullOrUndefined(nextValue)) {
            result = result || {};
            result[key] = undefined;

            if ((topLevel = propNameToTopLevel[key])) {
                eventManager.off(id, topLevel, transaction);
            }
        } else {
            previousValue = previous[key];

            if (previousValue === nextValue) {
                continue;
            } else if (isObject(previousValue) && isObject(nextValue)) {
                if (getPrototypeOf(previousValue) !== getPrototypeOf(nextValue)) {
                    result = result || {};
                    result[key] = nextValue;
                } else {
                    propsDiff = diffProps(id, eventManager, transaction, previousValue, nextValue);

                    if (!isNull(propsDiff)) {
                        result = result || {};
                        result[key] = propsDiff;
                    }
                }
            } else {
                result = result || {};
                result[key] = nextValue;
            }
        }
    }

    for (key in next) {
        if (isNullOrUndefined(previous[key])) {
            nextValue = next[key];

            result = result || {};
            result[key] = nextValue;

            if ((topLevel = propNameToTopLevel[key])) {
                eventManager.on(id, topLevel, nextValue, transaction);
            }
        }
    }

    return result;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/createNativeComponentForType.js-=@*/
var View = require(5),
    Component = require(7);


module.exports = createNativeComponentForType;


function createNativeComponentForType(type) {

    function NativeComponent(props, children) {
        Component.call(this, props, children);
    }
    Component.extend(NativeComponent, type);

    NativeComponent.prototype.render = function() {
        return new View(type, null, null, this.props, this.children, null, null);
    };

    return NativeComponent;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/inherits@0.0.3/src/index.js-=@*/
var create = require(65),
    extend = require(27),
    mixin = require(66),
    defineProperty = require(67);


var descriptor = {
    configurable: true,
    enumerable: false,
    writable: true,
    value: null
};


module.exports = inherits;


function inherits(child, parent) {

    mixin(child, parent);

    if (child.__super) {
        child.prototype = extend(create(parent.prototype), child.__super, child.prototype);
    } else {
        child.prototype = extend(create(parent.prototype), child.prototype);
    }

    defineNonEnumerableProperty(child, "__super", parent.prototype);
    defineNonEnumerableProperty(child.prototype, "constructor", child);

    child.defineStatic = defineStatic;
    child.super_ = parent;

    return child;
}
inherits.defineProperty = defineNonEnumerableProperty;

function defineNonEnumerableProperty(object, name, value) {
    descriptor.value = value;
    defineProperty(object, name, descriptor);
    descriptor.value = null;
}

function defineStatic(name, value) {
    defineNonEnumerableProperty(this, name, value);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/create@0.0.2/src/index.js-=@*/
var isNull = require(29),
    isNative = require(31),
    isPrimitive = require(18);


var nativeCreate = Object.create;


module.exports = create;


function create(object) {
    return nativeCreate(isPrimitive(object) ? null : object);
}

if (!isNative(nativeCreate)) {
    nativeCreate = function nativeCreate(object) {
        var newObject;

        function F() {
            this.constructor = F;
        }

        if (isNull(object)) {
            F.prototype = null;
            newObject = new F();
            newObject.constructor = newObject.__proto__ = null;
            delete newObject.__proto__;
            return newObject;
        } else {
            F.prototype = object;
            return new F();
        }
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/mixin@0.0.2/src/index.js-=@*/
var keys = require(68),
    isNullOrUndefined = require(23);


module.exports = mixin;


function mixin(out) {
    var i = 0,
        il = arguments.length - 1;

    while (i++ < il) {
        baseMixin(out, arguments[i]);
    }

    return out;
}

function baseMixin(a, b) {
    var objectKeys = keys(b),
        i = -1,
        il = objectKeys.length - 1,
        key, value;

    while (i++ < il) {
        key = objectKeys[i];

        if (isNullOrUndefined(a[key]) && !isNullOrUndefined((value = b[key]))) {
            a[key] = value;
        }
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/define_property@0.0.2/src/index.js-=@*/
var isObject = require(22),
    isFunction = require(19),
    isPrimitive = require(18),
    isNative = require(31),
    has = require(37);


var nativeDefineProperty = Object.defineProperty;


module.exports = defineProperty;


function defineProperty(object, name, descriptor) {
    if (isPrimitive(descriptor) || isFunction(descriptor)) {
        descriptor = {
            value: descriptor
        };
    }
    return nativeDefineProperty(object, name, descriptor);
}

defineProperty.hasGettersSetters = true;

if (!isNative(nativeDefineProperty) || !(function() {
        var object = {},
            value = {};

        try {
            nativeDefineProperty(object, "key", {
                value: value
            });
            if (has(object, "key") && object.key === value) {
                return true;
            } else {
                return false;
            }
        } catch (e) {}

        return false;
    }())) {

    defineProperty.hasGettersSetters = false;

    nativeDefineProperty = function defineProperty(object, name, descriptor) {
        if (!isObject(object)) {
            throw new TypeError("defineProperty(object, name, descriptor) called on non-object");
        }
        if (has(descriptor, "get") || has(descriptor, "set")) {
            throw new TypeError("defineProperty(object, name, descriptor) this environment does not support getters or setters");
        }
        object[name] = descriptor.value;
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/keys@0.0.2/src/index.js-=@*/
var has = require(25),
    isNative = require(31),
    isNullOrUndefined = require(23),
    isObject = require(22);


var nativeKeys = Object.keys;


module.exports = keys;


function keys(value) {
    if (isNullOrUndefined(value)) {
        return [];
    } else {
        return nativeKeys(isObject(value) ? value : Object(value));
    }
}

if (!isNative(nativeKeys)) {
    nativeKeys = function keys(value) {
        var localHas = has,
            out = [],
            i = 0,
            key;

        for (key in value) {
            if (localHas(value, key)) {
                out[i++] = key;
            }
        }

        return out;
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/getViewKey.js-=@*/
var isNullOrUndefined = require(23);


var reEscape = /[=.:]/g;


module.exports = getViewKey;


function getViewKey(view, index) {
    var key = view.key;

    if (isNullOrUndefined(key)) {
        return index.toString(36);
    } else {
        return "$" + escapeKey(key);
    }
}

function escapeKey(key) {
    return (key + "").replace(reEscape, "$");
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/isBoundary.js-=@*/
module.exports = isBoundary;


function isBoundary(id, index) {
    return id.charAt(index) === "." || index === id.length;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt@0.0.13/src/utils/traversePath.js-=@*/
var isBoundary = require(70),
    isAncestorIdOf = require(11);


module.exports = traversePath;


function traversePath(start, stop, callback, skipFirst, skipLast) {
    var traverseUp = isAncestorIdOf(stop, start),
        traverse = traverseUp ? getParentID : getNextDescendantID,
        id = start,
        ret;

    while (true) {
        if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
            ret = callback(id, traverseUp);
        }
        if (ret === false || id === stop) {
            break;
        }

        id = traverse(id, stop);
    }
}

function getNextDescendantID(ancestorID, destinationID) {
    var start, i, il;

    if (ancestorID === destinationID) {
        return ancestorID;
    } else {
        start = ancestorID.length + 1;
        i = start - 1;
        il = destinationID.length - 1;

        while (i++ < il) {
            if (isBoundary(destinationID, i)) {
                break;
            }
        }

        return destinationID.substr(0, i);
    }
}

function getParentID(id) {
    return id ? id.substr(0, id.lastIndexOf(".")) : "";
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/renderString.js-=@*/
var virt = require(1),

    isFunction = require(19),
    isString = require(21),
    isObject = require(22),
    isNullOrUndefined = require(23),

    hyphenateStyleName = require(80),
    renderMarkup = require(81),
    DOM_ID_NAME = require(82);


var View = virt.View,

    isView = View.isView,
    isPrimitiveView = View.isPrimitiveView,

    closedTags = {
        area: true,
        base: true,
        br: true,
        col: true,
        command: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
    };


module.exports = render;


var renderChildrenString = require(83);


function render(view, parentProps, id) {
    var type, props;

    if (isPrimitiveView(view)) {
        return isString(view) ? renderMarkup(view, parentProps) : view + "";
    } else {
        type = view.type;
        props = view.props;

        return (
            closedTags[type] !== true ?
            contentTag(type, renderChildrenString(view.children, props, id), id, props) :
            closedTag(type, id, view.props)
        );
    }
}

function styleTag(props) {
    var attributes = "",
        key;

    for (key in props) {
        attributes += hyphenateStyleName(key) + ':' + props[key] + ';';
    }

    return attributes;
}

function baseTagOptions(props) {
    var attributes = "",
        key, value;

    for (key in props) {
        if (key !== "dangerouslySetInnerHTML") {
            value = props[key];

            if (!isNullOrUndefined(value) && !isFunction(value) && !isView(value)) {
                if (key === "className") {
                    key = "class";
                }

                if (key === "style") {
                    attributes += 'style="' + styleTag(value) + '"';
                } else {
                    if (isObject(value)) {
                        attributes += baseTagOptions(value);
                    } else {
                        attributes += key + '="' + value + '" ';
                    }
                }
            }
        }
    }

    return attributes;
}

function tagOptions(id, props) {
    var attributes = baseTagOptions(props);
    return attributes !== "" ? " " + attributes : attributes;
}

function dataId(id) {
    return ' ' + DOM_ID_NAME + '="' + id + '"';
}

function closedTag(type, id, props) {
    return "<" + type + (isObject(props) ? tagOptions(id, props) : "") + dataId(id) + "/>";
}

function contentTag(type, content, id, props) {
    return (
        "<" + type + (isObject(props) ? tagOptions(id, props) : "") + dataId(id) + ">" +
        content +
        "</" + type + ">"
    );
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/components.js-=@*/
var components = exports;


components.button = require(85);
components.img = require(86);
components.input = require(87);
components.textarea = require(88);
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/handlers.js-=@*/
var extend = require(27);


extend(
    exports,
    require(89),
    require(90),
    require(91),
    require(92),
    require(93)
);
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/render.js-=@*/
var virt = require(1),
    isNull = require(29),
    isUndefined = require(30),
    Adapter = require(121),
    rootsById = require(122),
    getRootNodeId = require(123);


var Root = virt.Root;


module.exports = render;


function render(nextView, containerDOMNode, callback) {
    var id = getRootNodeId(containerDOMNode),
        root;

    if (isNull(id) || isUndefined(rootsById[id])) {
        root = new Root();
        root.adapter = new Adapter(root, containerDOMNode);
        id = root.id;
        rootsById[id] = root;
    } else {
        root = rootsById[id];
    }

    root.render(nextView, id, callback);

    return root;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/unmount.js-=@*/
var rootsById = require(122),
    getRootNodeInContainer = require(214),
    getNodeId = require(213);


module.exports = unmount;


function unmount(containerDOMNode) {
    var rootDOMNode = getRootNodeInContainer(containerDOMNode),
        id = getNodeId(rootDOMNode),
        root = rootsById[id];

    if (root !== undefined) {
        root.unmount();
        delete rootsById[id];
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/findDOMNode.js-=@*/
var isString = require(21),
    getNodeById = require(103);


module.exports = findDOMNode;


function findDOMNode(value) {
    if (isString(value)) {
        return getNodeById(value);
    } else if (value && value.__node) {
        return getNodeById(value.__node.id);
    } else if (value && value.id) {
        return getNodeById(value.id);
    } else {
        return null;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/findRoot.js-=@*/
var virt = require(1),
    isString = require(21),
    rootsById = require(122);


var getRootIdFromId = virt.getRootIdFromId;


module.exports = findRoot;


function findRoot(value) {
    if (isString(value)) {
        return rootsById[getRootIdFromId(value)];
    } else {
        return null;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/findEventHandler.js-=@*/
var virt = require(1),
    isString = require(21),
    eventHandlersById = require(120);


var getRootIdFromId = virt.getRootIdFromId;


module.exports = findDOMNode;


function findDOMNode(value) {
    if (isString(value)) {
        return eventHandlersById[getRootIdFromId(value)];
    } else {
        return null;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/hyphenateStyleName.js-=@*/
var reUppercasePattern = /([A-Z])/g,
    reMS = /^ms-/;


module.exports = hyphenateStyleName;


function hyphenateStyleName(str) {
    return str.replace(reUppercasePattern, "-$1").toLowerCase().replace(reMS, "-ms-");
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/renderMarkup.js-=@*/
var escapeTextContent = require(84);


module.exports = renderMarkup;


function renderMarkup(markup, props) {
    if (props && props.dangerouslySetInnerHTML !== true) {
        return escapeTextContent(markup);
    } else {
        return markup;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/DOM_ID_NAME.js-=@*/
module.exports = "data-virtid";
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/renderChildrenString.js-=@*/
var virt = require(1);


var getChildKey = virt.getChildKey;


module.exports = renderChildrenString;


var renderString = require(72);


function renderChildrenString(children, parentProps, id) {
    var localRenderString = renderString,
        localGetChildKey = getChildKey,
        out = "",
        i = -1,
        il = children.length - 1,
        child;

    while (i++ < il) {
        child = children[i];
        out += localRenderString(child, parentProps, localGetChildKey(id, child, i));
    }

    return out;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/escape_text_content@0.0.1/src/index.js-=@*/
var reEscape = /[&><"']/g;


module.exports = escapeTextContent;


function escapeTextContent(text) {
    return (text + "").replace(reEscape, escaper);
}

function escaper(match) {
    switch (match) {
        case "&":
            return "&amp;";
        case ">":
            return "&gt;";
        case "<":
            return "&lt;";
        case "\"":
            return "&quot;";
        case "'":
            return "&#x27;";
        default:
            return match;
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/Button.js-=@*/
var virt = require(1),
    indexOf = require(57),
    has = require(25);


var View = virt.View,
    Component = virt.Component,

    mouseListenerNames = [
        "onClick",
        "onDoubleClick",
        "onMouseDown",
        "onMouseMove",
        "onMouseUp"
    ],

    ButtonPrototype;


module.exports = Button;


function Button(props, children, context) {
    var _this = this;

    Component.call(this, props, children, context);

    this.focus = function(e) {
        return _this.__focus(e);
    };
    this.blur = function(e) {
        return _this.__blur(e);
    };
}
Component.extend(Button, "button");
ButtonPrototype = Button.prototype;

ButtonPrototype.componentDidMount = function() {
    if (this.props.autoFocus) {
        this.__focus();
    }
};

ButtonPrototype.__focus = function(callback) {
    this.emitMessage("virt.dom.Button.focus", {
        id: this.getInternalId()
    }, callback);
};

ButtonPrototype.__blur = function(callback) {
    this.emitMessage("virt.dom.Button.blur", {
        id: this.getInternalId()
    }, callback);
};

ButtonPrototype.__getRenderProps = function() {
    var props = this.props,
        localHas = has,
        renderProps = {},
        key;

    if (props.disabled) {
        for (key in props) {
            if (localHas(props, key) && indexOf(mouseListenerNames, key) === -1) {
                renderProps[key] = props[key];
            }
        }

        renderProps.disabled = true;
    } else {
        for (key in props) {
            if (localHas(props, key) && key !== "disabled") {
                renderProps[key] = props[key];
            }
        }
    }

    return renderProps;
};

ButtonPrototype.render = function() {
    return new View("button", null, null, this.__getRenderProps(), this.children, null, null);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/Image.js-=@*/
var process = require(17);
var virt = require(1),
    has = require(25),
    emptyFunction = require(38);


var View = virt.View,
    Component = virt.Component,
    ImagePrototype;


module.exports = Image;


function Image(props, children, context) {
    if (process.env.NODE_ENV !== "production") {
        if (children.length > 0) {
            throw new Error("Image: img can not have children");
        }
    }

    Component.call(this, getProps(props), children, context);

    this.__lastSrc = null;
    this.__originalProps = props;
    this.__hasEvents = !!(props.onLoad || props.onError);
}
Component.extend(Image, "img");
ImagePrototype = Image.prototype;

ImagePrototype.componentDidMount = function() {
    var src = this.__originalProps.src;

    this.__lastSrc = src;
    this.emitMessage("virt.dom.Image.mount", {
        id: this.getInternalId(),
        src: src
    });
};

ImagePrototype.componentWillReceiveProps = function(nextProps) {
    Image_onProps(this, nextProps);
};

ImagePrototype.componentDidUpdate = function() {
    var src;

    Image_onProps(this, this.__originalProps);
    src = this.__originalProps.src;

    if (this.__lastSrc !== src) {
        this.__lastSrc = src;

        this.emitMessage("virt.dom.Image.setSrc", {
            id: this.getInternalId(),
            src: src
        });
    }
};

ImagePrototype.render = function() {
    return new View("img", null, null, this.props, this.children, null, null);
};

function Image_onProps(_this, props) {
    _this.props = getProps(props);
    _this.__originalProps = props;
    _this.__hasEvents = !!(props.onLoad || props.onError);
}

function getProps(props) {
    var localHas = has,
        renderProps = {
            onLoad: emptyFunction,
            onError: emptyFunction
        },
        key;

    for (key in props) {
        if (localHas(props, key) && key !== "src") {
            renderProps[key] = props[key];
        }
    }

    return renderProps;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/Input.js-=@*/
var process = require(17);
var virt = require(1),
    has = require(25),
    isFunction = require(19),
    isNullOrUndefined = require(23);


var View = virt.View,
    Component = virt.Component,
    InputPrototype;


module.exports = Input;


function Input(props, children, context) {
    var _this = this;

    if (process.env.NODE_ENV !== "production") {
        if (children.length > 0) {
            throw new Error("Input: input can't have children");
        }
    }

    Component.call(this, props, children, context);

    this.onInput = function(e) {
        return _this.__onInput(e);
    };
    this.onChange = function(e) {
        return _this.__onChange(e);
    };
    this.setChecked = function(checked, callback) {
        return _this.__setChecked(checked, callback);
    };
    this.getValue = function(callback) {
        return _this.__getValue(callback);
    };
    this.setValue = function(value, focus, callback) {
        return _this.__setValue(value, focus, callback);
    };
    this.getSelection = function(callback) {
        return _this.__getSelection(callback);
    };
    this.setSelection = function(start, end, callback) {
        return _this.__setSelection(start, end, callback);
    };
    this.focus = function(callback) {
        return _this.__focus(callback);
    };
    this.blur = function(callback) {
        return _this.__blur(callback);
    };

}
Component.extend(Input, "input");
InputPrototype = Input.prototype;

Input.getDefaultProps = function() {
    return {
        type: "text"
    };
};

InputPrototype.componentDidMount = function() {
    var props = this.props;

    if (props.autoFocus) {
        this.__focus();
    }

    if (props.type === "radio" && props.checked) {
        this.__setChecked(props.checked);
        Input_uncheckSiblings(this, this.__node.parent.renderedChildren);
    }
};

InputPrototype.componentDidUpdate = function(previousProps) {
    var value = this.props.value,
        previousValue = previousProps.value;

    if (!isNullOrUndefined(value) && value === previousValue) {
        this.__setValue(value);
    }
};

InputPrototype.__onInput = function(e) {
    this.__onChange(e);
};

InputPrototype.__onChange = function(e) {
    var props = this.props,
        type = props.type,
        isRadio = type === "radio";

    if (isRadio || type === "checkbox") {
        e.preventDefault();
        props.checked = !props.checked;
        this.__setChecked(props.checked);

        if (isRadio) {
            Input_uncheckSiblings(this, this.__node.parent.renderedChildren);
        }
    }

    if (props.onInput) {
        props.onInput(e);
    }
    if (props.onChange) {
        props.onChange(e);
    }

    this.forceUpdate();
};

function Input_uncheckSiblings(input, siblings) {
    var i = -1,
        il = siblings.length - 1,
        sibling, props;

    while (i++ < il) {
        sibling = siblings[i].component;

        if (
            input !== sibling &&
            sibling.constructor === Input &&
            (props = sibling.props) &&
            props.type === "radio"
        ) {
            props.checked = false;
            sibling.__setChecked(props.checked);
        }
    }
}

InputPrototype.__setChecked = function(checked, callback) {
    this.emitMessage("virt.dom.Input.setChecked", {
        id: this.getInternalId(),
        checked: !!checked
    }, callback);
};

InputPrototype.__getValue = function(callback) {
    this.emitMessage("virt.dom.Input.getValue", {
        id: this.getInternalId(),
        type: this.props.type
    }, callback);
};

InputPrototype.__setValue = function(value, focus, callback) {
    var type = this.props.type;

    if (isFunction(focus)) {
        callback = focus;
        focus = void(0);
    }

    if (type === "radio" || type === "checkbox") {
        this.__setChecked(value, callback);
    } else {
        this.emitMessage("virt.dom.Input.setValue", {
            id: this.getInternalId(),
            focus: focus,
            value: value
        }, callback);
    }
};

InputPrototype.__getSelection = function(callback) {
    this.emitMessage("virt.dom.Input.getSelection", {
        id: this.getInternalId()
    }, callback);
};

InputPrototype.__setSelection = function(start, end, callback) {
    if (isFunction(end)) {
        callback = end;
        end = start;
    }
    this.emitMessage("virt.dom.Input.setSelection", {
        id: this.getInternalId(),
        start: start,
        end: end
    }, callback);
};

InputPrototype.__focus = function(callback) {
    this.emitMessage("virt.dom.Input.focus", {
        id: this.getInternalId()
    }, callback);
};

InputPrototype.__blur = function(callback) {
    this.emitMessage("virt.dom.Input.blur", {
        id: this.getInternalId()
    }, callback);
};

InputPrototype.__getRenderProps = function() {
    var props = this.props,

        value = props.value,
        checked = props.checked,

        defaultValue = props.defaultValue,

        initialValue = defaultValue != null ? defaultValue : null,
        initialChecked = props.defaultChecked || false,

        renderProps = {},

        key;

    for (key in props) {
        if (has(props, key) && key !== "checked") {
            renderProps[key] = props[key];
        }
    }

    if (checked != null ? checked : initialChecked) {
        renderProps.checked = true;
    }

    renderProps.defaultChecked = undefined;
    renderProps.defaultValue = undefined;
    renderProps.value = value != null ? value : initialValue;

    renderProps.onInput = this.onInput;
    renderProps.onChange = this.onChange;

    return renderProps;
};

InputPrototype.render = function() {
    return new View("input", null, null, this.__getRenderProps(), this.children, null, null);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/TextArea.js-=@*/
var process = require(17);
var virt = require(1),
    has = require(25),
    isFunction = require(19);


var View = virt.View,
    Component = virt.Component,
    TextAreaPrototype;


module.exports = TextArea;


function TextArea(props, children, context) {
    var _this = this;

    if (process.env.NODE_ENV !== "production") {
        if (children.length > 0) {
            throw new Error("TextArea: textarea can't have children, set prop.value instead");
        }
    }

    Component.call(this, props, children, context);

    this.onInput = function(e) {
        return _this.__onInput(e);
    };
    this.onChange = function(e) {
        return _this.__onChange(e);
    };
    this.getValue = function(callback) {
        return _this.__getValue(callback);
    };
    this.setValue = function(value, focus, callback) {
        return _this.__setValue(value, focus, callback);
    };
    this.getSelection = function(callback) {
        return _this.__getSelection(callback);
    };
    this.setSelection = function(start, end, callback) {
        return _this.__setSelection(start, end, callback);
    };
    this.focus = function(callback) {
        return _this.__focus(callback);
    };
    this.blur = function(callback) {
        return _this.__blur(callback);
    };
}
Component.extend(TextArea, "textarea");
TextAreaPrototype = TextArea.prototype;

TextAreaPrototype.componentDidMount = function() {
    if (this.props.autoFocus) {
        this.__focus();
    }
};

TextAreaPrototype.componentDidUpdate = function(previousProps) {
    var value = this.props.value,
        previousValue = previousProps.value;

    if (value != null && value === previousValue) {
        this.__setValue(value);
    }
};

TextAreaPrototype.__onInput = function(e) {
    this.__onChange(e, true);
};

TextAreaPrototype.__onChange = function(e, fromInput) {
    var props = this.props;

    if (fromInput && props.onInput) {
        props.onInput(e);
    }
    if (props.onChange) {
        props.onChange(e);
    }

    this.forceUpdate();
};

TextAreaPrototype.__getValue = function(callback) {
    this.emitMessage("virt.dom.TextArea.getValue", {
        id: this.getInternalId()
    }, callback);
};

TextAreaPrototype.__setValue = function(value, focus, callback) {
    if (isFunction(focus)) {
        callback = focus;
        focus = void(0);
    }
    this.emitMessage("virt.dom.TextArea.setValue", {
        id: this.getInternalId(),
        focus: focus,
        value: value
    }, callback);
};

TextAreaPrototype.__getSelection = function(callback) {
    this.emitMessage("virt.dom.TextArea.getSelection", {
        id: this.getInternalId()
    }, callback);
};

TextAreaPrototype.__setSelection = function(start, end, callback) {
    if (isFunction(end)) {
        callback = end;
        end = start;
    }
    this.emitMessage("virt.dom.TextArea.setSelection", {
        id: this.getInternalId(),
        start: start,
        end: end
    }, callback);
};

TextAreaPrototype.__focus = function(callback) {
    this.emitMessage("virt.dom.TextArea.focus", {
        id: this.getInternalId()
    }, callback);
};

TextAreaPrototype.__blur = function(callback) {
    this.emitMessage("virt.dom.TextArea.blur", {
        id: this.getInternalId()
    }, callback);
};

TextAreaPrototype.__getRenderProps = function() {
    var props = this.props,

        value = props.value,
        defaultValue = props.defaultValue,
        initialValue = defaultValue != null ? defaultValue : null,

        renderProps = {},
        key;

    for (key in props) {
        if (has(props, key)) {
            renderProps[key] = props[key];
        }
    }

    renderProps.defaultValue = undefined;
    renderProps.value = value != null ? value : initialValue;

    renderProps.onChange = this.onChange;
    renderProps.onInput = this.onInput;

    return renderProps;
};

TextAreaPrototype.render = function() {
    return new View("textarea", null, null, this.__getRenderProps(), this.children, null, null);
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/nodeHandlers.js-=@*/
var domDimensions = require(94),
    findDOMNode = require(77);


var nodeHandlers = exports;


nodeHandlers["virt.getViewTop"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domDimensions.top(node));
    } else {
        callback(new Error("getViewTop: No DOM node found with id " + data.id));
    }
};
nodeHandlers["virt.getViewRight"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domDimensions.right(node));
    } else {
        callback(new Error("getViewRight: No DOM node found with id " + data.id));
    }
};
nodeHandlers["virt.getViewBottom"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domDimensions.bottom(node));
    } else {
        callback(new Error("getViewBottom: No DOM node found with id " + data.id));
    }
};
nodeHandlers["virt.getViewLeft"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domDimensions.left(node));
    } else {
        callback(new Error("getViewLeft: No DOM node found with id " + data.id));
    }
};

nodeHandlers["virt.getViewWidth"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domDimensions.width(node));
    } else {
        callback(new Error("getViewWidth: No DOM node found with id " + data.id));
    }
};
nodeHandlers["virt.getViewHeight"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domDimensions.height(node));
    } else {
        callback(new Error("getViewHeight: No DOM node found with id " + data.id));
    }
};

nodeHandlers["virt.getViewDimensions"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domDimensions(node));
    } else {
        callback(new Error("getViewDimensions: No DOM node found with id " + data.id));
    }
};

nodeHandlers["virt.getViewProperty"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, node[data.property]);
    } else {
        callback(new Error("getViewDimensions: No DOM node found with id " + data.id));
    }
};
nodeHandlers["virt.setViewProperty"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        node[data.property] = data.value;
        callback(undefined);
    } else {
        callback(new Error("getViewDimensions: No DOM node found with id " + data.id));
    }
};

nodeHandlers["virt.getViewStyleProperty"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, node.style[data.property]);
    } else {
        callback(new Error("getViewDimensions: No DOM node found with id " + data.id));
    }
};
nodeHandlers["virt.setViewStyleProperty"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        node.style[data.property] = data.value;
        callback(undefined);
    } else {
        callback(new Error("getViewDimensions: No DOM node found with id " + data.id));
    }
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/buttonHandlers.js-=@*/
var sharedHandlers = require(105);


var buttonHandlers = exports;


buttonHandlers["virt.dom.Button.focus"] = sharedHandlers.focus;
buttonHandlers["virt.dom.Button.blur"] = sharedHandlers.blur;
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/imageHandlers.js-=@*/
var consts = require(117),
    findEventHandler = require(79),
    findDOMNode = require(77);


var topLevelTypes = consts.topLevelTypes,
    topLevelToEvent = consts.topLevelToEvent,
    imageHandlers = exports;


imageHandlers["virt.dom.Image.mount"] = function(data, callback) {
    var id = data.id,
        eventHandler = findEventHandler(id),
        node = findDOMNode(id);

    if (eventHandler && node) {
        eventHandler.addBubbledEvent(topLevelTypes.topLoad, topLevelToEvent.topLoad, node);
        eventHandler.addBubbledEvent(topLevelTypes.topError, topLevelToEvent.topError, node);
        node.src = data.src;
        callback();
    } else {
        callback(new Error("mount: No DOM node found with id " + data.id));
    }
};

imageHandlers["virt.dom.Image.setSrc"] = function(data, callback) {
    var id = data.id,
        node = findDOMNode(id);

    if (node) {
        node.src = data.src;
        callback();
    } else {
        callback(new Error("setSrc: No DOM node found with id " + data.id));
    }
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/inputHandlers.js-=@*/
var findDOMNode = require(77),
    sharedHandlers = require(105);


var inputHandlers = exports;


inputHandlers["virt.dom.Input.getValue"] = sharedHandlers.getValue;
inputHandlers["virt.dom.Input.setValue"] = sharedHandlers.setValue;
inputHandlers["virt.dom.Input.getSelection"] = sharedHandlers.getSelection;
inputHandlers["virt.dom.Input.setSelection"] = sharedHandlers.setSelection;
inputHandlers["virt.dom.Input.focus"] = sharedHandlers.focus;
inputHandlers["virt.dom.Input.blur"] = sharedHandlers.blur;


inputHandlers["virt.dom.Input.setChecked"] = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        if (data.checked) {
            node.setAttribute("checked", true);
            node.checked = true;
        } else {
            node.checked = false;
            node.removeAttribute("checked");
        }
        callback();
    } else {
        callback(new Error("setChecked: No DOM node found with id " + data.id));
    }
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/textareaHandlers.js-=@*/
var sharedHandlers = require(105);


var textareaHandlers = exports;


textareaHandlers["virt.dom.TextArea.getValue"] = sharedHandlers.getValue;
textareaHandlers["virt.dom.TextArea.setValue"] = sharedHandlers.setValue;
textareaHandlers["virt.dom.TextArea.getSelection"] = sharedHandlers.getSelection;
textareaHandlers["virt.dom.TextArea.setSelection"] = sharedHandlers.setSelection;
textareaHandlers["virt.dom.TextArea.focus"] = sharedHandlers.focus;
textareaHandlers["virt.dom.TextArea.blur"] = sharedHandlers.blur;
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/dom_dimensions@0.0.1/src/index.js-=@*/
var getCurrentStyle = require(95),
    isElement = require(96);


module.exports = domDimensions;


function domDimensions(node) {
    var dimensions = new Dimensions(),
        clientRect;

    if (isElement(node)) {
        clientRect = node.getBoundingClientRect();

        dimensions.top = clientRect.top;
        dimensions.right = clientRect.left + node.offsetWidth;
        dimensions.bottom = clientRect.top + node.offsetHeight;
        dimensions.left = clientRect.left;
        dimensions.width = dimensions.right - dimensions.left;
        dimensions.height = dimensions.bottom - dimensions.top;

        return dimensions;
    } else {
        return dimensions;
    }
}

function Dimensions() {
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
}

domDimensions.top = function(node) {
    if (isElement(node)) {
        return node.getBoundingClientRect().top;
    } else {
        return 0;
    }
};

domDimensions.right = function(node) {
    if (isElement(node)) {
        return domDimensions.left(node) + node.offsetWidth;
    } else {
        return 0;
    }
};

domDimensions.bottom = function(node) {
    if (isElement(node)) {
        return domDimensions.top(node) + node.offsetHeight;
    } else {
        return 0;
    }
};

domDimensions.left = function(node) {
    if (isElement(node)) {
        return node.getBoundingClientRect().left;
    } else {
        return 0;
    }
};

domDimensions.width = function(node) {
    if (isElement(node)) {
        return domDimensions.right(node) - domDimensions.left(node);
    } else {
        return 0;
    }
};

domDimensions.height = function(node) {
    if (isElement(node)) {
        return domDimensions.bottom(node) - domDimensions.top(node);
    } else {
        return 0;
    }
};

domDimensions.marginTop = function(node) {
    if (isElement(node)) {
        return parseInt(getCurrentStyle(node, "marginTop"), 10);
    } else {
        return 0;
    }
};

domDimensions.marginRight = function(node) {
    if (isElement(node)) {
        return parseInt(getCurrentStyle(node, "marginRight"), 10);
    } else {
        return 0;
    }
};

domDimensions.marginBottom = function(node) {
    if (isElement(node)) {
        return parseInt(getCurrentStyle(node, "marginRight"), 10);
    } else {
        return 0;
    }
};

domDimensions.marginLeft = function(node) {
    if (isElement(node)) {
        return parseInt(getCurrentStyle(node, "marginLeft"), 10);
    } else {
        return 0;
    }
};

domDimensions.outerWidth = function(node) {
    if (isElement(node)) {
        return domDimensions.width(node) + domDimensions.marginLeft(node) + domDimensions.marginRight(node);
    } else {
        return 0;
    }
};

domDimensions.outerHeight = function(node) {
    if (isElement(node)) {
        return domDimensions.height(node) + domDimensions.marginTop(node) + domDimensions.marginBottom(node);
    } else {
        return 0;
    }
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_current_style@0.0.1/src/index.js-=@*/
var supports = require(97),
    environment = require(98),
    isElement = require(96),
    isString = require(21),
    camelize = require(99);


var baseGetCurrentStyles;


module.exports = getCurrentStyle;


function getCurrentStyle(node, style) {
    if (isElement(node)) {
        if (isString(style)) {
            return baseGetCurrentStyles(node)[camelize(style)] || "";
        } else {
            return baseGetCurrentStyles(node);
        }
    } else {
        if (isString(style)) {
            return "";
        } else {
            return null;
        }
    }
}

if (supports.dom && environment.document.defaultView) {
    baseGetCurrentStyles = function(node) {
        return node.ownerDocument.defaultView.getComputedStyle(node, "");
    };
} else {
    baseGetCurrentStyles = function(node) {
        if (node.currentStyle) {
            return node.currentStyle;
        } else {
            return node.style;
        }
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_element@0.0.1/src/index.js-=@*/
var isNode = require(100);


module.exports = isElement;


function isElement(value) {
    return isNode(value) && value.nodeType === 1;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/supports@0.0.1/src/index.js-=@*/
var environment = require(98);


var supports = module.exports;


supports.dom = !!(typeof(window) !== "undefined" && window.document && window.document.createElement);
supports.workers = typeof(Worker) !== "undefined";

supports.eventListeners = supports.dom && !!environment.window.addEventListener;
supports.attachEvents = supports.dom && !!environment.window.attachEvent;

supports.viewport = supports.dom && !!environment.window.screen;
supports.touch = supports.dom && "ontouchstart" in environment.window;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/environment@0.0.1/src/index.js-=@*/
var environment = exports,

    hasWindow = typeof(window) !== "undefined",
    userAgent = hasWindow ? window.navigator.userAgent : "";


environment.worker = typeof(importScripts) !== "undefined";

environment.browser = environment.worker || !!(
    hasWindow &&
    typeof(navigator) !== "undefined" &&
    window.document
);

environment.node = !environment.worker && !environment.browser;

environment.mobile = environment.browser && /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

environment.window = (
    hasWindow ? window :
    typeof(global) !== "undefined" ? global :
    typeof(self) !== "undefined" ? self : {}
);

environment.pixelRatio = environment.window.devicePixelRatio || 1;

environment.document = typeof(document) !== "undefined" ? document : {};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/camelize@0.0.1/src/index.js-=@*/
var reInflect = require(101),
    capitalizeString = require(102);


module.exports = camelize;


function camelize(string, lowFirstLetter) {
    var parts, part, i, il;

    lowFirstLetter = lowFirstLetter !== false;
    parts = string.match(reInflect);
    i = lowFirstLetter ? 0 : -1;
    il = parts.length - 1;

    while (i++ < il) {
        parts[i] = capitalizeString(parts[i]);
    }

    if (lowFirstLetter && (part = parts[0])) {
        parts[0] = part.charAt(0).toLowerCase() + part.slice(1);
    }

    return parts.join("");
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_node@0.0.1/src/index.js-=@*/
var isString = require(21),
    isNullOrUndefined = require(23),
    isNumber = require(24),
    isFunction = require(19);


var isNode;


if (typeof(Node) !== "undefined" && isFunction(Node)) {
    isNode = function isNode(value) {
        return value instanceof Node;
    };
} else {
    isNode = function isNode(value) {
        return (!isNullOrUndefined(value) &&
            isNumber(value.nodeType) &&
            isString(value.nodeName)
        );
    };
}


module.exports = isNode;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/re_inflect@0.0.1/src/index.js-=@*/
module.exports = /[^A-Z-_ ]+|[A-Z][^A-Z-_ ]+|[^a-z-_ ]+/g;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/capitalize_string@0.0.1/src/index.js-=@*/
module.exports = capitalizeString;


function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/getNodeById.js-=@*/
var nodeCache = require(104);


module.exports = getNodeById;


function getNodeById(id) {
    return nodeCache[id];
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/nodeCache.js-=@*/

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/nativeDOM/sharedHandlers.js-=@*/
var domCaret = require(106),
    blurNode = require(107),
    focusNode = require(108),
    findDOMNode = require(77);


var sharedInputHandlers = exports;


sharedInputHandlers.getValue = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        if (data.type === "radio" || data.type === "checkbox") {
            callback(undefined, node.checked);
        } else {
            callback(undefined, node.value);
        }
    } else {
        callback(new Error("getValue: No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.setValue = function(data, callback) {
    var node = findDOMNode(data.id),
        origValue, value, focus, caret, end, origLength;

    if (node) {
        origValue = node.value;
        value = data.value || "";
        focus = data.focus !== false;

        if (value !== origValue) {
            if (focus) {
                caret = domCaret.get(node);
            }
            node.value = value;
            if (focus) {
                origLength = origValue.length;
                end = caret.end;

                if (end < origLength) {
                    domCaret.set(node, caret.start, caret.end);
                }
            }
        }
        callback();
    } else {
        callback(new Error("setValue: No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.getSelection = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domCaret.get(node));
    } else {
        callback(new Error("getSelection: No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.setSelection = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        domCaret.set(node, data.start, data.end);
        callback();
    } else {
        callback(new Error("setSelection: No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.focus = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        focusNode(node);
        callback();
    } else {
        callback(new Error("focus: No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.blur = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        blurNode(node);
        callback();
    } else {
        callback(new Error("blur: No DOM node found with id " + data.id));
    }
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/dom_caret@0.0.2/src/index.js-=@*/
var environment = require(109),
    focusNode = require(108),
    getActiveElement = require(110),
    isTextInputElement = require(111);


var domCaret = exports,

    window = environment.window,
    document = environment.document,

    getNodeCaretPosition, setNodeCaretPosition;



domCaret.get = function(node) {
    var activeElement = getActiveElement(),
        isFocused = activeElement === node,
        selection;

    if (isTextInputElement(node)) {
        if (!isFocused) {
            focusNode(node);
        }
        selection = getNodeCaretPosition(node);
        if (!isFocused) {
            focusNode(activeElement);
        }
        return selection;
    } else {
        return {
            start: 0,
            end: 0
        };
    }
};

domCaret.set = function(node, start, end) {
    var activeElement, isFocused;

    if (isTextInputElement(node)) {
        activeElement = getActiveElement();
        isFocused = activeElement === node;

        if (!isFocused) {
            focusNode(node);
        }
        setNodeCaretPosition(node, start, end === undefined ? start : end);
        if (!isFocused) {
            focusNode(activeElement);
        }
    }
};

if (!!window.getSelection) {
    getNodeCaretPosition = function getNodeCaretPosition(node) {
        return {
            start: node.selectionStart,
            end: node.selectionEnd
        };
    };
    setNodeCaretPosition = function setNodeCaretPosition(node, start, end) {
        node.setSelectionRange(start, end);
    };
} else if (document.selection && document.selection.createRange) {
    getNodeCaretPosition = function getNodeCaretPosition(node) {
        var range = document.selection.createRange(),
            position;

        range.moveStart("character", -node.value.length);
        position = range.text.length;

        return {
            start: position,
            end: position
        };
    };
    setNodeCaretPosition = function setNodeCaretPosition(node, start, end) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveStart("character", start);
        range.moveEnd("character", end);
        range.select();
    };
} else {
    getNodeCaretPosition = function getNodeCaretPosition() {
        return {
            start: 0,
            end: 0
        };
    };
    setNodeCaretPosition = function setNodeCaretPosition() {};
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/blur_node@0.0.1/src/index.js-=@*/
var isNode = require(100);


module.exports = blurNode;


function blurNode(node) {
    if (isNode(node) && node.blur) {
        try {
            node.blur();
        } catch (e) {}
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/focus_node@0.0.1/src/index.js-=@*/
var isNode = require(100);


module.exports = focusNode;


function focusNode(node) {
    if (isNode(node) && node.focus) {
        try {
            node.focus();
        } catch (e) {}
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/environment@0.0.2/src/index.js-=@*/
var Buffer = require(112).Buffer;
var process = require(17);
var environment = exports,

    hasWindow = typeof(window) !== "undefined",
    userAgent = hasWindow ? window.navigator.userAgent : "";


environment.worker = typeof(importScripts) !== "undefined";

environment.browser = environment.worker || !!(
    hasWindow &&
    typeof(navigator) !== "undefined" &&
    window.document
);

environment.node = (!hasWindow &&
    typeof(process) !== "undefined" &&
    typeof(process.versions) !== "undefined" &&
    typeof(process.versions.node) !== "undefined" &&
    typeof(Buffer) !== "undefined"
);

environment.mobile = environment.browser && /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

environment.window = (
    hasWindow ? window :
    typeof(global) !== "undefined" ? global :
    typeof(self) !== "undefined" ? self : {}
);

environment.pixelRatio = environment.window.devicePixelRatio || 1;

environment.document = typeof(document) !== "undefined" ? document : {};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_active_element@0.0.2/src/index.js-=@*/
var isDocument = require(116),
    environment = require(109);


var document = environment.document;


module.exports = getActiveElement;


function getActiveElement(ownerDocument) {
    ownerDocument = isDocument(ownerDocument) ? ownerDocument : document;

    try {
        return ownerDocument.activeElement || ownerDocument.body;
    } catch (e) {
        return ownerDocument.body;
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_text_input_element@0.0.1/src/index.js-=@*/
var isNullOrUndefined = require(23);


var reIsSupportedInputType = new RegExp("^\\b(" + [
    "color", "date", "datetime", "datetime-local", "email", "month", "number",
    "password", "range", "search", "tel", "text", "time", "url", "week"
].join("|") + ")\\b$");


module.exports = isTextInputElement;


function isTextInputElement(value) {
    return !isNullOrUndefined(value) && (
        (value.nodeName === "INPUT" && reIsSupportedInputType.test(value.type)) ||
        value.nodeName === "TEXTAREA"
    );
}

},
function(require, exports, module, undefined, global) {
/*@=-buffer@3.6.0/index.js-=@*/
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require(113)
var ieee754 = require(114)
var isArray = require(115)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
 *     on objects.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

function typedArraySupport () {
  function Bar () {}
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    arr.constructor = Bar
    return arr.foo() === 42 && // typed array instances can be augmented
        arr.constructor === Bar && // constructor can be set
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    array.byteLength
    that = Buffer._augment(new Uint8Array(array))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` is deprecated
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` is deprecated
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

},
function(require, exports, module, undefined, global) {
/*@=-base64-js@0.0.8/lib/b64.js-=@*/
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},
function(require, exports, module, undefined, global) {
/*@=-ieee754@1.1.8/index.js-=@*/
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},
function(require, exports, module, undefined, global) {
/*@=-isarray@1.0.0/index.js-=@*/
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_document@0.0.1/src/index.js-=@*/
var isNode = require(100);


module.exports = isDocument;


function isDocument(value) {
    return isNode(value) && value.nodeType === 9;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/consts.js-=@*/
var arrayMap = require(26),
    arrayForEach = require(45),
    keyMirror = require(55),
    removeTop = require(118),
    replaceTopWithOn = require(119);


var consts = exports,

    topLevelToEvent = consts.topLevelToEvent = {},
    propNameToTopLevel = consts.propNameToTopLevel = {},

    eventTypes = [
        "topAbort",
        "topAnimationEnd",
        "topAnimationIteration",
        "topAnimationStart",
        "topBlur",
        "topCanPlay",
        "topCanPlayThrough",
        "topChange",
        "topClick",
        "topCompositionEnd",
        "topCompositionStart",
        "topCompositionUpdate",
        "topContextMenu",
        "topCopy",
        "topCut",
        "topDblClick",
        "topDrag",
        "topDragEnd",
        "topDragEnter",
        "topDragExit",
        "topDragLeave",
        "topDragOver",
        "topDragStart",
        "topDrop",
        "topDurationChange",
        "topEmptied",
        "topEncrypted",
        "topEnded",
        "topError",
        "topFocus",
        "topInput",
        "topKeyDown",
        "topKeyPress",
        "topKeyUp",
        "topLoad",
        "topLoadStart",
        "topLoadedData",
        "topLoadedMetadata",
        "topMouseDown",
        "topMouseEnter",
        "topMouseMove",
        "topMouseOut",
        "topMouseOver",
        "topMouseUp",
        "topOrientationChange",
        "topPaste",
        "topPause",
        "topPlay",
        "topPlaying",
        "topProgress",
        "topRateChange",
        "topRateChange",
        "topReset",
        "topResize",
        "topScroll",
        "topSeeked",
        "topSeeking",
        "topSelectionChange",
        "topStalled",
        "topSubmit",
        "topSuspend",
        "topTextInput",
        "topTimeUpdate",
        "topTouchCancel",
        "topTouchEnd",
        "topTouchMove",
        "topTouchStart",
        "topTouchTap",
        "topTransitionEnd",
        "topVolumeChange",
        "topWaiting",
        "topWheel"
    ];

consts.phases = keyMirror([
    "bubbled",
    "captured"
]);

consts.topLevelTypes = keyMirror(eventTypes);

consts.propNames = arrayMap(eventTypes, replaceTopWithOn);

arrayForEach(eventTypes, function(string) {
    propNameToTopLevel[replaceTopWithOn(string)] = string;
});

arrayForEach(eventTypes, function(string) {
    topLevelToEvent[string] = removeTop(string).toLowerCase();
});
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/removeTop.js-=@*/
module.exports = removeTop;


function removeTop(str) {
    return str.replace(/^top/, "");
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/replaceTopWithOn.js-=@*/
module.exports = replaceTopWithOn;


function replaceTopWithOn(string) {
    return string.replace(/^top/, "on");
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/eventHandlersById.js-=@*/

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/Adapter.js-=@*/
var extend = require(27),
    Messenger = require(124),
    createMessengerAdapter = require(125),
    getWindow = require(126),
    eventHandlersById = require(120),
    nativeDOMComponents = require(73),
    nativeDOMHandlers = require(74),
    registerNativeComponents = require(127),
    registerNativeComponentHandlers = require(128),
    consts = require(117),
    EventHandler = require(129),
    eventClassMap = require(130),
    handleEventDispatch = require(131),
    applyEvents = require(132),
    applyPatches = require(133);


module.exports = Adapter;


function Adapter(root, containerDOMNode) {
    var socket = createMessengerAdapter(),

        messengerClient = new Messenger(socket.client),
        messengerServer = new Messenger(socket.server),

        propNameToTopLevel = consts.propNameToTopLevel,

        document = containerDOMNode.ownerDocument,
        window = getWindow(document),
        eventManager = root.eventManager,
        events = eventManager.events,

        eventHandler = new EventHandler(messengerClient, document, window, true);

    eventHandlersById[root.id] = eventHandler;

    this.messenger = messengerServer;
    this.messengerClient = messengerClient;

    this.root = root;
    this.containerDOMNode = containerDOMNode;

    this.document = document;
    this.window = getWindow(document);

    this.eventHandler = eventHandler;

    messengerClient.on("virt.handleTransaction", function onHandleTransaction(transaction, callback) {
        applyPatches(transaction.patches, containerDOMNode, document);
        applyEvents(transaction.events, eventHandler);
        applyPatches(transaction.removes, containerDOMNode, document);
        callback();
    });

    extend(eventManager.propNameToTopLevel, propNameToTopLevel);

    messengerServer.on("virt.dom.handleEventDispatch", function onHandleEventDispatch(data, callback) {
        var topLevelType = data.topLevelType;

        handleEventDispatch(
            root.childHash,
            events,
            topLevelType,
            data.targetId,
            eventClassMap[topLevelType].getPooled(data.nativeEvent, eventHandler)
        );

        callback();
    });

    messengerClient.on("virt.onGlobalEvent", function onHandle(topLevelType, callback) {
        eventHandler.listenTo("global", topLevelType);
        callback();
    });
    messengerClient.on("virt.offGlobalEvent", function onHandle(topLevelType, callback) {
        callback();
    });

    messengerClient.on("virt.getDeviceDimensions", function getDeviceDimensions(data, callback) {
        callback(undefined, eventHandler.getDimensions());
    });

    registerNativeComponents(root, nativeDOMComponents);
    registerNativeComponentHandlers(messengerClient, nativeDOMHandlers);
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/rootsById.js-=@*/

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/getRootNodeId.js-=@*/
var getRootNodeInContainer = require(214),
    getNodeId = require(213);


module.exports = getRootNodeId;


function getRootNodeId(containerDOMNode) {
    return getNodeId(getRootNodeInContainer(containerDOMNode));
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/messenger@0.0.3/src/index.js-=@*/
var uuid = require(134),
    Message = require(135);


var MessengerPrototype;


module.exports = Messenger;


function Messenger(adapter) {
    var _this = this;

    this.__id = uuid.v4();
    this.__messageId = 0;
    this.__callbacks = {};
    this.__listeners = {};

    this.__adapter = adapter;

    adapter.addMessageListener(function onMessage(data) {
        _this.onMessage(data);
    });
}
MessengerPrototype = Messenger.prototype;

MessengerPrototype.onMessage = function(message) {
    var id = message.id,
        name = message.name,
        callbacks, callback, listeners, adapter, listenersArray;

    if (name) {
        listeners = this.__listeners;
        adapter = this.__adapter;

        if ((listenersArray = listeners[name])) {
            Messenger_send(this, listenersArray, message.data, function onSendCallback(error, data) {
                adapter.postMessage(new Message(id, null, error, data));
            });
        }
    } else if (
        (callback = (callbacks = this.__callbacks)[id]) &&
        isMatch(id, this.__id)
    ) {
        callback(message.error, message.data, this);
        delete callbacks[id];
    }
};

MessengerPrototype.send = function(name, data, callback) {
    var callbacks = this.__callbacks,
        id = this.__id + "." + (this.__messageId++).toString(36);

    if (callback) {
        callbacks[id] = callback;
    }

    this.__adapter.postMessage(new Message(id, name, null, data));
};

MessengerPrototype.emit = MessengerPrototype.send;

MessengerPrototype.on = function(name, callback) {
    var listeners = this.__listeners,
        listener = listeners[name] || (listeners[name] = []);

    listener[listener.length] = callback;
};

MessengerPrototype.off = function(name, callback) {
    var listeners = this.__listeners,
        listener, i;

    if ((listener = listeners[name])) {
        i = listener.length;

        while (i--) {
            if (listener[i] === callback) {
                listener.splice(i, 1);
            }
        }

        if (listener.length === 0) {
            delete listeners[name];
        }
    }
};

function Messenger_send(_this, listeners, data, callback) {
    var index = 0,
        length = listeners.length,
        called = false;

    function next(error, data) {
        if (!error && index !== length) {
            listeners[index++](data, next, _this);
        } else {
            if (called === false) {
                called = true;
                callback(error, data);
            }
        }
    }

    next(void(0), data);
}

function isMatch(messageId, id) {
    return messageId.split(".")[0] === id;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/messenger_adapter@0.0.1/src/index.js-=@*/
var MessengerAdapterPrototype;


module.exports = createMessengerAdapter;


function createMessengerAdapter() {
    var client = new MessengerAdapter(),
        server = new MessengerAdapter();

    client.socket = server;
    server.socket = client;

    return {
        client: client,
        server: server
    };
}

function MessengerAdapter() {
    this.socket = null;
    this.__listeners = [];
}
MessengerAdapterPrototype = MessengerAdapter.prototype;

MessengerAdapterPrototype.addMessageListener = function(callback) {
    var listeners = this.__listeners;
    listeners[listeners.length] = callback;
};

MessengerAdapterPrototype.onMessage = function(data) {
    var listeners = this.__listeners,
        i = -1,
        il = listeners.length - 1;

    while (i++ < il) {
        listeners[i](data);
    }
};

MessengerAdapterPrototype.postMessage = function(data) {
    this.socket.onMessage(data);
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_window@0.0.2/src/index.js-=@*/
var environment = require(109),
    isDocument = require(116);


var ownerDocument = environment.document;


module.exports = getWindow;


function getWindow(document) {
    var scriptElement, parentElement;

    if (isDocument(document)) {
        document = document;
    } else {
        document = ownerDocument;
    }

    if (document.parentWindow) {
        return document.parentWindow;
    } else {
        if (!document.defaultView) {
            scriptElement = document.createElement("script");
            scriptElement.innerHTML = "document.parentWindow=window;";

            parentElement = document.documentElement;
            parentElement.appendChild(scriptElement);
            parentElement.removeChild(scriptElement);

            return document.parentWindow;
        } else {
            return document.defaultView;
        }
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/registerNativeComponents.js-=@*/
var has = require(25);


module.exports = registerNativeComponents;


function registerNativeComponents(root, nativeDOMComponents) {
    var localHas = has,
        name;

    for (name in nativeDOMComponents) {
        if (localHas(nativeDOMComponents, name)) {
            root.registerNativeComponent(name, nativeDOMComponents[name]);
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/registerNativeComponentHandlers.js-=@*/
var has = require(25);


module.exports = registerNativeComponentHandlers;


function registerNativeComponentHandlers(messenger, nativeDOMHandlers) {
    var localHas = has,
        key;

    for (key in nativeDOMHandlers) {
        if (localHas(nativeDOMHandlers, key)) {
            messenger.on(key, nativeDOMHandlers[key]);
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/EventHandler.js-=@*/
var has = require(25),
    eventListener = require(159),
    consts = require(117),
    getWindowWidth = require(160),
    getWindowHeight = require(161),
    getEventTarget = require(162),
    getNodeAttributeId = require(163),
    nativeEventToJSON = require(164),
    isEventSupported = require(165),
    ChangePlugin = require(166),
    TapPlugin = require(167);


var topLevelTypes = consts.topLevelTypes,
    topLevelToEvent = consts.topLevelToEvent,
    EventHandlerPrototype;


module.exports = EventHandler;


function EventHandler(messenger, document, window, isClient) {
    var _this = this,
        documentElement = document.documentElement ? document.documentElement : document.body,
        viewport = {
            currentScrollLeft: 0,
            currentScrollTop: 0
        };

    this.document = document;
    this.documentElement = documentElement;
    this.window = window;
    this.viewport = viewport;
    this.messenger = messenger;
    this.isClient = !!isClient;

    this.__pluginListening = {};
    this.__pluginHash = {};
    this.__plugins = [];
    this.__isListening = {};
    this.__listening = {};

    function onViewport() {
        viewport.currentScrollLeft = window.pageXOffset || documentElement.scrollLeft;
        viewport.currentScrollTop = window.pageYOffset || documentElement.scrollTop;
    }
    this.__onViewport = onViewport;
    eventListener.on(window, "scroll resize orientationchange", onViewport);

    function onResize() {
        messenger.emit("virt.resize", _this.getDimensions());
    }
    this.__onResize = onResize;
    eventListener.on(window, "resize orientationchange", onResize);

    this.addPlugin(new ChangePlugin(this));
    this.addPlugin(new TapPlugin(this));
}
EventHandlerPrototype = EventHandler.prototype;

EventHandlerPrototype.getDimensions = function() {
    var viewport = this.viewport,
        window = this.window,
        documentElement = this.documentElement,
        document = this.document;

    return {
        scrollLeft: viewport.currentScrollLeft,
        scrollTop: viewport.currentScrollTop,
        width: getWindowWidth(window, documentElement, document),
        height: getWindowHeight(window, documentElement, document)
    };
};

EventHandlerPrototype.addPlugin = function(plugin) {
    var plugins = this.__plugins,
        pluginHash = this.__pluginHash,
        events = plugin.events,
        i = -1,
        il = events.length - 1;

    while (i++ < il) {
        pluginHash[events[i]] = plugin;
    }

    plugins[plugins.length] = plugin;
};

EventHandlerPrototype.pluginListenTo = function(topLevelType) {
    var plugin = this.__pluginHash[topLevelType],
        pluginListening = this.__pluginListening,
        dependencies, events, i, il;

    if (plugin && !pluginListening[topLevelType]) {
        events = plugin.events;
        i = -1;
        il = events.length - 1;

        while (i++ < il) {
            pluginListening[events[i]] = plugin;
        }

        dependencies = plugin.dependencies;
        i = -1;
        il = dependencies.length - 1;

        while (i++ < il) {
            this.listenTo(null, dependencies[i]);
        }

        return true;
    } else {
        return false;
    }
};

EventHandlerPrototype.clear = function() {
    var window = this.window,
        listening = this.__listening,
        isListening = this.__isListening,
        localHas = has,
        topLevelType;

    for (topLevelType in listening) {
        if (localHas(listening, topLevelType)) {
            listening[topLevelType]();
            delete listening[topLevelType];
            delete isListening[topLevelType];
        }
    }

    eventListener.off(window, "scroll resize orientationchange", this.__onViewport);
    eventListener.off(window, "resize orientationchange", this.__onResize);
};

EventHandlerPrototype.listenTo = function(id, topLevelType) {
    if (!this.pluginListenTo(topLevelType)) {
        this.nativeListenTo(topLevelType);
    }
};

EventHandlerPrototype.nativeListenTo = function(topLevelType) {
    var document = this.document,
        window = this.window,
        isListening = this.__isListening;

    if (!isListening[topLevelType]) {
        if (topLevelType === topLevelTypes.topResize) {
            this.trapBubbledEvent(topLevelTypes.topResize, "resize", window);
        } else if (topLevelType === topLevelTypes.topOrientationChange) {
            this.trapBubbledEvent(topLevelTypes.topOrientationChange, "orientationchange", window);
        } else if (topLevelType === topLevelTypes.topWheel) {
            if (isEventSupported("wheel")) {
                this.trapBubbledEvent(topLevelTypes.topWheel, "wheel", document);
            } else if (isEventSupported("mousewheel")) {
                this.trapBubbledEvent(topLevelTypes.topWheel, "mousewheel", document);
            } else {
                this.trapBubbledEvent(topLevelTypes.topWheel, "DOMMouseScroll", document);
            }
        } else if (topLevelType === topLevelTypes.topScroll) {
            if (isEventSupported("scroll", true)) {
                this.trapCapturedEvent(topLevelTypes.topScroll, "scroll", document);
            } else {
                this.trapBubbledEvent(topLevelTypes.topScroll, "scroll", window);
            }
        } else if (
            topLevelType === topLevelTypes.topFocus ||
            topLevelType === topLevelTypes.topBlur
        ) {
            if (isEventSupported("focus", true)) {
                this.trapCapturedEvent(topLevelTypes.topFocus, "focus", document);
                this.trapCapturedEvent(topLevelTypes.topBlur, "blur", document);
            } else if (isEventSupported("focusin")) {
                this.trapBubbledEvent(topLevelTypes.topFocus, "focusin", document);
                this.trapBubbledEvent(topLevelTypes.topBlur, "focusout", document);
            }

            isListening[topLevelTypes.topFocus] = true;
            isListening[topLevelTypes.topBlur] = true;
        } else {
            this.trapBubbledEvent(topLevelType, topLevelToEvent[topLevelType], document);
        }

        isListening[topLevelType] = true;
    }
};

EventHandlerPrototype.addBubbledEvent = function(topLevelType, type, element) {
    var _this = this;

    function handler(nativeEvent) {
        _this.dispatchEvent(topLevelType, nativeEvent);
    }

    eventListener.on(element, type, handler);

    function removeBubbledEvent() {
        eventListener.off(element, type, handler);
    }

    return removeBubbledEvent;
};

EventHandlerPrototype.addCapturedEvent = function(topLevelType, type, element) {
    var _this = this;

    function handler(nativeEvent) {
        _this.dispatchEvent(topLevelType, nativeEvent);
    }

    eventListener.capture(element, type, handler);

    function removeCapturedEvent() {
        eventListener.off(element, type, handler);
    }

    return removeCapturedEvent;
};

EventHandlerPrototype.trapBubbledEvent = function(topLevelType, type, element) {
    var removeBubbledEvent = this.addBubbledEvent(topLevelType, type, element);
    this.__listening[topLevelType] = removeBubbledEvent;
    return removeBubbledEvent;
};

EventHandlerPrototype.trapCapturedEvent = function(topLevelType, type, element) {
    var removeCapturedEvent = this.addCapturedEvent(topLevelType, type, element);
    this.__listening[topLevelType] = removeCapturedEvent;
    return removeCapturedEvent;
};

EventHandlerPrototype.dispatchEvent = function(topLevelType, nativeEvent) {
    var isClient = this.isClient,
        targetId = getNodeAttributeId(getEventTarget(nativeEvent, this.window)),
        plugins = this.__plugins,
        i = -1,
        il = plugins.length - 1;

    if (!isClient && targetId && topLevelType === topLevelTypes.topSubmit) {
        nativeEvent.preventDefault();
    }

    while (i++ < il) {
        plugins[i].handle(topLevelType, nativeEvent, targetId, this.viewport);
    }

    this.messenger.emit("virt.dom.handleEventDispatch", {
        viewport: this.viewport,
        topLevelType: topLevelType,
        nativeEvent: isClient ? nativeEvent : nativeEventToJSON(nativeEvent),
        targetId: targetId
    });
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/eventClassMap.js-=@*/
var SyntheticAnimationEvent = require(178),
    SyntheticTransitionEvent = require(179),
    SyntheticClipboardEvent = require(180),
    SyntheticCompositionEvent = require(181),
    SyntheticDragEvent = require(182),
    SyntheticEvent = require(173),
    SyntheticFocusEvent = require(183),
    SyntheticInputEvent = require(171),
    SyntheticKeyboardEvent = require(184),
    SyntheticMouseEvent = require(185),
    SyntheticTouchEvent = require(186),
    SyntheticUIEvent = require(176),
    SyntheticWheelEvent = require(187);


module.exports = {
    topAbort: SyntheticEvent,

    topAnimationEnd: SyntheticAnimationEvent,
    topAnimationIteration: SyntheticAnimationEvent,
    topAnimationStart: SyntheticAnimationEvent,

    topBlur: SyntheticFocusEvent,

    topCanPlay: SyntheticEvent,
    topCanPlayThrough: SyntheticEvent,

    topChange: SyntheticInputEvent,
    topClick: SyntheticMouseEvent,

    topCompositionEnd: SyntheticCompositionEvent,
    topCompositionStart: SyntheticCompositionEvent,
    topCompositionUpdate: SyntheticCompositionEvent,

    topContextMenu: SyntheticMouseEvent,

    topCopy: SyntheticClipboardEvent,
    topCut: SyntheticClipboardEvent,

    topDblClick: SyntheticMouseEvent,

    topDrag: SyntheticDragEvent,
    topDragEnd: SyntheticDragEvent,
    topDragEnter: SyntheticDragEvent,
    topDragExit: SyntheticDragEvent,
    topDragLeave: SyntheticDragEvent,
    topDragOver: SyntheticDragEvent,
    topDragStart: SyntheticDragEvent,
    topDrop: SyntheticDragEvent,

    topDurationChange: SyntheticEvent,
    topEmptied: SyntheticEvent,
    topEncrypted: SyntheticEvent,
    topError: SyntheticEvent,
    topFocus: SyntheticFocusEvent,
    topInput: SyntheticInputEvent,
    topInvalid: SyntheticEvent,

    topKeyDown: SyntheticKeyboardEvent,
    topKeyPress: SyntheticKeyboardEvent,

    topKeyUp: SyntheticKeyboardEvent,

    topLoad: SyntheticUIEvent,
    topLoadStart: SyntheticEvent,
    topLoadedData: SyntheticEvent,
    topLoadedMetadata: SyntheticEvent,

    topMouseDown: SyntheticMouseEvent,
    topMouseEnter: SyntheticMouseEvent,
    topMouseMove: SyntheticMouseEvent,
    topMouseOut: SyntheticMouseEvent,
    topMouseOver: SyntheticMouseEvent,
    topMouseUp: SyntheticMouseEvent,

    topOrientationChange: SyntheticEvent,

    topPaste: SyntheticClipboardEvent,

    topPause: SyntheticEvent,
    topPlay: SyntheticEvent,
    topPlaying: SyntheticEvent,
    topProgress: SyntheticEvent,

    topRateChange: SyntheticEvent,
    topReset: SyntheticEvent,
    topResize: SyntheticUIEvent,

    topScroll: SyntheticUIEvent,

    topSeeked: SyntheticEvent,
    topSeeking: SyntheticEvent,

    topSelectionChange: SyntheticEvent,

    topStalled: SyntheticEvent,

    topSubmit: SyntheticEvent,
    topSuspend: SyntheticEvent,

    topTextInput: SyntheticInputEvent,

    topTimeUpdate: SyntheticEvent,

    topTouchCancel: SyntheticTouchEvent,
    topTouchEnd: SyntheticTouchEvent,
    topTouchMove: SyntheticTouchEvent,
    topTouchStart: SyntheticTouchEvent,
    topTouchTap: SyntheticUIEvent,

    topTransitionEnd: SyntheticTransitionEvent,

    topVolumeChange: SyntheticEvent,
    topWaiting: SyntheticEvent,

    topWheel: SyntheticWheelEvent
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/handleEventDispatch.js-=@*/
var virt = require(1),
    isNullOrUndefined = require(23),
    getNodeById = require(103);


var traverseAncestors = virt.traverseAncestors;


module.exports = handleEventDispatch;


function handleEventDispatch(childHash, events, topLevelType, targetId, event) {
    var target = childHash[targetId],
        eventType = events[topLevelType],
        global, ret, i, il;

    if (eventType) {
        global = eventType.global;

        if (target) {
            target = target.component;
        } else {
            target = null;
        }

        if (global) {
            i = -1;
            il = global.length - 1;
            event.currentTarget = event.componentTarget = event.currentComponentTarget = target;
            while (i++ < il && ret !== false) {
                ret = global[i](event);
                if (!isNullOrUndefined(ret)) {
                    ret = event.returnValue;
                }
            }
        }

        traverseAncestors(targetId, function traverseAncestor(currentTargetId) {
            var ret;

            if (eventType[currentTargetId]) {
                event.currentTarget = getNodeById(currentTargetId);
                event.componentTarget = target;
                event.currentComponentTarget = childHash[currentTargetId].component;
                ret = eventType[currentTargetId](event);
                return !isNullOrUndefined(ret) ? ret : event.returnValue;
            } else {
                return true;
            }
        });

        if (event && event.isPersistent !== true) {
            event.destroy();
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/applyEvents.js-=@*/
module.exports = applyEvents;


function applyEvents(events, eventHandler) {
    var id, eventArray, i, il;

    for (id in events) {
        eventArray = events[id];
        i = -1;
        il = eventArray.length - 1;

        while (i++ < il) {
            eventHandler.listenTo(id, eventArray[i]);
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/applyPatches.js-=@*/
var applyPatch = require(205);


module.exports = applyPatches;


function applyPatches(hash, rootDOMNode, document) {
    var patchArray, i, il, id;

    for (id in hash) {
        if ((patchArray = hash[id])) {
            i = -1;
            il = patchArray.length - 1;

            while (i++ < il) {
                applyPatch(patchArray[i], id, rootDOMNode, document);
            }
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/index.js-=@*/
var v1 = require(136),
    v3 = require(137),
    v4 = require(138),
    v5 = require(139);


var V1 = 1,
    V2 = 2,
    V3 = 3,
    V4 = 4,
    V5 = 5;


module.exports = uuid;


uuid.V1 = V1;
uuid.V2 = V2;
uuid.V3 = V3;
uuid.V4 = V4;
uuid.V5 = V5;


function uuid(type, options, buffer, offset) {
    var domain;

    switch (type) {
        case V3:
            domain = options;
            options = buffer;
            return v3(domain, options);
        case V4:
            return v4(options, buffer, offset);
        case V5:
            domain = options;
            options = buffer;
            return v5(domain, options);
        default:
            return v1(options, buffer, offset);
    }
}


uuid.v1 = v1;
uuid.v2 = v1;
uuid.v3 = v3;
uuid.v4 = v4;
uuid.v5 = v5;

uuid.toString = require(140);
uuid.parse = require(141);

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/messenger@0.0.3/src/Message.js-=@*/
module.exports = Message;


function Message(id, name, error, data) {
    this.id = id;
    this.name = name;
    this.error = error;
    this.data = data;
}

Message.prototype.toJSON = function() {
    return {
        id: this.id,
        name: this.name,
        error: this.error,
        data: this.data
    };
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/v1.js-=@*/
var now = require(142),
    isNullOrUndefinded = require(23),
    NativeUint8Array = require(143),
    nodeId = require(144),
    emptyObject = require(145),
    seedBytes = require(146),
    toString = require(140);


var CLOCKSEQ = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff,
    LAST_MSECS = 0,
    LAST_NSECS = 0;


module.exports = v1;


function v1(options, buffer, offset) {
    var b = buffer || new NativeUint8Array(16),
        clockseq, msecs, nsecs, dt, tl, tmh, node, n;

    i = buffer && offset || 0;
    options = options || emptyObject;

    clockseq = isNullOrUndefinded(options.clockseq) ? CLOCKSEQ : options.clockseq;
    msecs = isNullOrUndefinded(options.msecs) ? now.stamp() : options.msecs;
    nsecs = isNullOrUndefinded(options.nsecs) ? LAST_NSECS + 1 : options.nsecs;
    dt = (msecs - LAST_MSECS) + (nsecs - LAST_NSECS) / 10000;

    if (dt < 0 && isNullOrUndefinded(options.clockseq)) {
        clockseq = clockseq + 1 & 0x3fff;
    }
    if ((dt < 0 || msecs > LAST_MSECS) && isNullOrUndefinded(options.nsecs)) {
        nsecs = 0;
    }
    if (nsecs >= 10000) {
        throw new Error("v1([options [, buffer [, offset]]]): Can't create more than 10M uuids/sec");
    }

    LAST_MSECS = msecs;
    LAST_NSECS = nsecs;
    CLOCKSEQ = clockseq;

    // Convert from unix epoch to gregorian epoch
    msecs += 12219292800000;

    tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    b[i++] = clockseq >>> 8 | 0x80;
    b[i++] = clockseq & 0xff;

    node = options.node || nodeId;
    n = -1;
    while (n++ < 5) {
        b[i + n] = node[n];
    }

    return buffer ? buffer : toString(b);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/v3.js-=@*/
var md5 = require(149),
    toString = require(140);


var md5Options = {
    asBytes: true
};


module.exports = v3;


function v3(domain /*, options */ ) {
    return toString(md5(domain, md5Options));
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/v4.js-=@*/
var Buffer = require(112).Buffer;
var isString = require(21),
    getRandomBytes = require(147),
    toString = require(140),
    emptyObject = require(145);


module.exports = v4;


function v4(options, buffer, offset) {
    var random, i;

    offset = buffer && offset || 0;

    if (isString(options)) {
        buffer = (options === "binary") ? new Buffer(16) : null;
        options = null;
    }
    options = options || emptyObject;

    random = options.random || (options.getRandomBytes || getRandomBytes)(16);
    random[6] = (random[6] & 0x0f) | 0x40;
    random[8] = (random[8] & 0x3f) | 0x80;

    if (buffer) {
        i = -1;
        while (i++ < 15) {
            buffer[offset + i] = random[i];
        }
    }

    return buffer || toString(random);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/v5.js-=@*/
var sha1 = require(157),
    toString = require(140);


var sha1Options = {
    asBytes: true
};


module.exports = v5;


function v5(domain /*, options */ ) {
    return toString(sha1(domain, sha1Options));
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/toString.js-=@*/
var byteToHex = require(148);


module.exports = toString;


function toString(buffer, offset) {
    var i = offset || 0,
        localByteToHex = byteToHex;

    return (
        localByteToHex[buffer[i++]] + localByteToHex[buffer[i++]] +
        localByteToHex[buffer[i++]] + localByteToHex[buffer[i++]] + '-' +
        localByteToHex[buffer[i++]] + localByteToHex[buffer[i++]] + '-' +
        localByteToHex[buffer[i++]] + localByteToHex[buffer[i++]] + '-' +
        localByteToHex[buffer[i++]] + localByteToHex[buffer[i++]] + '-' +
        localByteToHex[buffer[i++]] + localByteToHex[buffer[i++]] +
        localByteToHex[buffer[i++]] + localByteToHex[buffer[i++]] +
        localByteToHex[buffer[i++]] + localByteToHex[buffer[i++]]
    );
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/parse.js-=@*/
var hexToByte = require(158);


var reByte = /[0-9a-f]{2}/g;


module.exports = parse;


function parse(string, buffer, offset) {
    var i;

    offset = buffer ? (offset || 0) : 0;
    i = offset;

    buffer = buffer || [];
    string.toLowerCase().replace(reByte, function(oct) {
        if (i < 16) {
            buffer[offset + i++] = hexToByte[oct];
        }
    });

    while (i < 16) {
        buffer[offset + i++] = 0;
    }

    return buffer;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/now@0.0.3/src/browser.js-=@*/
var Date_now = Date.now || function Date_now() {
        return (new Date()).getTime();
    },
    START_TIME = Date_now(),
    performance = global.performance || {};


function now() {
    return performance.now();
}

performance.now = (
    performance.now ||
    performance.webkitNow ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    function now() {
        return Date_now() - START_TIME;
    }
);

now.getStartTime = function getStartTime() {
    return START_TIME;
};

now.stamp = function stamp() {
    return START_TIME + now();
};

now.hrtime = function hrtime(previousTimestamp) {
    var clocktime = now() * 1e-3,
        seconds = Math.floor(clocktime),
        nanoseconds = Math.floor((clocktime % 1) * 1e9);

    if (previousTimestamp) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];

        if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
        }
    }

    return [seconds, nanoseconds];
};


START_TIME -= now();


module.exports = now;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/NativeUint8Array.js-=@*/
module.exports = typeof(Uint8Array) !== "undefined" ? Uint8Array : Array;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/nodeId.js-=@*/
var seedBytes = require(146);


module.exports = [
    seedBytes[0] | 0x01,
    seedBytes[1],
    seedBytes[2],
    seedBytes[3],
    seedBytes[4],
    seedBytes[5]
];

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/emptyObject.js-=@*/


},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/seedBytes.js-=@*/
var getRandomBytes = require(147);


module.exports = getRandomBytes(16);

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_random_bytes@0.0.3/src/browser.js-=@*/
var isFunction = require(19);


var globalCrypto = global.crypto || global.msCrypto,
    NativeUint8Array = typeof(Uint8Array) !== "undefined" ? Uint8Array : Array,
    getRandomBytes;


if (globalCrypto && isFunction(globalCrypto.getRandomValues)) {
    getRandomBytes = function getRandomBytes(size) {
        return globalCrypto.getRandomValues(new NativeUint8Array(size));
    };
} else {
    getRandomBytes = function getRandomBytes(size) {
        var bytes = new NativeUint8Array(size),
            i = -1,
            il = size - 1,
            r;

        while (i++ < il) {
            if ((i & 0x03) === 0) {
                r = Math.random() * 0x100000000;
            }
            bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }

        return bytes;
    };
}


module.exports = getRandomBytes;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/byteToHex.js-=@*/
module.exports = [];

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/md5@0.0.1/src/index.js-=@*/
var Buffer = require(112).Buffer;
var isArray = require(20),
    fastSlice = require(150),
    crypto = require(151),
    hex = require(152),
    utf8 = require(153),
    bin = require(154),
    words = require(155);


module.exports = md5Wrap;


function md5Wrap(message, options) {
    var digestbytes;

    if (message == null) {
        throw new TypeError("");
    } else {
        digestbytes = words.wordsToBytes(md5(message, options));
        return options && options.asBytes ? digestbytes : (
            options && options.asString ? bin.bytesToString(digestbytes) : hex.bytesToString(digestbytes)
        );
    }
}

function FF(a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}

function GG(a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}

function HH(a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}

function II(a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}

function md5(message, options) {
    var m, l, a, b, c, d, i, il, aa, bb, cc, dd;

    if (message.constructor === String) {
        if (options && options.encoding === "binary") {
            message = bin.stringToBytes(message);
        } else {
            message = utf8.stringToBytes(message);
        }
    } else if (Buffer.isBuffer(message)) {
        message = fastSlice(message, 0);
    } else if (!isArray(message)) {
        message = message.toString();
    }

    m = words.bytesToWords(message);
    l = message.length * 8;
    a = 1732584193;
    b = -271733879;
    c = -1732584194;
    d = 271733878;

    i = -1;
    il = m.length - 1;
    while (i++ < il) {
        m[i] = ((m[i] << 8) | (m[i] >>> 24)) & 0x00FF00FF | ((m[i] << 24) | (m[i] >>> 8)) & 0xFF00FF00;
    }

    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    il = m.length;
    for (i = 0; i < il; i += 16) {
        aa = a;
        bb = b;
        cc = c;
        dd = d;

        a = FF(a, b, c, d, m[i + 0], 7, -680876936);
        d = FF(d, a, b, c, m[i + 1], 12, -389564586);
        c = FF(c, d, a, b, m[i + 2], 17, 606105819);
        b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i + 4], 7, -176418897);
        d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i + 7], 22, -45705983);
        a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i + 10], 17, -42063);
        b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, m[i + 13], 12, -40341101);
        c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, m[i + 15], 22, 1236535329);

        a = GG(a, b, c, d, m[i + 1], 5, -165796510);
        d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, m[i + 11], 14, 643717713);
        b = GG(b, c, d, a, m[i + 0], 20, -373897302);
        a = GG(a, b, c, d, m[i + 5], 5, -701558691);
        d = GG(d, a, b, c, m[i + 10], 9, 38016083);
        c = GG(c, d, a, b, m[i + 15], 14, -660478335);
        b = GG(b, c, d, a, m[i + 4], 20, -405537848);
        a = GG(a, b, c, d, m[i + 9], 5, 568446438);
        d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, m[i + 3], 14, -187363961);
        b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, m[i + 2], 9, -51403784);
        c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, m[i + 12], 20, -1926607734);

        a = HH(a, b, c, d, m[i + 5], 4, -378558);
        d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, m[i + 14], 23, -35309556);
        a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, m[i + 7], 16, -155497632);
        b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, m[i + 13], 4, 681279174);
        d = HH(d, a, b, c, m[i + 0], 11, -358537222);
        c = HH(c, d, a, b, m[i + 3], 16, -722521979);
        b = HH(b, c, d, a, m[i + 6], 23, 76029189);
        a = HH(a, b, c, d, m[i + 9], 4, -640364487);
        d = HH(d, a, b, c, m[i + 12], 11, -421815835);
        c = HH(c, d, a, b, m[i + 15], 16, 530742520);
        b = HH(b, c, d, a, m[i + 2], 23, -995338651);

        a = II(a, b, c, d, m[i + 0], 6, -198630844);
        d = II(d, a, b, c, m[i + 7], 10, 1126891415);
        c = II(c, d, a, b, m[i + 14], 15, -1416354905);
        b = II(b, c, d, a, m[i + 5], 21, -57434055);
        a = II(a, b, c, d, m[i + 12], 6, 1700485571);
        d = II(d, a, b, c, m[i + 3], 10, -1894986606);
        c = II(c, d, a, b, m[i + 10], 15, -1051523);
        b = II(b, c, d, a, m[i + 1], 21, -2054922799);
        a = II(a, b, c, d, m[i + 8], 6, 1873313359);
        d = II(d, a, b, c, m[i + 15], 10, -30611744);
        c = II(c, d, a, b, m[i + 6], 15, -1560198380);
        b = II(b, c, d, a, m[i + 13], 21, 1309151649);
        a = II(a, b, c, d, m[i + 4], 6, -145523070);
        d = II(d, a, b, c, m[i + 11], 10, -1120210379);
        c = II(c, d, a, b, m[i + 2], 15, 718787259);
        b = II(b, c, d, a, m[i + 9], 21, -343485551);

        a = (a + aa) >>> 0;
        b = (b + bb) >>> 0;
        c = (c + cc) >>> 0;
        d = (d + dd) >>> 0;
    }

    return crypto.endian([a, b, c, d]);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/fast_slice@0.0.1/src/index.js-=@*/
var clamp = require(156),
    isNumber = require(24);


module.exports = fastSlice;


function fastSlice(array, offset) {
    var length = array.length,
        newLength, i, il, result, j;

    offset = clamp(isNumber(offset) ? offset : 0, 0, length);
    i = offset - 1;
    il = length - 1;
    newLength = length - offset;
    result = new Array(newLength);
    j = 0;

    while (i++ < il) {
        result[j++] = array[i];
    }

    return result;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/crypto_browser@0.0.1/src/index.js-=@*/
var process = require(17);
var isNumber = require(24),
    isFunction = require(19);


var crypto = exports,

    NativeUint8Array = typeof(Uint8Array) !== "undefined" ? Uint8Array : Array,
    globalCrypto = global.crypto || global.msCrypto,
    randomBytes;


crypto.rotl = function(n, b) {
    return (n << b) | (n >>> (32 - b));
};

crypto.rotr = function(n, b) {
    return (n << (32 - b)) | (n >>> b);
};

function endian(n) {
    return crypto.rotl(n, 8) & 0x00FF00FF | crypto.rotl(n, 24) & 0xFF00FF00;
}

function endianArray(array) {
    var i = -1,
        il = array.length - 1;

    while (i++ < il) {
        array[i] = endian(array[i]);
    }

    return array;
}

crypto.endian = function(n) {
    if (isNumber(n)) {
        return endian(n);
    } else {
        return endianArray(n);
    }
};

if (globalCrypto && isFunction(globalCrypto.getRandomValues)) {
    randomBytes = function(size) {
        return crypto.getRandomValues(new NativeUint8Array(size));
    };
} else {
    randomBytes = function(size) {
        var bytes = new NativeUint8Array(size),
            i = size;

        while (i--) {
            bytes[i] = (Math.random() * 256) | 0;
        }

        return bytes;
    };
}

crypto.randomBytes = function(size, callback) {
    if (!isNumber(size)) {
        throw new TypeError("randomBytes(size[, callback]) size must be a number");
    } else {
        if (isFunction(callback)) {
            process.nextTick(function() {
                callback(undefined, randomBytes(size));
            });
            return undefined;
        } else {
            return randomBytes(size);
        }
    }
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/hex_encoding@0.0.1/src/index.js-=@*/
var hex = exports,
    NativeUint8Array = typeof(Uint8Array) !== "undefined" ? Uint8Array : Array;


hex.stringToBytes = function(str) {
    var length = str.length,
        i = 0,
        il = length,
        bytes = new NativeUint8Array(length * 0.5),
        index = 0;

    while (i < il) {
        bytes[index] = parseInt(str.substr(i, 2), 16);
        index += 1;
        i += 2;
    }

    return bytes;
};

hex.bytesToString = function(bytes) {
    var str = "",
        i = -1,
        il = bytes.length - 1;

    while (i++ < il) {
        str += (bytes[i] >>> 4).toString(16);
        str += (bytes[i] & 0xF).toString(16);
    }

    return str;
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/utf8_encoding@0.0.1/src/index.js-=@*/
var bin = require(154);


var utf8 = exports;


utf8.stringToBytes = function(str) {
    return bin.stringToBytes(unescape(encodeURIComponent(str)));
};

utf8.bytesToString = function(bytes) {
    return decodeURIComponent(escape(bin.bytesToString(bytes)));
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/bin_encoding@0.0.1/src/index.js-=@*/
var bin = exports,
    NativeUint8Array = typeof(Uint8Array) !== "undefined" ? Uint8Array : Array;


bin.stringToBytes = function(str) {
    var length = str.length,
        i = -1,
        il = length - 1,
        bytes = new NativeUint8Array(length),
        index = 0;

    while (i++ < il) {
        bytes[index] = str.charCodeAt(i) & 0xFF;
        index += 1;
    }

    return bytes;
};

bin.bytesToString = function(bytes) {
    var str = "",
        i = -1,
        il = bytes.length - 1;

    while (i++ < il) {
        str += String.fromCharCode(bytes[i]);
    }

    return str;
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/words_encoding@0.0.1/src/index.js-=@*/
var words = exports;


words.wordsToBytes = function(words) {
    var bytes = [],
        i = 0,
        il = words.length * 32;

    while (i < il) {
        bytes.push((words[i >>> 5] >>> (24 - i % 32)) & 0xFF);
        i += 8;
    }

    return bytes;
};

words.bytesToWords = function(bytes) {
    var words = [],
        i = -1,
        il = bytes.length - 1,
        b = 0;

    while (i++ < il) {
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
        b += 8;
    }

    return words;
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/clamp@0.0.1/src/index.js-=@*/
module.exports = clamp;


function clamp(x, min, max) {
    if (x < min) {
        return min;
    } else if (x > max) {
        return max;
    } else {
        return x;
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/sha1@0.0.3/src/index.js-=@*/
var isArrayLike = require(56),
    isString = require(21),
    fastSlice = require(150),
    hex = require(152),
    utf8 = require(153),
    bin = require(154),
    words = require(155);


var ARRAY = new Array(80);


module.exports = sha1Wrap;


function sha1Wrap(message, options) {
    var digestbytes = words.wordsToBytes(sha1(message));

    return (
        options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        hex.bytesToString(digestbytes)
    );
}

sha1Wrap.blocksize = 16;
sha1Wrap.digestsize = 20;

function sha1(message) {
    var m, l, w, H0, H1, H2, H3, H4, a, b, c, d, e, i, il, j, n, t;

    if (isString(String)) {
        message = utf8.stringToBytes(message);
    } else if (isArrayLike(message)) {
        message = fastSlice(message, 0);
    } else {
        message = message.toString();
    }

    m = words.bytesToWords(message);
    l = message.length * 8;
    w = ARRAY;
    H0 = 1732584193;
    H1 = -271733879;
    H2 = -1732584194;
    H3 = 271733878;
    H4 = -1009589776;

    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >>> 9) << 4) + 15] = l;

    for (i = 0, il = m.length; i < il; i += 16) {
        a = H0;
        b = H1;
        c = H2;
        d = H3;
        e = H4;

        for (j = 0; j < 80; j++) {
            if (j < 16) {
                w[j] = m[i + j];
            } else {
                n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
                w[j] = (n << 1) | (n >>> 31);
            }

            t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
                j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
                j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
                j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
                (H1 ^ H2 ^ H3) - 899497514
            );

            H4 = H3;
            H3 = H2;
            H2 = (H1 << 30) | (H1 >>> 2);
            H1 = H0;
            H0 = t;
        }

        H0 += a;
        H1 += b;
        H2 += c;
        H3 += d;
        H4 += e;
    }

    return [H0, H1, H2, H3, H4];
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/uuid@0.0.2/src/hexToByte.js-=@*/
var byteToHex = require(148);


var hexToByte = exports,
    i, il;


for (i = 0, il = 256; i < il; i++) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
    hexToByte[byteToHex[i]] = i;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/event_listener@0.0.2/src/index.js-=@*/
var process = require(17);
var isObject = require(22),
    isFunction = require(19),
    environment = require(109),
    eventTable = require(168);


var eventListener = module.exports,

    reSpliter = /[\s]+/,

    window = environment.window,
    document = environment.document,

    listenToEvent, captureEvent, removeEvent, dispatchEvent;


window.Event = window.Event || function EmptyEvent() {};


eventListener.on = function(target, eventType, callback) {
    var eventTypes = eventType.split(reSpliter),
        i = eventTypes.length;

    while (i--) {
        listenToEvent(target, eventTypes[i], callback);
    }
};

eventListener.capture = function(target, eventType, callback) {
    var eventTypes = eventType.split(reSpliter),
        i = eventTypes.length;

    while (i--) {
        captureEvent(target, eventTypes[i], callback);
    }
};

eventListener.off = function(target, eventType, callback) {
    var eventTypes = eventType.split(reSpliter),
        i = eventTypes.length;

    while (i--) {
        removeEvent(target, eventTypes[i], callback);
    }
};

eventListener.emit = function(target, eventType, event) {

    return dispatchEvent(target, eventType, isObject(event) ? event : {});
};

eventListener.getEventConstructor = function(target, eventType) {
    var getter = eventTable[eventType];
    return isFunction(getter) ? getter(target) : window.Event;
};


if (isFunction(document.addEventListener)) {

    listenToEvent = function(target, eventType, callback) {

        target.addEventListener(eventType, callback, false);
    };

    captureEvent = function(target, eventType, callback) {

        target.addEventListener(eventType, callback, true);
    };

    removeEvent = function(target, eventType, callback) {

        target.removeEventListener(eventType, callback, false);
    };

    dispatchEvent = function(target, eventType, event) {
        var getter = eventTable[eventType],
            EventType = isFunction(getter) ? getter(target) : window.Event;

        return !!target.dispatchEvent(new EventType(eventType, event));
    };
} else if (isFunction(document.attachEvent)) {

    listenToEvent = function(target, eventType, callback) {

        target.attachEvent("on" + eventType, callback);
    };

    captureEvent = function() {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "Attempted to listen to events during the capture phase on a " +
                "browser that does not support the capture phase. Your application " +
                "will not receive some events."
            );
        }
    };

    removeEvent = function(target, eventType, callback) {

        target.detachEvent("on" + eventType, callback);
    };

    dispatchEvent = function(target, eventType, event) {
        var doc = target.ownerDocument || document;

        return !!target.fireEvent("on" + eventType, doc.createEventObject(event));
    };
} else {

    listenToEvent = function(target, eventType, callback) {

        target["on" + eventType] = callback;
        return target;
    };

    captureEvent = function() {
        if (process.env.NODE_ENV === "development") {
            throw new Error(
                "Attempted to listen to events during the capture phase on a " +
                "browser that does not support the capture phase. Your application " +
                "will not receive some events."
            );
        }
    };

    removeEvent = function(target, eventType) {

        target["on" + eventType] = null;
        return true;
    };

    dispatchEvent = function(target, eventType, event) {
        var onType = "on" + eventType;

        if (isFunction(target[onType])) {
            event.type = eventType;
            return !!target[onType](event);
        }

        return false;
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getWindowWidth.js-=@*/
module.exports = getWindowWidth;


function getWindowWidth(window, document, documentElement) {
    return window.innerWidth || document.clientWidth || documentElement.clientWidth;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getWindowHeight.js-=@*/
module.exports = getWindowHeight;


function getWindowHeight(window, document, documentElement) {
    return window.innerHeight || document.clientHeight || documentElement.clientHeight;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getEventTarget.js-=@*/
module.exports = getEventTarget;


function getEventTarget(nativeEvent, window) {
    var target = nativeEvent.target || nativeEvent.srcElement || window;
    return target.nodeType === 3 ? target.parentNode : target;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/getNodeAttributeId.js-=@*/
var DOM_ID_NAME = require(82);


module.exports = getNodeAttributeId;


function getNodeAttributeId(node) {
    return node && node.getAttribute && node.getAttribute(DOM_ID_NAME) || "";
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/nativeEventToJSON.js-=@*/
var indexOf = require(57),
    isNode = require(100),
    isFunction = require(19),
    ignoreNativeEventProp = require(169);


module.exports = nativeEventToJSON;


function nativeEventToJSON(nativeEvent) {
    var json = {},
        key, value;

    for (key in nativeEvent) {
        value = nativeEvent[key];

        if (!(isFunction(value) || isNode(value) || indexOf(ignoreNativeEventProp, key) !== -1)) {
            json[key] = value;
        }
    }

    return json;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/isEventSupported.js-=@*/
var isFunction = require(19),
    isNullOrUndefined = require(23),
    has = require(25),
    supports = require(170),
    environment = require(109);


var document = environment.document,

    useHasFeature = (
        document.implementation &&
        document.implementation.hasFeature &&
        document.implementation.hasFeature("", "") !== true
    );


module.exports = isEventSupported;


function isEventSupported(eventNameSuffix, capture) {
    var isSupported, eventName, element;

    if (!supports.dom || capture && isNullOrUndefined(document.addEventListener)) {
        return false;
    } else {
        eventName = "on" + eventNameSuffix;
        isSupported = has(document, eventName);

        if (!isSupported) {
            element = document.createElement("div");
            element.setAttribute(eventName, "return;");
            isSupported = isFunction(element[eventName]);
        }

        if (!isSupported && useHasFeature && eventNameSuffix === "wheel") {
            isSupported = document.implementation.hasFeature("Events.wheel", "3.0");
        }

        return isSupported;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/plugins/ChangePlugin.js-=@*/
var environment = require(109),
    getEventTarget = require(162),
    SyntheticInputEvent = require(171),
    consts = require(117);


var document = environment.document,

    isInputSupported = (function() {
        var testNode;

        try {
            testNode = document.createElement("input");
        } catch (e) {
            testNode = {};
        }

        return (
            "oninput" in testNode &&
            (!("documentMode" in document) || document.documentMode > 9)
        );
    }()),

    topLevelTypes = consts.topLevelTypes,
    ChangePluginPrototype;


module.exports = ChangePlugin;


function ChangePlugin(eventHandler) {
    var _this = this;

    this.eventHandler = eventHandler;

    this.currentTarget = null;
    this.currentTargetValue = null;
    this.currentTargetValueProp = null;

    this.newValueProp = {
        get: function get() {
            return _this.currentTargetValueProp.get.call(this);
        },
        set: function set(value) {
            _this.currentTargetValue = value;
            _this.currentTargetValueProp.set.call(this, value);
        }
    };

    this.onPropertyChange = function(nativeEvent) {
        return ChangePlugin_onPropertyChange(_this, nativeEvent);
    };
}
ChangePluginPrototype = ChangePlugin.prototype;

ChangePluginPrototype.events = [
    topLevelTypes.topChange
];

ChangePluginPrototype.dependencies = [
    topLevelTypes.topBlur,
    topLevelTypes.topFocus,
    topLevelTypes.topKeyDown,
    topLevelTypes.topKeyUp,
    topLevelTypes.topSelectionChange
];

ChangePluginPrototype.handle = function(topLevelType, nativeEvent /*, targetId, viewport */ ) {
    var target, currentTarget;

    if (!isInputSupported) {
        if (topLevelType === topLevelTypes.topFocus) {
            target = getEventTarget(nativeEvent, this.eventHandler.window);

            if (hasInputCapabilities(target)) {
                ChangePlugin_stopListening(this);
                ChangePlugin_startListening(this, target);
            }
        } else if (topLevelType === topLevelTypes.topBlur) {
            ChangePlugin_stopListening(this);
        } else if (
            topLevelType === topLevelTypes.topSelectionChange ||
            topLevelType === topLevelTypes.topKeyUp ||
            topLevelType === topLevelTypes.topKeyDown
        ) {
            currentTarget = this.currentTarget;

            if (currentTarget && currentTarget.value !== this.currentTargetValue) {
                this.currentTargetValue = currentTarget.value;
                this.dispatchEvent(currentTarget, nativeEvent);
            }
        }
    }
};

ChangePluginPrototype.dispatchEvent = function(target, nativeEvent) {
    var event = SyntheticInputEvent.create(nativeEvent, this.eventHandler);
    event.target = target;
    event.type = "change";
    this.eventHandler.dispatchEvent(topLevelTypes.topChange, event);
};

function ChangePlugin_startListening(_this, target) {
    _this.currentTarget = target;
    _this.currentTargetValue = target.value;
    _this.currentTargetValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, "value");
    Object.defineProperty(target, "value", _this.newValueProp);
    target.attachEvent("onpropertychange", _this.onPropertyChange);
}

function ChangePlugin_stopListening(_this) {
    var target = _this.currentTarget;

    if (target) {
        _this.currentTarget = null;
        _this.currentTargetValue = null;
        _this.currentTargetValueProp = null;
        delete target.value;
        target.detachEvent("onpropertychange", _this.onPropertyChange);
    }
}

function ChangePlugin_onPropertyChange(_this, nativeEvent) {
    var currentTarget = _this.currentTarget;

    if (
        nativeEvent.propertyName === "value" &&
        _this.currentTargetValue !== currentTarget.value
    ) {
        _this.currentTargetValue = currentTarget.value;
        _this.dispatchEvent(currentTarget, nativeEvent);
    }
}

function hasInputCapabilities(element) {
    return element.nodeName === "INPUT" || element.nodeName === "TEXTAREA";
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/plugins/TapPlugin.js-=@*/
var now = require(142),
    indexOf = require(57),
    SyntheticUIEvent = require(176),
    consts = require(117);


var topLevelTypes = consts.topLevelTypes,

    xaxis = {
        page: "pageX",
        client: "clientX",
        envScroll: "currentPageScrollLeft"
    },
    yaxis = {
        page: "pageY",
        client: "clientY",
        envScroll: "currentPageScrollTop"
    },

    touchEvents = [
        topLevelTypes.topTouchStart,
        topLevelTypes.topTouchCancel,
        topLevelTypes.topTouchEnd,
        topLevelTypes.topTouchMove
    ],

    TapPluginPrototype;


module.exports = TapPlugin;


function TapPlugin(eventHandler) {

    this.eventHandler = eventHandler;

    this.usedTouch = false;
    this.usedTouchTime = 0;

    this.tapMoveThreshold = 10;
    this.TOUCH_DELAY = 1000;

    this.startCoords = {
        x: null,
        y: null
    };
}
TapPluginPrototype = TapPlugin.prototype;

TapPluginPrototype.events = [
    topLevelTypes.topTouchTap
];

TapPluginPrototype.dependencies = [
    topLevelTypes.topMouseDown,
    topLevelTypes.topMouseMove,
    topLevelTypes.topMouseUp
].concat(touchEvents);

TapPluginPrototype.handle = function(topLevelType, nativeEvent /* , targetId */ ) {
    var startCoords, eventHandler, viewport, event;

    if (isStartish(topLevelType) || isEndish(topLevelType)) {
        if (indexOf(touchEvents, topLevelType) !== -1) {
            this.usedTouch = true;
            this.usedTouchTime = now();
        } else if (!this.usedTouch || ((now() - this.usedTouchTime) >= this.TOUCH_DELAY)) {
            startCoords = this.startCoords;
            eventHandler = this.eventHandler;
            viewport = eventHandler.viewport;

            if (
                isEndish(topLevelType) &&
                getDistance(startCoords, nativeEvent, viewport) < this.tapMoveThreshold
            ) {
                event = SyntheticUIEvent.getPooled(nativeEvent, eventHandler);
            }

            if (isStartish(topLevelType)) {
                startCoords.x = getAxisCoordOfEvent(xaxis, nativeEvent, viewport);
                startCoords.y = getAxisCoordOfEvent(yaxis, nativeEvent, viewport);
            } else if (isEndish(topLevelType)) {
                startCoords.x = 0;
                startCoords.y = 0;
            }

            if (event) {
                eventHandler.dispatchEvent(topLevelTypes.topTouchTap, event);
            }
        }
    }
};

function getAxisCoordOfEvent(axis, nativeEvent, viewport) {
    var singleTouch = extractSingleTouch(nativeEvent);

    if (singleTouch) {
        return singleTouch[axis.page];
    } else {
        return (
            axis.page in nativeEvent ?
            nativeEvent[axis.page] :
            nativeEvent[axis.client] + viewport[axis.envScroll]
        );
    }
}

function getDistance(coords, nativeEvent, viewport) {
    var pageX = getAxisCoordOfEvent(xaxis, nativeEvent, viewport),
        pageY = getAxisCoordOfEvent(yaxis, nativeEvent, viewport);

    return Math.pow(
        Math.pow(pageX - coords.x, 2) + Math.pow(pageY - coords.y, 2),
        0.5
    );
}

function extractSingleTouch(nativeEvent) {
    var touches = nativeEvent.touches,
        changedTouches = nativeEvent.changedTouches,
        hasTouches = touches && touches.length > 0,
        hasChangedTouches = changedTouches && changedTouches.length > 0;

    return (!hasTouches && hasChangedTouches ? changedTouches[0] :
        hasTouches ? touches[0] :
        nativeEvent
    );
}

function isStartish(topLevelType) {
    return (
        topLevelType === topLevelTypes.topMouseDown ||
        topLevelType === topLevelTypes.topTouchStart
    );
}

function isEndish(topLevelType) {
    return (
        topLevelType === topLevelTypes.topMouseUp ||
        topLevelType === topLevelTypes.topTouchEnd ||
        topLevelType === topLevelTypes.topTouchCancel
    );
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/event_listener@0.0.2/src/event_table.js-=@*/
var isNode = require(100),
    environment = require(109);


var window = environment.window,

    XMLHttpRequest = window.XMLHttpRequest,
    OfflineAudioContext = window.OfflineAudioContext;


function returnEvent() {
    return window.Event;
}


module.exports = {
    abort: function(target) {
        if (XMLHttpRequest && target instanceof XMLHttpRequest) {
            return window.ProgressEvent || window.Event;
        } else {
            return window.UIEvent || window.Event;
        }
    },

    afterprint: returnEvent,

    animationend: function() {
        return window.AnimationEvent || window.Event;
    },
    animationiteration: function() {
        return window.AnimationEvent || window.Event;
    },
    animationstart: function() {
        return window.AnimationEvent || window.Event;
    },

    audioprocess: function() {
        return window.AudioProcessingEvent || window.Event;
    },

    beforeprint: returnEvent,
    beforeunload: function() {
        return window.BeforeUnloadEvent || window.Event;
    },
    beginevent: function() {
        return window.TimeEvent || window.Event;
    },

    blocked: returnEvent,
    blur: function() {
        return window.FocusEvent || window.Event;
    },

    cached: returnEvent,
    canplay: returnEvent,
    canplaythrough: returnEvent,
    chargingchange: returnEvent,
    chargingtimechange: returnEvent,
    checking: returnEvent,

    click: function() {
        return window.MouseEvent || window.Event;
    },

    close: returnEvent,
    compassneedscalibration: function() {
        return window.SensorEvent || window.Event;
    },
    complete: function(target) {
        if (OfflineAudioContext && target instanceof OfflineAudioContext) {
            return window.OfflineAudioCompletionEvent || window.Event;
        } else {
            return window.Event;
        }
    },

    compositionend: function() {
        return window.CompositionEvent || window.Event;
    },
    compositionstart: function() {
        return window.CompositionEvent || window.Event;
    },
    compositionupdate: function() {
        return window.CompositionEvent || window.Event;
    },

    contextmenu: function() {
        return window.MouseEvent || window.Event;
    },
    copy: function() {
        return window.ClipboardEvent || window.Event;
    },
    cut: function() {
        return window.ClipboardEvent || window.Event;
    },

    dblclick: function() {
        return window.MouseEvent || window.Event;
    },
    devicelight: function() {
        return window.DeviceLightEvent || window.Event;
    },
    devicemotion: function() {
        return window.DeviceMotionEvent || window.Event;
    },
    deviceorientation: function() {
        return window.DeviceOrientationEvent || window.Event;
    },
    deviceproximity: function() {
        return window.DeviceProximityEvent || window.Event;
    },

    dischargingtimechange: returnEvent,

    DOMActivate: function() {
        return window.UIEvent || window.Event;
    },
    DOMAttributeNameChanged: function() {
        return window.MutationNameEvent || window.Event;
    },
    DOMAttrModified: function() {
        return window.MutationEvent || window.Event;
    },
    DOMCharacterDataModified: function() {
        return window.MutationEvent || window.Event;
    },
    DOMContentLoaded: returnEvent,
    DOMElementNameChanged: function() {
        return window.MutationNameEvent || window.Event;
    },
    DOMFocusIn: function() {
        return window.FocusEvent || window.Event;
    },
    DOMFocusOut: function() {
        return window.FocusEvent || window.Event;
    },
    DOMNodeInserted: function() {
        return window.MutationEvent || window.Event;
    },
    DOMNodeInsertedIntoDocument: function() {
        return window.MutationEvent || window.Event;
    },
    DOMNodeRemoved: function() {
        return window.MutationEvent || window.Event;
    },
    DOMNodeRemovedFromDocument: function() {
        return window.MutationEvent || window.Event;
    },
    DOMSubtreeModified: function() {
        return window.FocusEvent || window.Event;
    },
    downloading: returnEvent,

    drag: function() {
        return window.DragEvent || window.Event;
    },
    dragend: function() {
        return window.DragEvent || window.Event;
    },
    dragenter: function() {
        return window.DragEvent || window.Event;
    },
    dragleave: function() {
        return window.DragEvent || window.Event;
    },
    dragover: function() {
        return window.DragEvent || window.Event;
    },
    dragstart: function() {
        return window.DragEvent || window.Event;
    },
    drop: function() {
        return window.DragEvent || window.Event;
    },

    durationchange: returnEvent,
    ended: returnEvent,

    endEvent: function() {
        return window.TimeEvent || window.Event;
    },
    error: function(target) {
        if (XMLHttpRequest && target instanceof XMLHttpRequest) {
            return window.ProgressEvent || window.Event;
        } else if (isNode(target)) {
            return window.UIEvent || window.Event;
        } else {
            return window.Event;
        }
    },
    focus: function() {
        return window.FocusEvent || window.Event;
    },
    focusin: function() {
        return window.FocusEvent || window.Event;
    },
    focusout: function() {
        return window.FocusEvent || window.Event;
    },

    fullscreenchange: returnEvent,
    fullscreenerror: returnEvent,

    gamepadconnected: function() {
        return window.GamepadEvent || window.Event;
    },
    gamepaddisconnected: function() {
        return window.GamepadEvent || window.Event;
    },

    hashchange: function() {
        return window.HashChangeEvent || window.Event;
    },

    input: returnEvent,
    invalid: returnEvent,

    keydown: function() {
        return window.KeyboardEvent || window.Event;
    },
    keyup: function() {
        return window.KeyboardEvent || window.Event;
    },
    keypress: function() {
        return window.KeyboardEvent || window.Event;
    },

    languagechange: returnEvent,
    levelchange: returnEvent,

    load: function(target) {
        if (XMLHttpRequest && target instanceof XMLHttpRequest) {
            return window.ProgressEvent || window.Event;
        } else {
            return window.UIEvent || window.Event;
        }
    },

    loadeddata: returnEvent,
    loadedmetadata: returnEvent,

    loadend: function() {
        return window.ProgressEvent || window.Event;
    },
    loadstart: function() {
        return window.ProgressEvent || window.Event;
    },

    message: function() {
        return window.MessageEvent || window.Event;
    },

    mousedown: function() {
        return window.MouseEvent || window.Event;
    },
    mouseenter: function() {
        return window.MouseEvent || window.Event;
    },
    mouseleave: function() {
        return window.MouseEvent || window.Event;
    },
    mousemove: function() {
        return window.MouseEvent || window.Event;
    },
    mouseout: function() {
        return window.MouseEvent || window.Event;
    },
    mouseover: function() {
        return window.MouseEvent || window.Event;
    },
    mouseup: function() {
        return window.MouseEvent || window.Event;
    },

    noupdate: returnEvent,
    obsolete: returnEvent,
    offline: returnEvent,
    online: returnEvent,
    open: returnEvent,
    orientationchange: returnEvent,

    pagehide: function() {
        return window.PageTransitionEvent || window.Event;
    },
    pageshow: function() {
        return window.PageTransitionEvent || window.Event;
    },

    paste: function() {
        return window.ClipboardEvent || window.Event;
    },
    pause: returnEvent,
    pointerlockchange: returnEvent,
    pointerlockerror: returnEvent,
    play: returnEvent,
    playing: returnEvent,

    popstate: function() {
        return window.PopStateEvent || window.Event;
    },
    progress: function() {
        return window.ProgressEvent || window.Event;
    },

    ratechange: returnEvent,
    readystatechange: returnEvent,

    repeatevent: function() {
        return window.TimeEvent || window.Event;
    },

    reset: returnEvent,

    resize: function() {
        return window.UIEvent || window.Event;
    },
    scroll: function() {
        return window.UIEvent || window.Event;
    },

    seeked: returnEvent,
    seeking: returnEvent,

    select: function() {
        return window.UIEvent || window.Event;
    },
    show: function() {
        return window.MouseEvent || window.Event;
    },
    stalled: returnEvent,
    storage: function() {
        return window.StorageEvent || window.Event;
    },
    submit: returnEvent,
    success: returnEvent,
    suspend: returnEvent,

    SVGAbort: function() {
        return window.SVGEvent || window.Event;
    },
    SVGError: function() {
        return window.SVGEvent || window.Event;
    },
    SVGLoad: function() {
        return window.SVGEvent || window.Event;
    },
    SVGResize: function() {
        return window.SVGEvent || window.Event;
    },
    SVGScroll: function() {
        return window.SVGEvent || window.Event;
    },
    SVGUnload: function() {
        return window.SVGEvent || window.Event;
    },
    SVGZoom: function() {
        return window.SVGEvent || window.Event;
    },
    timeout: function() {
        return window.ProgressEvent || window.Event;
    },

    timeupdate: returnEvent,

    touchcancel: function() {
        return window.TouchEvent || window.Event;
    },
    touchend: function() {
        return window.TouchEvent || window.Event;
    },
    touchenter: function() {
        return window.TouchEvent || window.Event;
    },
    touchleave: function() {
        return window.TouchEvent || window.Event;
    },
    touchmove: function() {
        return window.TouchEvent || window.Event;
    },
    touchstart: function() {
        return window.TouchEvent || window.Event;
    },

    transitionend: function() {
        return window.TransitionEvent || window.Event;
    },
    unload: function() {
        return window.UIEvent || window.Event;
    },

    updateready: returnEvent,
    upgradeneeded: returnEvent,

    userproximity: function() {
        return window.SensorEvent || window.Event;
    },

    visibilitychange: returnEvent,
    volumechange: returnEvent,
    waiting: returnEvent,

    wheel: function() {
        return window.WheelEvent || window.Event;
    }
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/ignoreNativeEventProp.js-=@*/
module.exports = [
    "view", "target", "currentTarget", "path", "srcElement",
    "NONE", "CAPTURING_PHASE", "AT_TARGET", "BUBBLING_PHASE", "MOUSEDOWN", "MOUSEUP",
    "MOUSEOVER", "MOUSEOUT", "MOUSEMOVE", "MOUSEDRAG", "CLICK", "DBLCLICK", "KEYDOWN",
    "KEYUP", "KEYPRESS", "DRAGDROP", "FOCUS", "BLUR", "SELECT", "CHANGE"
];
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/supports@0.0.2/src/index.js-=@*/
var environment = require(109);


var supports = module.exports;


supports.dom = !!(typeof(window) !== "undefined" && window.document && window.document.createElement);
supports.workers = typeof(Worker) !== "undefined";

supports.eventListeners = supports.dom && !!environment.window.addEventListener;
supports.attachEvents = supports.dom && !!environment.window.attachEvent;

supports.viewport = supports.dom && !!environment.window.screen;
supports.touch = supports.dom && "ontouchstart" in environment.window;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticInputEvent.js-=@*/
var getInputEvent = require(172),
    SyntheticEvent = require(173);


var SyntheticEventPrototype = SyntheticEvent.prototype,
    SyntheticInputEventPrototype;


module.exports = SyntheticInputEvent;


function SyntheticInputEvent(nativeEvent, eventHandler) {

    SyntheticEvent.call(this, nativeEvent, eventHandler);

    getInputEvent(this, nativeEvent, eventHandler);
}
SyntheticEvent.extend(SyntheticInputEvent);
SyntheticInputEventPrototype = SyntheticInputEvent.prototype;

SyntheticInputEventPrototype.destructor = function() {

    SyntheticEventPrototype.destructor.call(this);

    this.data = null;
};

SyntheticInputEventPrototype.toJSON = function(json) {

    json = SyntheticEventPrototype.toJSON.call(this, json);

    json.data = this.data;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getInputEvent.js-=@*/
module.exports = getInputEvent;


function getInputEvent(obj, nativeEvent) {
    obj.data = nativeEvent.data;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticEvent.js-=@*/
var inherits = require(64),
    createPool = require(43),
    nativeEventToJSON = require(164),
    getEvent = require(174);


var SyntheticEventPrototype;


module.exports = SyntheticEvent;


function SyntheticEvent(nativeEvent, eventHandler) {

    getEvent(this, nativeEvent, eventHandler);

    this.isPersistent = false;
}
createPool(SyntheticEvent);
SyntheticEventPrototype = SyntheticEvent.prototype;

SyntheticEvent.extend = function(child) {
    inherits(child, this);
    createPool(child);
    return child;
};

SyntheticEvent.create = function create(nativeEvent, eventHandler) {
    return this.getPooled(nativeEvent, eventHandler);
};

SyntheticEventPrototype.destructor = function() {
    this.nativeEvent = null;
    this.type = null;
    this.target = null;
    this.currentTarget = null;
    this.componentTarget = null;
    this.currentComponentTarget = null;
    this.eventPhase = null;
    this.path = null;
    this.bubbles = null;
    this.cancelable = null;
    this.timeStamp = null;
    this.defaultPrevented = null;
    this.propagationStopped = null;
    this.returnValue = null;
    this.isTrusted = null;
    this.isPersistent = null;
    this.value = null;
};

SyntheticEventPrototype.destroy = function() {
    this.constructor.release(this);
};

SyntheticEventPrototype.preventDefault = function() {
    var event = this.nativeEvent;

    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }

    this.defaultPrevented = true;
};

SyntheticEventPrototype.stopPropagation = function() {
    var event = this.nativeEvent;

    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = false;
    }

    this.propagationStopped = true;
};

SyntheticEventPrototype.persist = function() {
    this.isPersistent = true;
};

SyntheticEventPrototype.stopImmediatePropagation = SyntheticEventPrototype.stopPropagation;

SyntheticEventPrototype.toJSON = function(json) {
    json = json || {};

    json.nativeEvent = nativeEventToJSON(this.nativeEvent);
    json.type = this.type;
    json.target = null;
    json.currentTarget = this.currentTarget;
    json.eventPhase = this.eventPhase;
    json.bubbles = this.bubbles;
    json.cancelable = this.cancelable;
    json.timeStamp = this.timeStamp;
    json.defaultPrevented = this.defaultPrevented;
    json.propagationStopped = this.propagationStopped;
    json.isTrusted = this.isTrusted;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getEvent.js-=@*/
var getEventTarget = require(162),
    getPath = require(175);


module.exports = getEvent;


function getEvent(obj, nativeEvent, eventHandler) {
    obj.nativeEvent = nativeEvent;
    obj.type = nativeEvent.type;
    obj.target = getEventTarget(nativeEvent, eventHandler.window);
    obj.currentTarget = nativeEvent.currentTarget;
    obj.eventPhase = nativeEvent.eventPhase;
    obj.bubbles = nativeEvent.bubbles;
    obj.path = getPath(obj, eventHandler.window);
    obj.cancelable = nativeEvent.cancelable;
    obj.timeStamp = nativeEvent.timeStamp;
    obj.defaultPrevented = (
        nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false
    );
    obj.propagationStopped = false;
    obj.returnValue = nativeEvent.returnValue;
    obj.isTrusted = nativeEvent.isTrusted;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getPath.js-=@*/
var isArray = require(20),
    isDocument = require(116),
    getEventTarget = require(162);


module.exports = getPath;


function getPath(nativeEvent, window) {
    var path = nativeEvent.path,
        target = getEventTarget(nativeEvent, window);

    if (isArray(path)) {
        return path;
    } else if (isDocument(target) || (target && target.window === target)) {
        return [target];
    } else {
        path = [];

        while (target) {
            path[path.length] = target;
            target = target.parentNode;
        }
    }

    return path;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticUIEvent.js-=@*/
var getUIEvent = require(177),
    SyntheticEvent = require(173);


var SyntheticEventPrototype = SyntheticEvent.prototype,
    SyntheticUIEventPrototype;


module.exports = SyntheticUIEvent;


function SyntheticUIEvent(nativeEvent, eventHandler) {

    SyntheticEvent.call(this, nativeEvent, eventHandler);

    getUIEvent(this, nativeEvent, eventHandler);
}
SyntheticEvent.extend(SyntheticUIEvent);
SyntheticUIEventPrototype = SyntheticUIEvent.prototype;

SyntheticUIEventPrototype.destructor = function() {

    SyntheticEventPrototype.destructor.call(this);

    this.view = null;
    this.detail = null;
};

SyntheticUIEventPrototype.toJSON = function(json) {

    json = SyntheticEventPrototype.toJSON.call(this, json);

    json.view = null;
    json.detail = this.detail;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getUIEvent.js-=@*/
var getWindow = require(126),
    getEventTarget = require(162);


module.exports = getUIEvent;


function getUIEvent(obj, nativeEvent, eventHandler) {
    obj.view = getView(nativeEvent, eventHandler);
    obj.detail = nativeEvent.detail || 0;
}

function getView(nativeEvent, eventHandler) {
    var target, document;

    if (nativeEvent.view) {
        return nativeEvent.view;
    } else {
        target = getEventTarget(nativeEvent, eventHandler.window);

        if (target != null && target.window === target) {
            return target;
        } else {
            document = target.ownerDocument;

            if (document) {
                return getWindow(document);
            } else {
                return eventHandler.window;
            }
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticAnimationEvent.js-=@*/
var getAnimationEvent = require(188),
    SyntheticEvent = require(173);


var SyntheticEventPrototype = SyntheticEvent.prototype,
    SyntheticAnimationEventPrototype;


module.exports = SyntheticAnimationEvent;


function SyntheticAnimationEvent(nativeEvent, eventHandler) {

    SyntheticEvent.call(this, nativeEvent, eventHandler);

    getAnimationEvent(this, nativeEvent);
}
SyntheticEvent.extend(SyntheticAnimationEvent);
SyntheticAnimationEventPrototype = SyntheticAnimationEvent.prototype;

SyntheticAnimationEventPrototype.destructor = function() {

    SyntheticEventPrototype.destructor.call(this);

    this.animationName = null;
    this.elapsedTime = null;
    this.pseudoElement = null;
};

SyntheticAnimationEventPrototype.toJSON = function(json) {
    json = SyntheticEventPrototype.toJSON.call(this, json);

    json.animationName = this.animationName;
    json.elapsedTime = this.elapsedTime;
    json.pseudoElement = this.pseudoElement;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticTransitionEvent.js-=@*/
var getTransitionEvent = require(189),
    SyntheticEvent = require(173);


var SyntheticEventPrototype = SyntheticEvent.prototype,
    SyntheticTransitionEventPrototype;


module.exports = SyntheticTransitionEvent;


function SyntheticTransitionEvent(nativeEvent, eventHandler) {

    SyntheticEvent.call(this, nativeEvent, eventHandler);

    getTransitionEvent(this, nativeEvent);
}
SyntheticEvent.extend(SyntheticTransitionEvent);
SyntheticTransitionEventPrototype = SyntheticTransitionEvent.prototype;

SyntheticTransitionEventPrototype.destructor = function() {

    SyntheticEventPrototype.destructor.call(this);

    this.propertyName = null;
    this.elapsedTime = null;
    this.pseudoElement = null;
};

SyntheticTransitionEventPrototype.toJSON = function(json) {
    json = SyntheticEventPrototype.toJSON.call(this, json);

    json.propertyName = this.propertyName;
    json.elapsedTime = this.elapsedTime;
    json.pseudoElement = this.pseudoElement;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticClipboardEvent.js-=@*/
var getClipboardEvent = require(190),
    SyntheticEvent = require(173);


var SyntheticEventPrototype = SyntheticEvent.prototype,
    SyntheticClipboardEventPrototype;


module.exports = SyntheticClipboardEvent;


function SyntheticClipboardEvent(nativeEvent, eventHandler) {

    SyntheticEvent.call(this, nativeEvent, eventHandler);

    getClipboardEvent(this, nativeEvent, eventHandler);
}
SyntheticEvent.extend(SyntheticClipboardEvent);
SyntheticClipboardEventPrototype = SyntheticClipboardEvent.prototype;

SyntheticClipboardEventPrototype.destructor = function() {

    SyntheticEventPrototype.destructor.call(this);

    this.clipboardData = null;
};

SyntheticClipboardEventPrototype.toJSON = function(json) {

    json = SyntheticEventPrototype.toJSON.call(this, json);

    json.clipboardData = this.clipboardData;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticCompositionEvent.js-=@*/
var getCompositionEvent = require(191),
    SyntheticEvent = require(173);


var SyntheticEventPrototype = SyntheticEvent.prototype,
    SyntheticCompositionEventPrototype;


module.exports = SyntheticCompositionEvent;


function SyntheticCompositionEvent(nativeEvent, eventHandler) {

    SyntheticEvent.call(this, nativeEvent, eventHandler);

    getCompositionEvent(this, nativeEvent, eventHandler);
}
SyntheticEvent.extend(SyntheticCompositionEvent);
SyntheticCompositionEventPrototype = SyntheticCompositionEvent.prototype;

SyntheticCompositionEventPrototype.destructor = function() {

    SyntheticEventPrototype.destructor.call(this);

    this.data = null;
};

SyntheticCompositionEventPrototype.toJSON = function(json) {

    json = SyntheticEventPrototype.toJSON.call(this, json);

    json.data = this.data;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticDragEvent.js-=@*/
var getDragEvent = require(192),
    SyntheticMouseEvent = require(185);


var SyntheticMouseEventPrototype = SyntheticMouseEvent.prototype,
    SyntheticDragEventPrototype;


module.exports = SyntheticDragEvent;


function SyntheticDragEvent(nativeEvent, eventHandler) {

    SyntheticMouseEvent.call(this, nativeEvent, eventHandler);

    getDragEvent(this, nativeEvent, eventHandler);
}
SyntheticMouseEvent.extend(SyntheticDragEvent);
SyntheticDragEventPrototype = SyntheticDragEvent.prototype;

SyntheticDragEventPrototype.destructor = function() {

    SyntheticMouseEventPrototype.destructor.call(this);

    this.dataTransfer = null;
};

SyntheticDragEventPrototype.toJSON = function(json) {

    json = SyntheticMouseEventPrototype.toJSON.call(this, json);

    json.dataTransfer = this.dataTransfer;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticFocusEvent.js-=@*/
var getFocusEvent = require(197),
    SyntheticUIEvent = require(176);


var SyntheticUIEventPrototype = SyntheticUIEvent.prototype,
    SyntheticFocusEventPrototype;


module.exports = SyntheticFocusEvent;


function SyntheticFocusEvent(nativeEvent, eventHandler) {

    SyntheticUIEvent.call(this, nativeEvent, eventHandler);

    getFocusEvent(this, nativeEvent, eventHandler);
}
SyntheticUIEvent.extend(SyntheticFocusEvent);
SyntheticFocusEventPrototype = SyntheticFocusEvent.prototype;

SyntheticFocusEventPrototype.destructor = function() {

    SyntheticUIEventPrototype.destructor.call(this);

    this.relatedTarget = null;
};

SyntheticFocusEventPrototype.toJSON = function(json) {

    json = SyntheticUIEventPrototype.toJSON.call(this, json);

    json.relatedTarget = this.relatedTarget;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticKeyboardEvent.js-=@*/
var getKeyboardEvent = require(198),
    SyntheticUIEvent = require(176);


var SyntheticUIEventPrototype = SyntheticUIEvent.prototype,
    SynthetiKeyboardEventPrototype;


module.exports = SynthetiKeyboardEvent;


function SynthetiKeyboardEvent(nativeEvent, eventHandler) {

    SyntheticUIEvent.call(this, nativeEvent, eventHandler);

    getKeyboardEvent(this, nativeEvent, eventHandler);
}
SyntheticUIEvent.extend(SynthetiKeyboardEvent);
SynthetiKeyboardEventPrototype = SynthetiKeyboardEvent.prototype;

SynthetiKeyboardEventPrototype.getModifierState = require(194);

SynthetiKeyboardEventPrototype.destructor = function() {

    SyntheticUIEventPrototype.destructor.call(this);

    this.key = null;
    this.location = null;
    this.ctrlKey = null;
    this.shiftKey = null;
    this.altKey = null;
    this.metaKey = null;
    this.repeat = null;
    this.locale = null;
    this.charCode = null;
    this.keyCode = null;
    this.which = null;
};

SynthetiKeyboardEventPrototype.toJSON = function(json) {

    json = SyntheticUIEventPrototype.toJSON.call(this, json);

    json.key = this.key;
    json.location = this.location;
    json.ctrlKey = this.ctrlKey;
    json.shiftKey = this.shiftKey;
    json.altKey = this.altKey;
    json.metaKey = this.metaKey;
    json.repeat = this.repeat;
    json.locale = this.locale;
    json.charCode = this.charCode;
    json.keyCode = this.keyCode;
    json.which = this.which;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticMouseEvent.js-=@*/
var getMouseEvent = require(193),
    SyntheticUIEvent = require(176);


var SyntheticUIEventPrototype = SyntheticUIEvent.prototype,
    SyntheticMouseEventPrototype;


module.exports = SyntheticMouseEvent;


function SyntheticMouseEvent(nativeEvent, eventHandler) {

    SyntheticUIEvent.call(this, nativeEvent, eventHandler);

    getMouseEvent(this, nativeEvent, eventHandler);
}
SyntheticUIEvent.extend(SyntheticMouseEvent);
SyntheticMouseEventPrototype = SyntheticMouseEvent.prototype;

SyntheticMouseEventPrototype.getModifierState = require(194);

SyntheticMouseEventPrototype.destructor = function() {

    SyntheticUIEventPrototype.destructor.call(this);

    this.screenX = null;
    this.screenY = null;
    this.clientX = null;
    this.clientY = null;
    this.ctrlKey = null;
    this.shiftKey = null;
    this.altKey = null;
    this.metaKey = null;
    this.button = null;
    this.buttons = null;
    this.relatedTarget = null;
    this.pageX = null;
    this.pageY = null;
};

SyntheticMouseEventPrototype.toJSON = function(json) {

    json = SyntheticUIEventPrototype.toJSON.call(this, json);

    json.screenX = this.screenX;
    json.screenY = this.screenY;
    json.clientX = this.clientX;
    json.clientY = this.clientY;
    json.ctrlKey = this.ctrlKey;
    json.shiftKey = this.shiftKey;
    json.altKey = this.altKey;
    json.metaKey = this.metaKey;
    json.button = this.button;
    json.buttons = this.buttons;
    json.relatedTarget = this.relatedTarget;
    json.pageX = this.pageX;
    json.pageY = this.pageY;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticTouchEvent.js-=@*/
var getTouchEvent = require(201),
    SyntheticUIEvent = require(176),
    SyntheticTouch = require(202);


var SyntheticUIEventPrototype = SyntheticUIEvent.prototype,
    SyntheticTouchEventPrototype;


module.exports = SyntheticTouchEvent;


function SyntheticTouchEvent(nativeEvent, eventHandler) {

    SyntheticUIEvent.call(this, nativeEvent, eventHandler);

    this.touches = createTouches(this.touches || [], nativeEvent.touches, eventHandler);
    this.targetTouches = createTouches(this.targetTouches || [], nativeEvent.targetTouches, eventHandler);
    this.changedTouches = createTouches(this.changedTouches || [], nativeEvent.changedTouches, eventHandler);

    getTouchEvent(this, nativeEvent, eventHandler);
}
SyntheticUIEvent.extend(SyntheticTouchEvent);
SyntheticTouchEventPrototype = SyntheticTouchEvent.prototype;

SyntheticTouchEventPrototype.getModifierState = require(194);

SyntheticTouchEventPrototype.destructor = function() {

    SyntheticUIEventPrototype.destructor.call(this);

    destroyTouches(this.touches);
    destroyTouches(this.targetTouches);
    destroyTouches(this.changedTouches);

    this.altKey = null;
    this.metaKey = null;
    this.ctrlKey = null;
    this.shiftKey = null;
};

SyntheticTouchEventPrototype.toJSON = function(json) {

    json = SyntheticUIEventPrototype.toJSON.call(this, json);

    json.touches = this.touches || [];
    json.targetTouches = this.targetTouches || [];
    json.changedTouches = this.changedTouches || [];
    json.ctrlKey = this.ctrlKey;
    json.shiftKey = this.shiftKey;
    json.altKey = this.altKey;
    json.metaKey = this.metaKey;

    return json;
};

function createTouches(touches, nativeTouches, eventHandler) {
    var i = -1,
        il = nativeTouches.length - 1;

    while (i++ < il) {
        touches[i] = SyntheticTouch.create(nativeTouches[i], eventHandler);
    }

    return touches;
}

function destroyTouches(touches) {
    var i;

    while (i--) {
        touches[i].destroy();
    }
    touches.length = 0;

    return touches;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticWheelEvent.js-=@*/
var getWheelEvent = require(204),
    SyntheticMouseEvent = require(185);


var SyntheticMouseEventPrototype = SyntheticMouseEvent.prototype,
    SyntheticWheelEventPrototype;


module.exports = SyntheticWheelEvent;


function SyntheticWheelEvent(nativeEvent, eventHandler) {

    SyntheticMouseEvent.call(this, nativeEvent, eventHandler);

    getWheelEvent(this, nativeEvent, eventHandler);
}
SyntheticMouseEvent.extend(SyntheticWheelEvent);
SyntheticWheelEventPrototype = SyntheticWheelEvent.prototype;

SyntheticWheelEventPrototype.destructor = function() {

    SyntheticMouseEventPrototype.destructor.call(this);

    this.deltaX = null;
    this.deltaY = null;
    this.deltaZ = null;
    this.deltaMode = null;
};

SyntheticWheelEventPrototype.toJSON = function(json) {

    json = SyntheticMouseEventPrototype.toJSON.call(this, json);

    json.deltaX = this.deltaX;
    json.deltaY = this.deltaY;
    json.deltaZ = this.deltaZ;
    json.deltaMode = this.deltaMode;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getAnimationEvent.js-=@*/
module.exports = getAnimationEvent;


function getAnimationEvent(obj, nativeEvent) {
    obj.animationName = nativeEvent.animationName;
    obj.elapsedTime = nativeEvent.elapsedTime;
    obj.pseudoElement = nativeEvent.pseudoElement;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getTransitionEvent.js-=@*/
module.exports = getTransitionEvent;


function getTransitionEvent(obj, nativeEvent) {
    obj.propertyName = nativeEvent.propertyName;
    obj.elapsedTime = nativeEvent.elapsedTime;
    obj.pseudoElement = nativeEvent.pseudoElement;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getClipboardEvent.js-=@*/
module.exports = getClipboardEvent;


function getClipboardEvent(obj, nativeEvent, eventHandler) {
    obj.clipboardData = getClipboardData(nativeEvent, eventHandler.window);
}

function getClipboardData(nativeEvent, window) {
    return nativeEvent.clipboardData != null ? nativeEvent.clipboardData : window.clipboardData;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getCompositionEvent.js-=@*/
module.exports = getCompositionEvent;


function getCompositionEvent(obj, nativeEvent) {
    obj.data = nativeEvent.data;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getDragEvent.js-=@*/
module.exports = getDragEvent;


function getDragEvent(obj, nativeEvent) {
    obj.dataTransfer = nativeEvent.dataTransfer;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getMouseEvent.js-=@*/
var getPageX = require(195),
    getPageY = require(196);


module.exports = getMouseEvent;


function getMouseEvent(obj, nativeEvent, eventHandler) {
    obj.screenX = nativeEvent.screenX;
    obj.screenY = nativeEvent.screenY;
    obj.clientX = nativeEvent.clientX;
    obj.clientY = nativeEvent.clientY;
    obj.ctrlKey = nativeEvent.ctrlKey;
    obj.shiftKey = nativeEvent.shiftKey;
    obj.altKey = nativeEvent.altKey;
    obj.metaKey = nativeEvent.metaKey;
    obj.button = getButton(nativeEvent);
    obj.buttons = nativeEvent.buttons;
    obj.relatedTarget = getRelatedTarget(nativeEvent);
    obj.pageX = getPageX(nativeEvent, eventHandler.viewport);
    obj.pageY = getPageY(nativeEvent, eventHandler.viewport);
}

function getRelatedTarget(nativeEvent) {
    return nativeEvent.relatedTarget || (
        nativeEvent.fromElement === nativeEvent.srcElement ? nativeEvent.toElement : nativeEvent.fromElement
    );
}

function getButton(nativeEvent) {
    var button = nativeEvent.button;

    return (
        nativeEvent.which != null ? button : (
            button === 2 ? 2 : button === 4 ? 1 : 0
        )
    );
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getEventModifierState.js-=@*/
var modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};


module.exports = getEventModifierState;


function getEventModifierState(keyArg) {
    var nativeEvent = this.nativeEvent,
        keyProp;

    if (nativeEvent.getModifierState != null) {
        return nativeEvent.getModifierState(keyArg);
    } else {
        keyProp = modifierKeyToProp[keyArg];
        return keyProp ? !!nativeEvent[keyProp] : false;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getPageX.js-=@*/
module.exports = getPageX;


function getPageX(nativeEvent, viewport) {
    return nativeEvent.pageX != null ? nativeEvent.pageX : nativeEvent.clientX + viewport.currentScrollLeft;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getPageY.js-=@*/
module.exports = getPageY;


function getPageY(nativeEvent, viewport) {
    return nativeEvent.pageY != null ? nativeEvent.pageY : nativeEvent.clientY + viewport.currentScrollTop;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getFocusEvent.js-=@*/
module.exports = getFocusEvent;


function getFocusEvent(obj, nativeEvent) {
    obj.relatedTarget = nativeEvent.relatedTarget;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getKeyboardEvent.js-=@*/
var getEventKey = require(199),
    getEventCharCode = require(200);


module.exports = getKeyboardEvent;


function getKeyboardEvent(obj, nativeEvent) {
    obj.key = getEventKey(nativeEvent);
    obj.location = nativeEvent.location;
    obj.ctrlKey = nativeEvent.ctrlKey;
    obj.shiftKey = nativeEvent.shiftKey;
    obj.altKey = nativeEvent.altKey;
    obj.metaKey = nativeEvent.metaKey;
    obj.repeat = nativeEvent.repeat;
    obj.locale = nativeEvent.locale;
    obj.charCode = getCharCode(nativeEvent);
    obj.keyCode = getKeyCode(nativeEvent);
    obj.which = getWhich(nativeEvent);
}

function getCharCode(nativeEvent) {
    return nativeEvent.type === "keypress" ? getEventCharCode(nativeEvent) : 0;
}

function getKeyCode(nativeEvent) {
    var type = nativeEvent.type;

    return type === "keydown" || type === "keyup" ? nativeEvent.keyCode : 0;
}

function getWhich(nativeEvent) {
    var type = nativeEvent.type;

    return type === "keypress" ? getEventCharCode(nativeEvent) : (
        type === "keydown" || type === "keyup" ? nativeEvent.keyCode : 0
    );
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_event_key@0.0.1/src/index.js-=@*/
var getEventCharCode = require(200);


var normalizeKey, translateToKey;


module.exports = getEventKey;


normalizeKey = {
    "Esc": "Escape",
    "Spacebar": " ",
    "Left": "ArrowLeft",
    "Up": "ArrowUp",
    "Right": "ArrowRight",
    "Down": "ArrowDown",
    "Del": "Delete",
    "Win": "OS",
    "Menu": "ContextMenu",
    "Apps": "ContextMenu",
    "Scroll": "ScrollLock",
    "MozPrintableKey": "Unidentified"
};

translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
};


function getEventKey(nativeEvent) {
    var key, charCode;

    if (nativeEvent.key) {
        key = normalizeKey[nativeEvent.key] || nativeEvent.key;

        if (key !== "Unidentified") {
            return key;
        }
    }

    if (nativeEvent.type === "keypress") {
        charCode = getEventCharCode(nativeEvent);

        return charCode === 13 ? "Enter" : String.fromCharCode(charCode);
    }
    if (nativeEvent.type === "keydown" || nativeEvent.type === "keyup") {
        return translateToKey[nativeEvent.keyCode] || "Unidentified";
    }

    return "";
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_event_char_code@0.0.1/src/index.js-=@*/
module.exports = getEventCharCode;


function getEventCharCode(nativeEvent) {
    var keyCode = nativeEvent.keyCode,
        charCode;

    if (nativeEvent.charCode != null) {
        charCode = nativeEvent.charCode;

        if (charCode === 0 && keyCode === 13) {
            charCode = 13;
        }
    } else {
        charCode = keyCode;
    }

    if (charCode >= 32 || charCode === 13) {
        return charCode;
    } else {
        return 0;
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getTouchEvent.js-=@*/
module.exports = getTouchEvent;


function getTouchEvent(obj, nativeEvent) {
    obj.altKey = nativeEvent.altKey;
    obj.metaKey = nativeEvent.metaKey;
    obj.ctrlKey = nativeEvent.ctrlKey;
    obj.shiftKey = nativeEvent.shiftKey;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/syntheticEvents/SyntheticTouch.js-=@*/
var getTouch = require(203),
    nativeEventToJSON = require(164),
    createPool = require(43);


var SyntheticTouchPrototype;


module.exports = SyntheticTouch;


function SyntheticTouch(nativeTouch, eventHandler) {
    getTouch(this, nativeTouch, eventHandler);
}
createPool(SyntheticTouch);
SyntheticTouchPrototype = SyntheticTouch.prototype;

SyntheticTouch.create = function(nativeTouch, eventHandler) {
    return this.getPooled(nativeTouch, eventHandler);
};

SyntheticTouchPrototype.destroy = function(instance) {
    SyntheticTouch.release(instance);
};

SyntheticTouchPrototype.destructor = function() {
    this.nativeTouch = null;
    this.identifier = null;
    this.screenX = null;
    this.screenY = null;
    this.clientX = null;
    this.clientY = null;
    this.pageX = null;
    this.pageY = null;
    this.radiusX = null;
    this.radiusY = null;
    this.rotationAngle = null;
    this.force = null;
    this.target = null;
};

SyntheticTouchPrototype.toJSON = function(json) {
    json = json || {};

    json.nativeTouch = nativeEventToJSON(this.nativeTouch);
    json.identifier = this.identifier;
    json.screenX = this.screenX;
    json.screenY = this.screenY;
    json.clientX = this.clientX;
    json.clientY = this.clientY;
    json.pageX = this.pageX;
    json.pageY = this.pageY;
    json.radiusX = this.radiusX;
    json.radiusY = this.radiusY;
    json.rotationAngle = this.rotationAngle;
    json.force = this.force;
    json.target = null;

    return json;
};
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getTouch.js-=@*/
module.exports = getTouch;


function getTouch(obj, nativeTouch, eventHandler) {
    obj.nativeTouch = nativeTouch;
    obj.identifier = nativeTouch.identifier;
    obj.screenX = nativeTouch.screenX;
    obj.screenY = nativeTouch.screenY;
    obj.clientX = nativeTouch.clientX;
    obj.clientY = nativeTouch.clientY;
    obj.pageX = getPageX(nativeTouch, eventHandler.viewport);
    obj.pageY = getPageY(nativeTouch, eventHandler.viewport);
    obj.radiusX = getRadiusX(nativeTouch);
    obj.radiusY = getRadiusY(nativeTouch);
    obj.rotationAngle = getRotationAngle(nativeTouch);
    obj.force = getForce(nativeTouch);
    obj.target = nativeTouch.target;
}

function getPageX(nativeTouch, viewport) {
    return nativeTouch.pageX != null ? nativeTouch.pageX : nativeTouch.clientX + viewport.currentScrollLeft;
}

function getPageY(nativeTouch, viewport) {
    return nativeTouch.pageX != null ? nativeTouch.pageY : nativeTouch.clientY + viewport.currentScrollTop;
}

function getRadiusX(nativeTouch) {
    return (
        nativeTouch.radiusX != null ? nativeTouch.radiusX :
        nativeTouch.webkitRadiusX != null ? nativeTouch.webkitRadiusX :
        nativeTouch.mozRadiusX != null ? nativeTouch.mozRadiusX :
        nativeTouch.msRadiusX != null ? nativeTouch.msRadiusX :
        nativeTouch.oRadiusX != null ? nativeTouch.oRadiusX :
        0
    );
}

function getRadiusY(nativeTouch) {
    return (
        nativeTouch.radiusY != null ? nativeTouch.radiusY :
        nativeTouch.webkitRadiusY != null ? nativeTouch.webkitRadiusY :
        nativeTouch.mozRadiusY != null ? nativeTouch.mozRadiusY :
        nativeTouch.msRadiusY != null ? nativeTouch.msRadiusY :
        nativeTouch.oRadiusY != null ? nativeTouch.oRadiusY :
        0
    );
}

function getRotationAngle(nativeTouch) {
    return (
        nativeTouch.rotationAngle != null ? nativeTouch.rotationAngle :
        nativeTouch.webkitRotationAngle != null ? nativeTouch.webkitRotationAngle :
        nativeTouch.mozRotationAngle != null ? nativeTouch.mozRotationAngle :
        nativeTouch.msRotationAngle != null ? nativeTouch.msRotationAngle :
        nativeTouch.oRotationAngle != null ? nativeTouch.oRotationAngle :
        0
    );
}

function getForce(nativeTouch) {
    return (
        nativeTouch.force != null ? nativeTouch.force :
        nativeTouch.webkitForce != null ? nativeTouch.webkitForce :
        nativeTouch.mozForce != null ? nativeTouch.mozForce :
        nativeTouch.msForce != null ? nativeTouch.msForce :
        nativeTouch.oForce != null ? nativeTouch.oForce :
        1
    );
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/events/getters/getWheelEvent.js-=@*/
module.exports = getWheelEvent;


function getWheelEvent(obj, nativeEvent) {
    obj.deltaX = getDeltaX(nativeEvent);
    obj.deltaY = getDeltaY(nativeEvent);
    obj.deltaZ = nativeEvent.deltaZ;
    obj.deltaMode = nativeEvent.deltaMode;
}

function getDeltaX(nativeEvent) {
    return nativeEvent.deltaX != null ? nativeEvent.deltaX : (
        nativeEvent.wheelDeltaX != null ? -nativeEvent.wheelDeltaX : 0
    );
}

function getDeltaY(nativeEvent) {
    return nativeEvent.deltaY != null ? nativeEvent.deltaY : (
        nativeEvent.wheelDeltaY != null ? -nativeEvent.wheelDeltaY : (
            nativeEvent.wheelDelta != null ? -nativeEvent.wheelDelta : 0
        )
    );
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/applyPatch.js-=@*/
var virt = require(1),
    isNull = require(29),
    isUndefined = require(30),
    isNullOrUndefined = require(23),
    getNodeById = require(103),
    createDOMElement = require(206),
    renderMarkup = require(81),
    renderString = require(72),
    renderChildrenString = require(83),
    addDOMNodes = require(207),
    removeDOMNode = require(208),
    removeDOMNodes = require(209),
    getNodeById = require(103),
    applyProperties = require(210);


var consts = virt.consts;


module.exports = applyPatch;


function applyPatch(patch, id, rootDOMNode, document) {
    switch (patch.type) {
        case consts.MOUNT:
            mount(rootDOMNode, patch.next, id);
            break;
        case consts.UNMOUNT:
            unmount(rootDOMNode);
            break;
        case consts.INSERT:
            insert(getNodeById(id), patch.childId, patch.index, patch.next, document);
            break;
        case consts.REMOVE:
            remove(getNodeById(id), patch.childId, patch.index);
            break;
        case consts.REPLACE:
            replace(getNodeById(id), patch.childId, patch.index, patch.next, document);
            break;
        case consts.TEXT:
            text(getNodeById(id), patch.index, patch.next, patch.props);
            break;
        case consts.ORDER:
            order(getNodeById(id), patch.order);
            break;
        case consts.PROPS:
            applyProperties(getNodeById(id), patch.id, patch.next, patch.previous);
            break;
    }
}

function remove(parentNode, id, index) {
    var node;

    if (isNull(id)) {
        node = parentNode.childNodes[index];
    } else {
        node = getNodeById(id);
        removeDOMNode(node);
    }

    parentNode.removeChild(node);
}

function mount(rootDOMNode, view, id) {
    rootDOMNode.innerHTML = renderString(view, null, id);
    addDOMNodes(rootDOMNode);
}

function unmount(rootDOMNode) {
    removeDOMNodes(rootDOMNode);
    rootDOMNode.innerHTML = "";
}

function insert(parentNode, id, index, view, document) {
    var node = createDOMElement(view, id, document);

    if (view.children) {
        node.innerHTML = renderChildrenString(view.children, view.props, id);
        addDOMNodes(node);
    }

    parentNode.appendChild(node);
}

function text(parentNode, index, value, props) {
    var textNode = parentNode.childNodes[index];

    if (textNode) {
        if (textNode.nodeType === 3) {
            textNode.nodeValue = value;
        } else {
            textNode.innerHTML = renderMarkup(value, props);
        }
    }
}

function replace(parentNode, id, index, view, document) {
    var node = createDOMElement(view, id, document);

    if (view.children) {
        node.innerHTML = renderChildrenString(view.children, view.props, id);
        addDOMNodes(node);
    }

    parentNode.replaceChild(node, parentNode.childNodes[index]);
}

var order_children = [];

function order(parentNode, orderIndex) {
    var children = order_children,
        childNodes = parentNode.childNodes,
        reverseIndex = orderIndex.reverse,
        removes = orderIndex.removes,
        insertOffset = 0,
        i = -1,
        length = childNodes.length - 1,
        move, node, insertNode;

    children.length = length;
    while (i++ < length) {
        children[i] = childNodes[i];
    }

    i = -1;
    while (i++ < length) {
        move = orderIndex[i];

        if (!isUndefined(move) && move !== i) {
            if (reverseIndex[i] > i) {
                insertOffset++;
            }

            node = children[move];
            insertNode = childNodes[i + insertOffset] || null;

            if (node !== insertNode) {
                parentNode.insertBefore(node, insertNode);
            }

            if (move < i) {
                insertOffset--;
            }
        }

        if (!isNullOrUndefined(removes[i])) {
            insertOffset++;
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/createDOMElement.js-=@*/
var virt = require(1),
    isString = require(21),

    DOM_ID_NAME = require(82),
    nodeCache = require(104),

    applyProperties = require(210);


var View = virt.View,
    isPrimitiveView = View.isPrimitiveView;


module.exports = createDOMElement;


function createDOMElement(view, id, document) {
    var node;

    if (isPrimitiveView(view)) {
        return document.createTextNode(view);
    } else if (isString(view.type)) {
        node = document.createElement(view.type);

        applyProperties(node, id, view.props, undefined);

        node.setAttribute(DOM_ID_NAME, id);
        nodeCache[id] = node;

        return node;
    } else {
        throw new TypeError("Arguments do not describe a valid view");
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/addDOMNodes.js-=@*/
var arrayForEach = require(45),
    addDOMNode = require(211),
    isDOMChildrenSupported = require(212);


if (isDOMChildrenSupported) {
    module.exports = function addDOMNodes(node) {
        arrayForEach(node.children, addDOMNode);
    };
} else {
    module.exports = function addDOMNodes(node) {
        arrayForEach(node.childNodes, addDOMNode);
    };
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/removeDOMNode.js-=@*/
var arrayForEach = require(45),
    isElement = require(96),
    nodeCache = require(104),
    getNodeAttributeId = require(163),
    isDOMChildrenSupported = require(212);


if (isDOMChildrenSupported) {
    module.exports = function removeDOMNode(node) {
        var id = getNodeAttributeId(node);
        delete nodeCache[id];
        arrayForEach(node.children, removeDOMNode);
    };
} else {
    module.exports = function addDOMNode(node) {
        if (isElement(node)) {
            delete nodeCache[getNodeAttributeId(node)];
            arrayForEach(node.childNodes, removeDOMNode);
        }
    };
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/removeDOMNodes.js-=@*/
var arrayForEach = require(45),
    isDOMChildrenSupported = require(212),
    removeDOMNode = require(208);


if (isDOMChildrenSupported) {
    module.exports = function removeDOMNode(node) {
        arrayForEach(node.children, removeDOMNode);
    };
} else {
    module.exports = function addDOMNode(node) {
        arrayForEach(node.childNodes, removeDOMNode);
    };
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/applyProperties.js-=@*/
var isString = require(21),
    isObject = require(22),
    isUndefined = require(30),
    isNullOrUndefined = require(23),
    getPrototypeOf = require(35);


module.exports = applyProperties;


function applyProperties(node, id, props, previous) {
    var propKey, propValue;

    for (propKey in props) {
        propValue = props[propKey];

        if (isNullOrUndefined(propValue) && !isNullOrUndefined(previous)) {
            removeProperty(node, id, previous, propKey);
        } else if (isObject(propValue)) {
            applyObject(node, previous, propKey, propValue);
        } else if (!isNullOrUndefined(propValue) && (!previous || previous[propKey] !== propValue)) {
            applyProperty(node, id, propKey, propValue);
        }
    }
}

function applyProperty(node, id, propKey, propValue) {
    if (propKey !== "className" && node.setAttribute) {
        node.setAttribute(propKey, propValue);
    } else {
        node[propKey] = propValue;
    }
}

function removeProperty(node, id, previous, propKey) {
    var canRemoveAttribute = !!node.removeAttribute,
        previousValue = previous[propKey];

    if (propKey === "attributes") {
        removeAttributes(node, previousValue, canRemoveAttribute);
    } else if (propKey === "style") {
        removeStyles(node, previousValue);
    } else {
        if (propKey !== "className" && canRemoveAttribute) {
            node.removeAttribute(propKey);
        } else {
            node[propKey] = isString(previousValue) ? "" : null;
        }
    }
}

function removeAttributes(node, previousValue, canRemoveAttribute) {
    for (var keyName in previousValue) {
        if (canRemoveAttribute) {
            node.removeAttribute(keyName);
        } else {
            node[keyName] = isString(previousValue[keyName]) ? "" : null;
        }
    }
}

function removeStyles(node, previousValue) {
    var style = node.style;

    for (var keyName in previousValue) {
        style[keyName] = "";
    }
}

function applyObject(node, previous, propKey, propValues) {
    var previousValue;

    if (propKey === "attributes") {
        setAttributes(node, propValues);
    } else {
        previousValue = previous ? previous[propKey] : void(0);

        if (!isNullOrUndefined(previousValue) &&
            isObject(previousValue) &&
            getPrototypeOf(previousValue) !== getPrototypeOf(propValues)
        ) {
            node[propKey] = propValues;
        } else {
            setObject(node, propKey, propValues);
        }
    }
}

function setAttributes(node, propValues) {
    var value;

    for (var key in propValues) {
        value = propValues[key];

        if (isUndefined(value)) {
            node.removeAttribute(key);
        } else {
            node.setAttribute(key, value);
        }
    }
}

function setObject(node, propKey, propValues) {
    var nodeProps = node[propKey],
        replacer, value;

    if (!isObject(nodeProps)) {
        nodeProps = node[propKey] = {};
    }

    replacer = propKey === "style" ? "" : void(0);

    for (var key in propValues) {
        value = propValues[key];
        nodeProps[key] = isUndefined(value) ? replacer : value;
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/addDOMNode.js-=@*/
var arrayForEach = require(45),
    isElement = require(96),
    getNodeId = require(213),
    isDOMChildrenSupported = require(212);


if (isDOMChildrenSupported) {
    module.exports = function addDOMNode(node) {
        getNodeId(node);
        arrayForEach(node.children, addDOMNode);
    };
} else {
    module.exports = function addDOMNode(node) {
        if (isElement(node)) {
            getNodeId(node);
            arrayForEach(node.childNodes, addDOMNode);
        }
    };
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/isDOMChildrenSupported.js-=@*/
var environment = require(109);


var document = environment.document;


if (
    (function() {
        try {
            var div = document.createElement("div");
            div.innerHTML = "<p>A</p>A<!-- -->";
            return div.children && div.children.length === 1;
        } catch (e) {}
        return false;
    }())
) {
    module.exports = true;
} else {
    module.exports = false;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/getNodeId.js-=@*/
var nodeCache = require(104),
    getNodeAttributeId = require(163);


module.exports = getNodeId;


function getNodeId(node) {
    var id;

    if (node) {
        id = getNodeAttributeId(node);

        if (id) {
            nodeCache[id] = node;
        }
    }

    return id;
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/virt-dom@0.0.15/src/utils/getRootNodeInContainer.js-=@*/
module.exports = getRootNodeInContainer;


function getRootNodeInContainer(containerNode) {
    if (!containerNode) {
        return null;
    } else {
        if (containerNode.nodeType === 9) {
            return containerNode.documentElement;
        } else {
            return containerNode.firstChild;
        }
    }
}
},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/i18n@0.0.3/src/index.js-=@*/
var isNull = require(29),
    isArray = require(20),
    isString = require(21),
    isObject = require(22),
    format = require(217),
    flattenObject = require(218),
    fastSlice = require(150),
    has = require(25),
    defineProperty = require(54);


var EMPTY_ARRAY = [],
    translationCache = global.__I18N_TRANSLATIONS__;


if (!translationCache) {
    translationCache = {};
    defineProperty(global, "__I18N_TRANSLATIONS__", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: translationCache
    });
}


module.exports = create(false, false);


function create(throwMissingError, throwOverrideError) {

    throwMissingError = !!throwMissingError;
    throwOverrideError = !!throwOverrideError;


    function i18n(locale, key) {
        return i18n.translate(
            locale,
            key,
            arguments.length > 2 ? fastSlice(arguments, 2) : EMPTY_ARRAY
        );
    }

    i18n.create = create;

    i18n.translate = function(locale, key, args) {
        var translations = translationCache[locale] || null;

        if (isNull(translations)) {
            throw new Error(
                "i18n(key[, locale[, ...args]]) no translations for " +
                locale + " locale"
            );
        }
        if (!isString(key)) {
            throw new TypeError(
                "i18n(key[, locale[, ...args]]) key must be a String"
            );
        }

        return translate(key, translations, isArray(args) ? args : EMPTY_ARRAY);
    };

    i18n.throwMissingError = function(value) {
        throwMissingError = !!value;
    };
    i18n.throwOverrideError = function(value) {
        throwOverrideError = !!value;
    };

    i18n.has = function(locale, key) {
        if (has(translationCache[locale], key)) {
            return true;
        } else {
            return false;
        }
    };

    i18n.add = function(locale, object) {
        var translations = (
                translationCache[locale] ||
                (translationCache[locale] = {})
            ),
            localHas = has,
            key, value;

        if (isObject(object)) {
            value = flattenObject(object);

            for (key in value) {
                if (localHas(value, key)) {
                    if (localHas(translations, key)) {
                        if (throwOverrideError) {
                            throw new Error(
                                "i18n.add(locale, object) cannot override " +
                                locale + " translation with key " + key
                            );
                        }
                    } else {
                        translations[key] = value[key];
                    }
                }
            }
        } else {
            throw new TypeError(
                "i18n.add(locale, object) object must be an Object"
            );
        }
    };

    function missingTranslation(key) {
        if (throwMissingError) {
            throw new Error(
                "i18n(locale, key) missing translation for key " + key
            );
        } else {
            return "--" + key + "--";
        }
    }

    function translate(key, translations, args) {
        var value;

        if (has(translations, key)) {
            value = translations[key];
            return args.length !== 0 ? format.array(value, args) : value;
        } else {
            return missingTranslation(key);
        }
    }

    return i18n;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_regexp@0.0.1/src/index.js-=@*/
var isObject = require(22);


var objectToString = Object.prototype.toString;


module.exports = isRegExp;

/**
   isRegExp takes a value and returns true if the value is a RegExp.
   All other values return false

   @param {Any} any primitive or object
   @returns {Boolean}

   @example
     isRegExp(/regex/); // returns true
     isRegExp(null);    // returns false
     isRegExp({});      // returns false
*/
function isRegExp(value) {
    return (
        isObject(value) &&
        objectToString.call(value) === "[object RegExp]"
    ) || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/format@0.0.2/src/index.js-=@*/
var isString = require(21),
    isObject = require(22),
    isPrimitive = require(18),
    isArrayLike = require(56),
    isFunction = require(19),
    indexOf = require(57),
    fastSlice = require(150);


var reFormat = /%([a-z%])/g,
    toString = Object.prototype.toString;


module.exports = format;


function format(str) {
    return baseFormat(str, fastSlice(arguments, 1));
}

format.array = baseFormat;

function baseFormat(str, args) {
    var i = 0,
        length = args ? args.length : 0;

    return (isString(str) ? str + "" : "").replace(reFormat, function(match, s) {
        var value, formatter;

        if (match === "%%") {
            return "%";
        }
        if (i >= length) {
            return "";
        }

        formatter = format[s];
        value = args[i++];

        return value != null && isFunction(formatter) ? formatter(value) : "";
    });
}

format.s = function(value) {
    return String(value);
};

format.d = function(value) {
    return Number(value);
};

format.j = function(value) {
    try {
        return JSON.stringify(value);
    } catch (e) {
        return "[Circular]";
    }
};

function inspectObject(value, inspected, depth, maxDepth) {
    var out, i, il, keys, key;

    if (indexOf(inspected, value) !== -1) {
        return toString.call(value);
    }

    inspected[inspected.length] = value;

    if (isFunction(value) || depth >= maxDepth) {
        return toString.call(value);
    }

    if (isArrayLike(value) && value !== global) {
        depth++;
        out = [];

        i = -1;
        il = value.length - 1;
        while (i++ < il) {
            out[i] = inspect(value[i], inspected, depth, maxDepth);
        }

        return out;
    } else if (isObject(value)) {
        depth++;
        out = {};
        keys = utils.keys(value);

        i = -1;
        il = keys.length - 1;
        while (i++ < il) {
            key = keys[i];
            out[key] = inspect(value[key], inspected, depth, maxDepth);
        }

        return out;
    }

    return isFunction(value.toString) ? value.toString() : value + "";
}

function inspectPrimitive(value) {
    return isNumber(value) ? Number(value) : String(value);
}

function inspect(value, inspected, depth, maxDepth) {
    return isPrimitive(value) ? inspectPrimitive(value) : inspectObject(value, inspected, depth, maxDepth);
}

format.o = function(value) {
    try {
        return JSON.stringify(inspect(value, [], 0, 5), null, 2);
    } catch (e) {
        return "[Circular]";
    }
};

format.inspect = format.o;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/flatten_object@0.0.1/src/index.js-=@*/
var has = require(37),
    isObject = require(22);


module.exports = flattenObject;


function flattenObject(object) {
    if (isObject(object)) {
        return baseFlattenObject(object, {});
    } else {
        return object;
    }
}

function baseFlattenObject(object, out) {
    var localHas = has,
        key, value, k;

    for (key in object) {
        if (localHas(object, key)) {
            value = flattenObject(object[key]);

            if (isObject(value)) {
                for (k in value) {
                    if (localHas(value, k)) {
                        out[key + "." + k] = value[k];
                    }
                }
            } else {
                out[key] = value;
            }
        }
    }

    return out;
}

},
function(require, exports, module, undefined, global) {
/*@=-virt-ui-panel@0.0.1/src/Divider.js-=@*/
var virt = require(1),
    virtDOM = require(2),
    propTypes = require(3),
    domDimensions = require(94);


var DividerPrototype;


module.exports = Divider;


function Divider(props, children, context) {
    var _this = this;

    virt.Component.call(this, props, children, context);

    this.dragging = false;

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
    onDrag: propTypes.func.isRequired,
    panel: propTypes.object.isRequired
};

Divider.defaultProps = {
    x: 0,
    y: 0,
    vertical: false
};

DividerPrototype.getTheme = function() {
    return this.context.theme.styles.panel;
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
    var props = this.props;

    if (this.dragging) {
        if (props.vertical) {
            props.onDrag(e.pageX - domDimensions.left(virtDOM.findDOMNode(props.panel)));
        } else {
            props.onDrag(e.pageY - domDimensions.top(virtDOM.findDOMNode(props.panel)));
        }
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
        styles.root.cursor = styles.bar.cursor = styles.innerBar.cursor = "ew-resize";
        styles.innerBar.height = styles.bar.height = styles.root.height = "100%";
        styles.bar.width = styles.root.width = "9px";
        styles.innerBar.width = "1px";
        styles.innerBar.left = "4px";
    } else {
        styles.root.cursor = styles.bar.cursor = styles.innerBar.cursor = "ns-resize";
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

}], {}, void(0), (new Function("return this;"))()));

//# sourceMappingURL=index.js.map