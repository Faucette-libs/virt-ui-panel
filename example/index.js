(function(dependencies, chunks, undefined, global) {
    
    var cache = [];
    

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
        callback(require(index));
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
/* index.js */

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
    muiTheme: propTypes.object.isRequired,
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
        muiTheme: {
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
/* ../../node_modules/virt/src/index.js */

var View = require(5);


var virt = exports;


virt.Root = require(6);

virt.Component = require(7);

virt.View = View;
virt.cloneView = View.clone;
virt.createView = View.create;
virt.createFactory = View.createFactory;

virt.consts = require(8);

virt.getChildKey = require(9);
virt.getRootIdFromId = require(10);

virt.traverseAncestors = require(11);
virt.traverseDescendants = require(12);
virt.traverseTwoPhase = require(13);

virt.context = require(14);
virt.owner = require(15);


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/index.js */

var renderString = require(70),
    nativeDOMComponents = require(71),
    nativeDOMHandlers = require(72);


var virtDOM = exports;


virtDOM.virt = require(1);

virtDOM.addNativeComponent = function(type, constructor) {
    nativeDOMComponents[type] = constructor;
};
virtDOM.addNativeHandler = function(name, fn) {
    nativeDOMHandlers[name] = fn;
};

virtDOM.render = require(73);
virtDOM.unmount = require(74);

virtDOM.renderString = function(view, id) {
    return renderString(view, null, id || ".0");
};

virtDOM.findDOMNode = require(75);
virtDOM.findRoot = require(76);
virtDOM.findEventHandler = require(77);

virtDOM.createWorkerRender = require(78);
virtDOM.renderWorker = require(79);

virtDOM.createWebSocketRender = require(80);
virtDOM.renderWebSocket = require(81);


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/prop_types/src/index.js */

var i18n = require(178),
    isArray = require(18),
    isRegExp = require(179),
    isNullOrUndefined = require(21),
    emptyFunction = require(36),
    isFunction = require(17),
    has = require(23),
    indexOf = require(55);


var propTypes = exports,
    defaultLocale = "en";


i18n = i18n.create(true, true);


if (!i18n.has("en", "prop_types.anonymous")) {
    i18n.add("en", require(180));
}


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
/* ../../src/index.js */

var process = require(57);
var virt = require(1),
    clamp = require(183),
    propTypes = require(3),
    Divider = require(184);


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
    bottom: null
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

    this.setState({
        divider: clampDivider(divider, props)
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
            renderLeftChild = virt.createView(Panel, leftProps, leftChild);
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
            renderRightChild = virt.createView(Panel, rightProps, rightChild);
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
/* ../../node_modules/virt/src/View.js */

var isPrimitive = require(16),
    isFunction = require(17),
    isArray = require(18),
    isString = require(19),
    isObjectLike = require(20),
    isNullOrUndefined = require(21),
    isNumber = require(22),
    has = require(23),
    arrayMap = require(24),
    extend = require(25),
    propsToJSON = require(26),
    owner = require(15),
    context = require(14);


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
    var localHas = has,
        props = extend({}, view.props),
        key = view.key,
        ref = view.ref,
        viewOwner = view.__owner,
        childrenLength = arguments.length - 2,
        propName, childArray, i, il;

    if (config) {
        if (config.ref) {
            ref = config.ref;
            viewOwner = owner.current;
        }
        if (config.key) {
            key = config.key;
        }

        for (propName in config) {
            if (localHas(config, propName)) {
                if (!(propName === "key" || propName === "ref")) {
                    props[propName] = config[propName];
                }
            }
        }
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

    return new View(view.type, key, ref, props, ensureValidChildren(children), viewOwner, context.current);
};

View.create = function(type, config, children) {
    var isConfigArray = isArray(config),
        argumentsLength = arguments.length;

    if (isChild(config) || isConfigArray) {
        if (isConfigArray) {
            children = config;
        } else if (argumentsLength > 1) {
            children = extractChildren(arguments, 1);
        }
        config = null;
    } else if (children) {
        if (isArray(children)) {
            children = children;
        } else if (argumentsLength > 2) {
            children = extractChildren(arguments, 2);
        }
    }

    return construct(type, config, children);
};

View.createFactory = function(type) {
    return function factory(config, children) {
        var isConfigArray = isArray(config),
            argumentsLength = arguments.length;

        if (isChild(config) || isConfigArray) {
            if (isConfigArray) {
                children = config;
            } else if (config && argumentsLength > 0) {
                children = extractChildren(arguments, 0);
            }
            config = null;
        } else if (children) {
            if (isArray(children)) {
                children = children;
            } else if (argumentsLength > 1) {
                children = extractChildren(arguments, 1);
            }
        }

        return construct(type, config, children);
    };
};

function construct(type, config, children) {
    var localHas = has,
        props = {},
        key = null,
        ref = null,
        propName, defaultProps;

    if (config) {
        key = config.key != null ? config.key : null;
        ref = config.ref != null ? config.ref : null;

        for (propName in config) {
            if (localHas(config, propName)) {
                if (!(propName === "key" || propName === "ref")) {
                    props[propName] = config[propName];
                }
            }
        }
    }

    if (type && type.defaultProps) {
        defaultProps = type.defaultProps;

        for (propName in defaultProps) {
            if (localHas(defaultProps, propName)) {
                if (isNullOrUndefined(props[propName])) {
                    props[propName] = defaultProps[propName];
                }
            }
        }
    }

    return new View(type, key, ref, props, ensureValidChildren(children), owner.current, context.current);
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
    return isObjectLike(obj) && obj.__View__ === true;
}

function isViewComponent(obj) {
    return isView(obj) && isFunction(obj.type);
}

function isViewJSON(obj) {
    return (
        isObjectLike(obj) &&
        isString(obj.type) &&
        isObjectLike(obj.props) &&
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
    var i, il;

    if (isArray(children)) {
        i = -1;
        il = children.length - 1;

        while (i++ < il) {
            if (!isChild(children[i])) {
                throw new TypeError("child of a View must be a String, Number or a View");
            }
        }
    } else {
        children = [];
    }

    return children;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/Root.js */

var isFunction = require(17),
    isNull = require(27),
    isUndefined = require(28),
    emptyFunction = require(36),
    Transaction = require(37),
    diffProps = require(38),
    shouldUpdate = require(39),
    EventManager = require(40),
    Node = require(41);


var RootPrototype,
    ROOT_ID = 0;


module.exports = Root;


function Root() {

    this.id = "." + (ROOT_ID++).toString(36);
    this.childHash = {};

    this.eventManager = new EventManager();

    this.nativeComponents = {};
    this.diffProps = diffProps;
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

    if (isUndefined(childHash[id])) {
        node.root = this;
        childHash[id] = node;
    } else {
        throw new Error("Root appendNode(node) trying to override node at " + id);
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
            transactions.splice(0, 1);
            transactionCallbacks.splice(0, 1);

            transaction.queue.notifyAll();
            transaction.destroy();

            _this.__currentTransaction = null;

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

RootPrototype.update = function(node, callback) {
    var transaction = Transaction.create();

    node.update(node.currentView, transaction);

    this.__enqueueTransaction(transaction, callback);
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

            node.update(nextView, transaction);
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

    node = new Node(this.id, id, nextView);
    this.appendNode(node);
    node.mount(transaction);

    this.__enqueueTransaction(transaction, callback);

    return this;
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/Component.js */

var inherits = require(63),
    extend = require(25),
    componentState = require(58);


var ComponentPrototype;


module.exports = Component;


function Component(props, children, context) {
    this.__node = null;
    this.__mountState = componentState.UNMOUNTED;
    this.__nextState = null;
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

ComponentPrototype.displayName = "Component";

ComponentPrototype.render = function() {
    throw new Error("render() render must be defined on Components");
};

ComponentPrototype.setState = function(state, callback) {
    var node = this.__node;

    this.__nextState = extend({}, this.state, state);

    if (this.__mountState === componentState.MOUNTED) {
        node.root.update(node, callback);
    }
};

ComponentPrototype.forceUpdate = function(callback) {
    var node = this.__node;

    if (this.__mountState === componentState.MOUNTED) {
        node.root.update(node, callback);
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
/* ../../node_modules/virt/src/Transaction/consts.js */

var keyMirror = require(53);


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
/* ../../node_modules/virt/src/utils/getChildKey.js */

var getViewKey = require(66);


module.exports = getChildKey;


function getChildKey(parentId, child, index) {
    return parentId + "." + getViewKey(child, index);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/utils/getRootIdFromId.js */

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
/* ../../node_modules/virt/src/utils/traverseAncestors.js */

var traversePath = require(67);


module.exports = traverseAncestors;


function traverseAncestors(id, callback) {
    traversePath("", id, callback, true, false);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/utils/traverseDescendants.js */

var traversePath = require(67);


module.exports = traverseDescendant;


function traverseDescendant(id, callback) {
    traversePath(id, "", callback, false, true);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/utils/traverseTwoPhase.js */

var traversePath = require(67);


module.exports = traverseTwoPhase;


function traverseTwoPhase(id, callback) {
    if (id) {
        traversePath("", id, callback, true, false);
        traversePath(id, "", callback, false, true);
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/context.js */

var context = exports;


context.current = null;


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/owner.js */

var owner = exports;


owner.current = null;


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/is_primitive/src/index.js */

var isNullOrUndefined = require(21);


module.exports = isPrimitive;


function isPrimitive(obj) {
    var typeStr;
    return isNullOrUndefined(obj) || ((typeStr = typeof(obj)) !== "object" && typeStr !== "function") || false;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/is_function/src/index.js */

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
/* ../../node_modules/virt/node_modules/is_array/src/index.js */

var isNative = require(29),
    isLength = require(30),
    isObject = require(31);


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
/* ../../node_modules/virt/node_modules/is_string/src/index.js */

module.exports = isString;


function isString(value) {
    return typeof(value) === "string" || false;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/is_object_like/src/index.js */

var isNullOrUndefined = require(21);


module.exports = isObjectLike;


function isObjectLike(value) {
    return (!isNullOrUndefined(value) && typeof(value) === "object") || false;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/is_null_or_undefined/src/index.js */

var isNull = require(27),
    isUndefined = require(28);


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
/* ../../node_modules/virt/node_modules/is_number/src/index.js */

module.exports = isNumber;


function isNumber(value) {
    return typeof(value) === "number" || false;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/has/src/index.js */

var isNative = require(29),
    getPrototypeOf = require(34),
    isNullOrUndefined = require(21);


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
        return nativeHasOwnProp.call(object, key);
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
/* ../../node_modules/virt/node_modules/array-map/src/index.js */

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
/* ../../node_modules/virt/node_modules/extend/src/index.js */

var keys = require(35);


module.exports = extend;


function extend(out) {
    var i = 0,
        il = arguments.length - 1;

    while (i++ < il) {
        baseExtend(out, arguments[i]);
    }

    return out;
}

function baseExtend(a, b) {
    var objectKeys = keys(b),
        i = -1,
        il = objectKeys.length - 1,
        key;

    while (i++ < il) {
        key = objectKeys[i];
        a[key] = b[key];
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/utils/propsToJSON.js */

var has = require(23),
    isNull = require(27),
    isPrimitive = require(16);


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
/* ../../node_modules/virt/node_modules/is_null/src/index.js */

module.exports = isNull;


function isNull(value) {
    return value === null;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/is_undefined/src/index.js */

module.exports = isUndefined;


function isUndefined(value) {
    return value === void(0);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/is_native/src/index.js */

var isFunction = require(17),
    isNullOrUndefined = require(21),
    escapeRegExp = require(32);


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
/* ../../node_modules/virt/node_modules/is_length/src/index.js */

var isNumber = require(22);


var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;


module.exports = isLength;


function isLength(value) {
    return isNumber(value) && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/is_object/src/index.js */

var isNull = require(27);


module.exports = isObject;


function isObject(value) {
    var type = typeof(value);
    return type === "function" || (!isNull(value) && type === "object") || false;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/escape_regexp/src/index.js */

var toString = require(33);


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
/* ../../node_modules/virt/node_modules/to_string/src/index.js */

var isString = require(19),
    isNullOrUndefined = require(21);


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
/* ../../node_modules/virt/node_modules/get_prototype_of/src/index.js */

var isObject = require(31),
    isNative = require(29),
    isNullOrUndefined = require(21);


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
/* ../../node_modules/virt/node_modules/keys/src/index.js */

var has = require(23),
    isNative = require(29),
    isNullOrUndefined = require(21),
    isObject = require(31);


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
    nativeKeys = function(value) {
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
/* ../../node_modules/virt/node_modules/empty_function/src/index.js */

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
/* ../../node_modules/virt/src/Transaction/index.js */

var createPool = require(42),
    Queue = require(43),
    has = require(23),
    consts = require(8),
    InsertPatch = require(44),
    MountPatch = require(45),
    UnmountPatch = require(46),
    OrderPatch = require(47),
    PropsPatch = require(48),
    RemovePatch = require(49),
    ReplacePatch = require(50),
    TextPatch = require(51);


var TransactionPrototype;


module.exports = Transaction;


function Transaction() {

    this.queue = Queue.getPooled();

    this.removes = {};
    this.patches = {};

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

function clearPatches(hash) {
    var localHas = has,
        id, array, j, jl;

    for (id in hash) {
        if (localHas(hash, id)) {
            array = hash[id];
            j = -1;
            jl = array.length - 1;

            while (j++ < jl) {
                array[j].destroy();
            }

            delete hash[id];
        }
    }
}

function clearHash(hash) {
    var localHas = has,
        id;

    for (id in hash) {
        if (localHas(hash, id)) {
            delete hash[id];
        }
    }
}

TransactionPrototype.destructor = function() {
    clearPatches(this.patches);
    clearPatches(this.removes);
    clearHash(this.events);
    clearHash(this.eventsRemove);
    return this;
};

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

function append(hash, value) {
    var id = value.id,
        patchArray = hash[id] || (hash[id] = []);

    patchArray[patchArray.length] = value;
}

TransactionPrototype.append = function(value) {
    append(this.patches, value);
};

TransactionPrototype.appendRemove = function(value) {
    append(this.removes, value);
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
/* ../../node_modules/virt/src/utils/diffProps.js */

var has = require(23),
    isObject = require(31),
    getPrototypeOf = require(34),
    isNull = require(27),
    isNullOrUndefined = require(21);


module.exports = diffProps;


function diffProps(id, eventManager, transaction, previous, next) {
    var result = null,
        localHas = has,
        propNameToTopLevel = eventManager.propNameToTopLevel,
        key, previousValue, nextValue, propsDiff;

    for (key in previous) {
        nextValue = next[key];

        if (isNullOrUndefined(nextValue)) {
            result = result || {};
            result[key] = undefined;

            if (localHas(propNameToTopLevel, key)) {
                eventManager.off(id, propNameToTopLevel[key], transaction);
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

            if (localHas(propNameToTopLevel, key)) {
                eventManager.on(id, propNameToTopLevel[key], nextValue, transaction);
            }
        }
    }

    return result;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/utils/shouldUpdate.js */

var isString = require(19),
    isNumber = require(22),
    isNullOrUndefined = require(21);


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
/* ../../node_modules/virt/src/EventManager.js */

var indexOf = require(55),
    isUndefined = require(28);


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
/* ../../node_modules/virt/src/Node.js */

var process = require(57);
var has = require(23),
    arrayMap = require(24),
    indexOf = require(55),
    isNull = require(27),
    isString = require(19),
    isArray = require(18),
    isFunction = require(17),
    extend = require(25),
    owner = require(15),
    context = require(14),
    shouldUpdate = require(39),
    componentState = require(58),
    getComponentClassForType = require(59),
    View = require(5),
    getChildKey = require(9),
    emptyObject = require(60),
    diffChildren;


var NodePrototype,
    isPrimitiveView = View.isPrimitiveView;


module.exports = Node;


diffChildren = require(61);


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

NodePrototype = Node.prototype;

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
    var component, renderedView, renderedNode;

    this.context = context.current;
    this.mountComponent();

    renderedView = this.renderView();

    if (this.isTopLevel !== true) {
        renderedNode = this.renderedNode = new Node(this.parentId, this.id, renderedView);
        renderedNode.root = this.root;
        renderedNode.isBottomLevel = false;
        renderedView = renderedNode.__mount(transaction);
    } else {
        mountEvents(this.id, renderedView.props, this.root.eventManager, transaction);
        this.__mountChildren(renderedView, transaction);
    }

    component = this.component;
    component.__mountState = componentState.MOUNTING;
    component.componentWillMount();

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
        renderedChildren = [];

    this.renderedChildren = renderedChildren;

    renderedView.children = arrayMap(renderedView.children, function(child, index) {
        var node, id;

        if (isPrimitiveView(child)) {
            return child;
        } else {
            id = getChildKey(parentId, child, index);
            node = new Node(parentId, id, child);
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
        this.renderedChildren = null;
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

NodePrototype.update = function(nextView, transaction) {
    this.receiveView(nextView, nextView.__context, transaction);
};

NodePrototype.receiveView = function(nextView, nextContext, transaction) {
    var prevView = this.currentView,
        prevContext = this.context;

    this.updateComponent(
        prevView,
        nextView,
        prevContext,
        nextContext,
        transaction
    );
};

NodePrototype.updateComponent = function(
    prevParentView, nextParentView, prevUnmaskedContext, nextUnmaskedContext, transaction
) {
    var component = this.component,

        nextProps = component.props,
        nextChildren = component.children,
        nextContext = component.context,

        nextState;

    component.__mountState = componentState.UPDATING;

    if (prevParentView !== nextParentView) {
        nextProps = this.__processProps(nextParentView.props);
        nextChildren = nextParentView.children;
        nextContext = this.__processContext(nextParentView.__context);

        if (component.componentWillReceiveProps) {
            component.componentWillReceiveProps(nextProps, nextChildren, nextContext);
        }
    }

    nextState = component.__nextState || component.state;

    if (component.shouldComponentUpdate ? component.shouldComponentUpdate(nextProps, nextChildren, nextState, nextContext) : true) {
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
        component.__mountState = componentState.UPDATED;
        if (component.componentDidUpdate) {
            component.componentDidUpdate(prevProps, prevChildren, prevState, prevContext);
        }
        component.__mountState = componentState.MOUNTED;
    });
};

NodePrototype.__updateRenderedNode = function(context, transaction) {
    var prevNode = this.renderedNode,
        prevRenderedView = prevNode.currentView,
        nextRenderedView = this.renderView(),
        renderedNode;

    if (shouldUpdate(prevRenderedView, nextRenderedView)) {
        prevNode.receiveView(nextRenderedView, this.__processChildContext(context), transaction);
    } else {
        prevNode.__unmount(transaction);

        renderedNode = this.renderedNode = new Node(this.parentId, this.id, nextRenderedView);
        renderedNode.root = this.root;
        renderedNode.isBottomLevel = false;

        transaction.replace(this.parentId, this.id, 0, renderedNode.__mount(transaction));
    }

    this.__attachRefs();
};

NodePrototype.__updateRenderedView = function(prevRenderedView, context, transaction) {
    var id = this.id,
        root = this.root,
        nextRenderedView = this.renderView(),
        propsDiff = root.diffProps(id, root.eventManager, transaction, prevRenderedView.props, nextRenderedView.props);

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
    var ComponentClass = this.ComponentClass,
        propTypes;

    if (process.env.NODE_ENV !== "production") {
        propTypes = ComponentClass.propTypes;

        if (propTypes) {
            this.__checkTypes(propTypes, props);
        }
    }

    return props;
};

NodePrototype.__maskContext = function(context) {
    var maskedContext = null,
        contextTypes, contextName, localHas;

    if (isString(this.ComponentClass)) {
        return emptyObject;
    } else {
        contextTypes = this.ComponentClass.contextTypes;

        if (contextTypes) {
            maskedContext = {};
            localHas = has;

            for (contextName in contextTypes) {
                if (localHas(contextTypes, contextName)) {
                    maskedContext[contextName] = context[contextName];
                }
            }
        }

        return maskedContext;
    }
};

NodePrototype.__processContext = function(context) {
    var maskedContext = this.__maskContext(context),
        contextTypes;

    if (process.env.NODE_ENV !== "production") {
        contextTypes = this.ComponentClass.contextTypes;

        if (contextTypes) {
            this.__checkTypes(contextTypes, maskedContext);
        }
    }

    return maskedContext;
};

NodePrototype.__processChildContext = function(currentContext) {
    var component = this.component,
        childContext = isFunction(component.getChildContext) ? component.getChildContext() : null,
        childContextTypes, localHas, contextName, displayName;

    if (childContext) {
        childContextTypes = this.ComponentClass.childContextTypes;

        if (process.env.NODE_ENV !== "production") {
            if (childContextTypes) {
                this.__checkTypes(childContextTypes, childContext);
            }
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
/* ../../node_modules/virt/node_modules/create_pool/src/index.js */

var isFunction = require(17),
    isNumber = require(22),
    defineProperty = require(52);


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
/* ../../node_modules/virt/node_modules/queue/src/index.js */

var createPool = require(42);


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
/* ../../node_modules/virt/src/Transaction/InsertPatch.js */

var createPool = require(42),
    consts = require(8);


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
/* ../../node_modules/virt/src/Transaction/MountPatch.js */

var createPool = require(42),
    consts = require(8);


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
/* ../../node_modules/virt/src/Transaction/UnmountPatch.js */

var createPool = require(42),
    consts = require(8);


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
/* ../../node_modules/virt/src/Transaction/OrderPatch.js */

var createPool = require(42),
    consts = require(8);


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
/* ../../node_modules/virt/src/Transaction/PropsPatch.js */

var createPool = require(42),
    consts = require(8);


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
/* ../../node_modules/virt/src/Transaction/RemovePatch.js */

var createPool = require(42),
    consts = require(8);


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
/* ../../node_modules/virt/src/Transaction/ReplacePatch.js */

var createPool = require(42),
    consts = require(8);


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
/* ../../node_modules/virt/src/Transaction/TextPatch.js */

var createPool = require(42),
    propsToJSON = require(26),
    consts = require(8);


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
/* ../../node_modules/virt/node_modules/define_property/src/index.js */

var isObject = require(31),
    isFunction = require(17),
    isPrimitive = require(16),
    isNative = require(29),
    has = require(23);


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
/* ../../node_modules/virt/node_modules/key_mirror/src/index.js */

var keys = require(35),
    isArrayLike = require(54);


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
/* ../../node_modules/virt/node_modules/is_array_like/src/index.js */

var isLength = require(30),
    isFunction = require(17),
    isObject = require(31);


module.exports = isArrayLike;


function isArrayLike(value) {
    return !isFunction(value) && isObject(value) && isLength(value.length);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/index_of/src/index.js */

var isEqual = require(56);


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
/* ../../node_modules/virt/node_modules/is_equal/src/index.js */

module.exports = isEqual;


function isEqual(a, b) {
    return !(a !== b && !(a !== a && b !== b));
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/process/browser.js */

// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
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
    var timeout = setTimeout(cleanUpNextTick);
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
    clearTimeout(timeout);
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
        setTimeout(drainQueue, 0);
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
/* ../../node_modules/virt/src/utils/componentState.js */

var keyMirror = require(53);


module.exports = keyMirror([
    "MOUNTING",
    "MOUNTED",
    "UPDATING",
    "UPDATED",
    "UNMOUNTING",
    "UNMOUNTED"
]);


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/utils/getComponentClassForType.js */

var createNativeComponentForType = require(62);


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
/* ../../node_modules/virt/src/utils/emptyObject.js */




},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/utils/diffChildren.js */

var isNull = require(27),
    isUndefined = require(28),
    isNullOrUndefined = require(21),
    getChildKey = require(9),
    shouldUpdate = require(39),
    View = require(5),
    Node;


var isPrimitiveView = View.isPrimitiveView;


module.exports = diffChildren;


Node = require(41);


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
                node = new Node(parentId, id, nextChild);
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
                node = new Node(parentId, id, nextChild);
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
                        node.update(nextChild, transaction);
                    } else {
                        node.__unmount(transaction);
                        parentNode.removeNode(node);

                        id = getChildKey(parentId, nextChild, index);
                        node = new Node(parentId, id, nextChild);
                        parentNode.appendNode(node);
                        transaction.replace(parentId, id, index, node.__mount(transaction));
                    }
                } else {
                    id = getChildKey(parentId, nextChild, index);
                    node = new Node(parentId, id, nextChild);
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
/* ../../node_modules/virt/src/utils/createNativeComponentForType.js */

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
/* ../../node_modules/virt/node_modules/inherits/src/index.js */

var create = require(64),
    extend = require(25),
    mixin = require(65),
    defineProperty = require(52);


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
/* ../../node_modules/virt/node_modules/create/src/index.js */

var isNull = require(27),
    isNative = require(29),
    isPrimitive = require(16);


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


module.exports = create;


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/node_modules/mixin/src/index.js */

var keys = require(35),
    isNullOrUndefined = require(21);


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
/* ../../node_modules/virt/src/utils/getViewKey.js */

var isNullOrUndefined = require(21);


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
/* ../../node_modules/virt/src/utils/traversePath.js */

var isBoundary = require(68),
    isAncestorIdOf = require(69);


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
/* ../../node_modules/virt/src/utils/isBoundary.js */

module.exports = isBoundary;


function isBoundary(id, index) {
    return id.charAt(index) === "." || index === id.length;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt/src/utils/isAncestorIdOf.js */

var isBoundary = require(68);


module.exports = isAncestorIdOf;


function isAncestorIdOf(ancestorID, descendantID) {
    return (
        descendantID.indexOf(ancestorID) === 0 &&
        isBoundary(descendantID, ancestorID.length)
    );
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/renderString.js */

var virt = require(1),

    isFunction = require(17),
    isString = require(19),
    isObject = require(31),
    isNullOrUndefined = require(21),

    hyphenateStyleName = require(82),
    renderMarkup = require(83),
    DOM_ID_NAME = require(84);


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


var renderChildrenString = require(85);


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
        (isString(content) ? content : "") +
        "</" + type + ">"
    );
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/nativeDOM/components.js */

var components = exports;


components.button = require(87);
components.img = require(88);
components.input = require(89);
components.textarea = require(90);


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/nativeDOM/handlers.js */

var extend = require(25);


var handlers = extend({},
    require(91),
    require(92),
    require(93),
    require(94)
);


module.exports = handlers;


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/render.js */

var virt = require(1),
    isNull = require(27),
    isUndefined = require(28),
    Adapter = require(114),
    rootsById = require(115),
    getRootNodeId = require(116);


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
/* ../../node_modules/virt-dom/src/unmount.js */

var rootsById = require(115),
    getRootNodeInContainer = require(173),
    getNodeId = require(172);


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
/* ../../node_modules/virt-dom/src/utils/findDOMNode.js */

var isString = require(19),
    getNodeById = require(104);


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
/* ../../node_modules/virt-dom/src/utils/findRoot.js */

var virt = require(1),
    isString = require(19),
    rootsById = require(115);


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
/* ../../node_modules/virt-dom/src/utils/findEventHandler.js */

var virt = require(1),
    isString = require(19),
    eventHandlersById = require(113);


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
/* ../../node_modules/virt-dom/src/worker/createWorkerRender.js */

var Messenger = require(117),
    isNull = require(27),
    MessengerWorkerAdapter = require(174),
    eventHandlersById = require(113),
    nativeDOMHandlers = require(72),
    eventHandlersById = require(113),
    getRootNodeId = require(116),
    registerNativeComponentHandlers = require(121),
    getWindow = require(119),
    EventHandler = require(122),
    applyEvents = require(124),
    applyPatches = require(125);


module.exports = createWorkerRender;


function createWorkerRender(url, containerDOMNode) {
    var document = containerDOMNode.ownerDocument,
        window = getWindow(document),

        messenger = new Messenger(new MessengerWorkerAdapter(url)),

        eventHandler = new EventHandler(messenger, document, window, false),

        rootId = null;

    messenger.on("virt.handleTransaction", function handleTransaction(transaction, callback) {

        applyPatches(transaction.patches, containerDOMNode, document);
        applyEvents(transaction.events, eventHandler);
        applyPatches(transaction.removes, containerDOMNode, document);

        if (isNull(rootId)) {
            rootId = getRootNodeId(containerDOMNode);
            eventHandlersById[rootId] = eventHandler;
        }

        callback();
    });

    messenger.on("virt.getDeviceDimensions", function getDeviceDimensions(data, callback) {
        callback(undefined, eventHandler.getDimensions());
    });

    messenger.on("virt.onGlobalEvent", function onHandle(topLevelType, callback) {
        eventHandler.listenTo("global", topLevelType);
        callback();
    });
    messenger.on("virt.offGlobalEvent", function onHandle(topLevelType, callback) {
        callback();
    });

    registerNativeComponentHandlers(messenger, nativeDOMHandlers);

    return messenger;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/worker/renderWorker.js */

var virt = require(1),
    isNull = require(27),
    rootsById = require(115),
    WorkerAdapter = require(175);


var root = null;


module.exports = render;


function render(nextView, callback) {
    if (isNull(root)) {
        root = new virt.Root();
        root.adapter = new WorkerAdapter(root);
        rootsById[root.id] = root;
    }

    root.render(nextView, callback);
}

render.unmount = function() {
    if (!isNull(root)) {
        delete rootsById[root.id];
        root.unmount();
        root = null;
    }
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/websocket/createWebSocketRender.js */

var Messenger = require(117),
    isNull = require(27),
    MessengerWebSocketAdapter = require(176),
    eventHandlersById = require(113),
    getRootNodeId = require(116),
    nativeDOMHandlers = require(72),
    registerNativeComponentHandlers = require(121),
    getWindow = require(119),
    EventHandler = require(122),
    applyEvents = require(124),
    applyPatches = require(125);


module.exports = createWebSocketRender;


function createWebSocketRender(containerDOMNode, socket, attachMessage, sendMessage) {
    var document = containerDOMNode.ownerDocument,
        window = getWindow(document),

        messenger = new Messenger(new MessengerWebSocketAdapter(socket, attachMessage, sendMessage)),

        eventHandler = new EventHandler(messenger, document, window, false),

        rootId = null;

    messenger.on("virt.handleTransaction", function handleTransaction(transaction, callback) {

        applyPatches(transaction.patches, containerDOMNode, document);
        applyEvents(transaction.events, eventHandler);
        applyPatches(transaction.removes, containerDOMNode, document);

        if (isNull(rootId)) {
            rootId = getRootNodeId(containerDOMNode);
            eventHandlersById[rootId] = eventHandler;
        }

        callback();
    });

    messenger.on("virt.getDeviceDimensions", function getDeviceDimensions(data, callback) {
        callback(undefined, eventHandler.getDimensions());
    });

    messenger.on("virt.onGlobalEvent", function onHandle(topLevelType, callback) {
        eventHandler.listenTo("global", topLevelType);
        callback();
    });
    messenger.on("virt.offGlobalEvent", function onHandle(topLevelType, callback) {
        callback();
    });

    registerNativeComponentHandlers(messenger, nativeDOMHandlers);

    return messenger;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/websocket/renderWebSocket.js */

var virt = require(1),
    rootsById = require(115),
    WebSocketAdapter = require(177);


module.exports = render;


function render(nextView, socket, attachMessage, sendMessage, callback) {
    var root = new virt.Root();
    root.adapter = new WebSocketAdapter(root, socket, attachMessage, sendMessage);
    rootsById[root.id] = root;
    root.render(nextView, callback);
    return root;
}

render.unmount = function(root) {
    if (root && rootsById[root.id]) {
        delete rootsById[root.id];
        root.unmount();
        root = null;
    }
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/hyphenateStyleName.js */

var reUppercasePattern = /([A-Z])/g,
    reMS = /^ms-/;


module.exports = hyphenateStyleName;


function hyphenateStyleName(str) {
    return str.replace(reUppercasePattern, "-$1").toLowerCase().replace(reMS, "-ms-");
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/renderMarkup.js */

var escapeTextContent = require(86);


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
/* ../../node_modules/virt-dom/src/DOM_ID_NAME.js */

module.exports = "data-virtid";


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/renderChildrenString.js */

var virt = require(1);


var getChildKey = virt.getChildKey;


module.exports = renderChildrenString;


var renderString = require(70);


function renderChildrenString(children, parentProps, id) {
    var out = "",
        i = -1,
        il = children.length - 1,
        child;

    while (i++ < il) {
        child = children[i];
        out += renderString(child, parentProps, getChildKey(id, child, i));
    }

    return out;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/escape_text_content/src/index.js */

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
/* ../../node_modules/virt-dom/src/nativeDOM/Button.js */

var virt = require(1),
    indexOf = require(55),
    has = require(23);


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
/* ../../node_modules/virt-dom/src/nativeDOM/Image.js */

var process = require(57);
var virt = require(1),
    has = require(23),
    emptyFunction = require(36);


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

    this.__originalProps = props;
    this.__hasEvents = !!(props.onLoad || props.onError);
}
Component.extend(Image, "img");
ImagePrototype = Image.prototype;

ImagePrototype.componentDidMount = function() {
    this.emitMessage("virt.dom.Image.mount", {
        id: this.getInternalId(),
        src: this.__originalProps.src
    });
};

ImagePrototype.componentWillReceiveProps = function(nextProps) {
    Image_onProps(this, nextProps);
};

ImagePrototype.componentDidUpdate = function() {

    Image_onProps(this, this.__originalProps);

    this.emitMessage("virt.dom.Image.setSrc", {
        id: this.getInternalId(),
        src: this.__originalProps.src
    });
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
/* ../../node_modules/virt-dom/src/nativeDOM/Input.js */

var process = require(57);
var virt = require(1),
    has = require(23),
    isFunction = require(17),
    isNullOrUndefined = require(21);


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
    this.setValue = function(value, callback) {
        return _this.__setValue(value, callback);
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
    if (this.props.autoFocus) {
        this.__focus();
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
    this.__onChange(e, true);
};

InputPrototype.__onChange = function(e, fromInput) {
    var props = this.props;

    if (fromInput && props.onInput) {
        props.onInput(e);
    }
    if (props.onChange) {
        props.onChange(e);
    }

    this.forceUpdate();
};

InputPrototype.__setChecked = function(checked, callback) {
    this.emitMessage("virt.dom.Input.setChecked", {
        id: this.getInternalId(),
        checked: !!checked
    }, callback);
};

InputPrototype.__getValue = function(callback) {
    this.emitMessage("virt.dom.Input.getValue", {
        id: this.getInternalId()
    }, callback);
};

InputPrototype.__setValue = function(value, callback) {
    this.emitMessage("virt.dom.Input.setValue", {
        id: this.getInternalId(),
        value: value
    }, callback);
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
/* ../../node_modules/virt-dom/src/nativeDOM/TextArea.js */

var process = require(57);
var virt = require(1),
    has = require(23),
    isFunction = require(17);


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
    this.setValue = function(value, callback) {
        return _this.__setValue(value, callback);
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

TextAreaPrototype.__setValue = function(value, callback) {
    this.emitMessage("virt.dom.TextArea.setValue", {
        id: this.getInternalId(),
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
/* ../../node_modules/virt-dom/src/nativeDOM/buttonHandlers.js */

var sharedHandlers = require(95);


var buttonHandlers = exports;


buttonHandlers["virt.dom.Button.focus"] = sharedHandlers.focus;
buttonHandlers["virt.dom.Button.blur"] = sharedHandlers.blur;


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/nativeDOM/imageHandlers.js */

var consts = require(106),
    findEventHandler = require(77),
    findDOMNode = require(75);


var topLevelTypes = consts.topLevelTypes,
    topLevelToEvent = consts.topLevelToEvent,
    GLOBAL_IMAGE = typeof(Image) !== "undefined" ? new Image() : {},
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
        callback(new Error("events(data, callback): No DOM node found with id " + data.id));
    }
};

imageHandlers["virt.dom.Image.setSrc"] = function(data, callback) {
    var id = data.id,
        node = findDOMNode(id),
        localImage = GLOBAL_IMAGE,
        src;

    if (node) {
        src = data.src;
        localImage.src = src;
        originalSrc = localImage.src;

        if (src !== originalSrc) {
            node.src = src;
        }

        callback();
    } else {
        callback(new Error("events(data, callback): No DOM node found with id " + data.id));
    }
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/nativeDOM/inputHandlers.js */

var findDOMNode = require(75),
    sharedHandlers = require(95);


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
        } else {
            node.removeAttribute("checked");
        }
        callback();
    } else {
        callback(new Error("setChecked(value, callback): No DOM node found with id " + data.id));
    }
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/nativeDOM/textareaHandlers.js */

var sharedHandlers = require(95);


var textareaHandlers = exports;


textareaHandlers["virt.dom.TextArea.getValue"] = sharedHandlers.getValue;
textareaHandlers["virt.dom.TextArea.setValue"] = sharedHandlers.setValue;
textareaHandlers["virt.dom.TextArea.getSelection"] = sharedHandlers.getSelection;
textareaHandlers["virt.dom.TextArea.setSelection"] = sharedHandlers.setSelection;
textareaHandlers["virt.dom.TextArea.focus"] = sharedHandlers.focus;
textareaHandlers["virt.dom.TextArea.blur"] = sharedHandlers.blur;


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/nativeDOM/sharedHandlers.js */

var domCaret = require(96),
    blurNode = require(97),
    focusNode = require(98),
    findDOMNode = require(75);


var sharedInputHandlers = exports;


sharedInputHandlers.getValue = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, node.value);
    } else {
        callback(new Error("getValue(callback): No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.setValue = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        node.value = data.value || "";
        callback();
    } else {
        callback(new Error("setValue(data, callback): No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.getSelection = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        callback(undefined, domCaret.get(node));
    } else {
        callback(new Error("getSelection(callback): No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.setSelection = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        domCaret.set(node, data.start, data.end);
        callback();
    } else {
        callback(new Error("setSelection(data, callback): No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.focus = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        focusNode(node);
        callback();
    } else {
        callback(new Error("focus(callback): No DOM node found with id " + data.id));
    }
};

sharedInputHandlers.blur = function(data, callback) {
    var node = findDOMNode(data.id);

    if (node) {
        blurNode(node);
        callback();
    } else {
        callback(new Error("blur(callback): No DOM node found with id " + data.id));
    }
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/dom_caret/src/index.js */

var environment = require(99),
    focusNode = require(98),
    blurNode = require(97),
    getActiveElement = require(100),
    isTextInputElement = require(101);


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
            blurNode(node);
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
    if (isTextInputElement(node)) {
        if (getActiveElement() !== node) {
            focusNode(node);
        }
        setNodeCaretPosition(node, start, end === undefined ? start : end);
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
        var range = document.selection.createRange();
        range.moveStart("character", -node.value.length);
        return range.text.length;
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
/* ../../node_modules/virt-dom/node_modules/blur_node/src/index.js */

var isNode = require(102);


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
/* ../../node_modules/virt-dom/node_modules/focus_node/src/index.js */

var isNode = require(102);


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
/* ../../node_modules/virt-dom/node_modules/environment/src/index.js */

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
/* ../../node_modules/virt-dom/node_modules/get_active_element/src/index.js */

var isDocument = require(103),
    environment = require(99);


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
/* ../../node_modules/virt-dom/node_modules/is_text_input_element/src/index.js */

var isNullOrUndefined = require(21);


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
/* ../../node_modules/virt-dom/node_modules/is_node/src/index.js */

var isString = require(19),
    isNullOrUndefined = require(21),
    isNumber = require(22),
    isFunction = require(17);


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
/* ../../node_modules/virt-dom/node_modules/is_document/src/index.js */

var isNode = require(102);


module.exports = isDocument;


function isDocument(value) {
    return isNode(value) && value.nodeType === 9;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/getNodeById.js */

var nodeCache = require(105);


module.exports = getNodeById;


function getNodeById(id) {
    return nodeCache[id];
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/nodeCache.js */




},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/consts.js */

var map = require(107),
    forEach = require(108),
    keyMirror = require(53);


var consts = exports,

    topLevelToEvent = consts.topLevelToEvent = {},
    propNameToTopLevel = consts.propNameToTopLevel = {},

    eventTypes = [
        "topBlur",
        "topChange",
        "topClick",
        "topCompositionEnd",
        "topCompositionStart",
        "topCompositionUpdate",
        "topContextMenu",
        "topCopy",
        "topCut",
        "topDoubleClick",
        "topDrag",
        "topDragEnd",
        "topDragEnter",
        "topDragExit",
        "topDragLeave",
        "topDragOver",
        "topDragStart",
        "topDrop",
        "topError",
        "topFocus",
        "topInput",
        "topKeyDown",
        "topKeyPress",
        "topKeyUp",
        "topLoad",
        "topMouseDown",
        "topMouseMove",
        "topMouseOut",
        "topMouseOver",
        "topMouseEnter",
        "topMouseUp",
        "topOrientationChange",
        "topPaste",
        "topReset",
        "topResize",
        "topScroll",
        "topSelectionChange",
        "topSubmit",
        "topTextInput",
        "topTouchCancel",
        "topTouchEnd",
        "topTouchMove",
        "topTouchStart",
        "topWheel",
        "topRateChange",
        "topScroll",
        "topSeeked",
        "topSeeking",
        "topSelectionChange",
        "topStalled",
        "topSuspend",
        "topTextInput",
        "topTimeUpdate",
        "topTouchCancel",
        "topTouchEnd",
        "topTouchMove",
        "topTouchStart",
        "topVolumeChange",
        "topWaiting",
        "topWheel"
    ];

consts.phases = keyMirror([
    "bubbled",
    "captured"
]);

consts.topLevelTypes = keyMirror(eventTypes);

consts.propNames = map(eventTypes, replaceTopWithOn);

forEach(eventTypes, function(str) {
    propNameToTopLevel[replaceTopWithOn(str)] = str;
});

forEach(eventTypes, function(str) {
    topLevelToEvent[str] = removeTop(str).toLowerCase();
});

function replaceTopWithOn(str) {
    return str.replace(/^top/, "on");
}

function removeTop(str) {
    return str.replace(/^top/, "");
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/map/src/index.js */

var isArrayLike = require(54),
    isNullOrUndefined = require(21),
    fastBindThis = require(109),
    arrayMap = require(24),
    objectMap = require(110);


module.exports = map;


function map(value, callback, thisArg) {
    callback = isNullOrUndefined(thisArg) ? callback : fastBindThis(callback, thisArg, 3);
    return isArrayLike(value) ?
        arrayMap(value, callback) :
        objectMap(value, callback);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/for_each/src/index.js */

var isArrayLike = require(54),
    isNullOrUndefined = require(21),
    fastBindThis = require(109),
    arrayForEach = require(111),
    objectForEach = require(112);


module.exports = forEach;


function forEach(value, callback, thisArg) {
    callback = isNullOrUndefined(thisArg) ? callback : fastBindThis(callback, thisArg, 3);
    return isArrayLike(value) ?
        arrayForEach(value, callback) :
        objectForEach(value, callback);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/fast_bind_this/src/index.js */

var isNumber = require(22);


module.exports = fastBindThis;


function fastBindThis(callback, thisArg, length) {
    switch (isNumber(length) ? length : (callback.length || -1)) {
        case 0:
            return function bound() {
                return callback.call(thisArg);
            };
        case 1:
            return function bound(a1) {
                return callback.call(thisArg, a1);
            };
        case 2:
            return function bound(a1, a2) {
                return callback.call(thisArg, a1, a2);
            };
        case 3:
            return function bound(a1, a2, a3) {
                return callback.call(thisArg, a1, a2, a3);
            };
        case 4:
            return function bound(a1, a2, a3, a4) {
                return callback.call(thisArg, a1, a2, a3, a4);
            };
        default:
            return function bound() {
                return callback.apply(thisArg, arguments);
            };
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/object-map/src/index.js */

var keys = require(35);


module.exports = objectMap;


function objectMap(object, callback) {
    var objectKeys = keys(object),
        length = objectKeys.length,
        i = -1,
        il = length - 1,
        results = {},
        key;

    while (i++ < il) {
        key = objectKeys[i];
        results[key] = callback(object[key], key, object);
    }

    return results;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/array-for_each/src/index.js */

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
/* ../../node_modules/virt-dom/node_modules/object-for_each/src/index.js */

var keys = require(35);


module.exports = objectForEach;


function objectForEach(object, callback) {
    var objectKeys = keys(object),
        i = -1,
        il = objectKeys.length - 1,
        key;

    while (i++ < il) {
        key = objectKeys[i];

        if (callback(object[key], key, object) === false) {
            break;
        }
    }

    return object;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/eventHandlersById.js */




},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/Adapter.js */

var virt = require(1),
    extend = require(25),
    Messenger = require(117),
    createMessengerAdapter = require(118),
    eventHandlersById = require(113),
    getWindow = require(119),
    nativeDOMComponents = require(71),
    nativeDOMHandlers = require(72),
    registerNativeComponents = require(120),
    registerNativeComponentHandlers = require(121),
    getNodeById = require(104),
    consts = require(106),
    EventHandler = require(122),
    eventClassMap = require(123),
    applyEvents = require(124),
    applyPatches = require(125);


var traverseAncestors = virt.traverseAncestors;


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
        var childHash = root.childHash,
            topLevelType = data.topLevelType,
            nativeEvent = data.nativeEvent,
            targetId = data.targetId,
            eventType = events[topLevelType],
            target = childHash[targetId],
            global = eventType.global,
            event, i, il;

        if (target) {
            target = target.component;
        } else {
            target = null;
        }

        if (global) {
            i = -1;
            il = global.length - 1;
            event = event || eventClassMap[topLevelType].getPooled(nativeEvent, eventHandler);
            event.currentTarget = event.componentTarget = event.currentComponentTarget = target;
            while (i++ < il) {
                global[i](event);
            }
        }

        traverseAncestors(targetId, function traverseAncestor(currentTargetId) {
            if (eventType[currentTargetId]) {
                event = event || eventClassMap[topLevelType].getPooled(nativeEvent, eventHandler);
                event.currentTarget = getNodeById(currentTargetId);
                event.componentTarget = target;
                event.currentComponentTarget = childHash[currentTargetId].component;
                eventType[currentTargetId](event);
                return event.returnValue;
            } else {
                return true;
            }
        });

        if (event && event.isPersistent !== true) {
            event.destroy();
        }

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
/* ../../node_modules/virt-dom/src/rootsById.js */




},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/getRootNodeId.js */

var getRootNodeInContainer = require(173),
    getNodeId = require(172);


module.exports = getRootNodeId;


function getRootNodeId(containerDOMNode) {
    return getNodeId(getRootNodeInContainer(containerDOMNode));
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/messenger/src/index.js */

var MESSENGER_ID = 0,
    MessengerPrototype;


module.exports = Messenger;


function Messenger(adapter) {
    var _this = this;

    this.__id = (MESSENGER_ID++).toString(36);
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
        callbacks = this.__callbacks,
        callback = callbacks[id],
        listeners, adapter;

    if (name) {
        listeners = this.__listeners;
        adapter = this.__adapter;

        if (listeners[name]) {
            Messenger_emit(this, listeners[name], message.data, function emitCallback(error, data) {
                adapter.postMessage({
                    id: id,
                    error: error || undefined,
                    data: data
                });
            });
        }
    } else {
        if (callback && isMatch(id, this.__id)) {
            callback(message.error, message.data, this);
            delete callbacks[id];
        }
    }
};

MessengerPrototype.emit = function(name, data, callback) {
    var id = this.__id + "-" + (this.__messageId++).toString(36);

    if (callback) {
        this.__callbacks[id] = callback;
    }

    this.__adapter.postMessage({
        id: id,
        name: name,
        data: data
    });
};

MessengerPrototype.send = MessengerPrototype.emit;

MessengerPrototype.on = function(name, callback) {
    var listeners = this.__listeners,
        listener = listeners[name] || (listeners[name] = []);

    listener[listener.length] = callback;
};

MessengerPrototype.off = function(name, callback) {
    var listeners = this.__listeners,
        listener = listeners[name],
        i;

    if (listener) {
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

function Messenger_emit(_this, listeners, data, callback) {
    var index = 0,
        length = listeners.length,
        called = false;

    function done(error, data) {
        if (called === false) {
            called = true;
            callback(error, data);
        }
    }

    function next(error, data) {
        if (error || index === length) {
            done(error, data);
        } else {
            listeners[index++](data, next, _this);
        }
    }

    next(undefined, data);
}

function isMatch(messageId, id) {
    return messageId.split("-")[0] === id;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/messenger_adapter/src/index.js */

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
/* ../../node_modules/virt-dom/src/utils/getWindow.js */

module.exports = getWindow;


function getWindow(document) {
    var scriptElement, parentElement;

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
/* ../../node_modules/virt-dom/src/utils/registerNativeComponents.js */

var has = require(23);


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
/* ../../node_modules/virt-dom/src/utils/registerNativeComponentHandlers.js */

var has = require(23);


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
/* ../../node_modules/virt-dom/src/events/EventHandler.js */

var has = require(23),
    eventListener = require(126),
    consts = require(106),
    getWindowWidth = require(127),
    getWindowHeight = require(128),
    getEventTarget = require(129),
    getNodeAttributeId = require(130),
    nativeEventToJSON = require(131),
    isEventSupported = require(132);


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
    var document = this.document,
        window = this.window,
        isListening = this.__isListening;

    if (!isListening[topLevelType]) {
        if (topLevelType === topLevelTypes.topWheel) {
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
        viewport = this.viewport,
        targetId = getNodeAttributeId(getEventTarget(nativeEvent, this.window));

    if (!isClient && targetId) {
        nativeEvent.preventDefault();
    }

    this.messenger.emit("virt.dom.handleEventDispatch", {
        currentScrollLeft: viewport.currentScrollLeft,
        currentScrollTop: viewport.currentScrollTop,
        topLevelType: topLevelType,
        nativeEvent: isClient ? nativeEvent : nativeEventToJSON(nativeEvent),
        targetId: targetId
    });
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/eventClassMap.js */

var SyntheticClipboardEvent = require(136),
    SyntheticCompositionEvent = require(137),
    SyntheticDragEvent = require(138),
    SyntheticEvent = require(139),
    SyntheticFocusEvent = require(140),
    SyntheticInputEvent = require(141),
    SyntheticKeyboardEvent = require(142),
    SyntheticMouseEvent = require(143),
    SyntheticTouchEvent = require(144),
    SyntheticUIEvent = require(145),
    SyntheticWheelEvent = require(146);


module.exports = {
    topBlur: SyntheticFocusEvent,
    topChange: SyntheticInputEvent,
    topClick: SyntheticMouseEvent,

    topCompositionEnd: SyntheticCompositionEvent,
    topCompositionStart: SyntheticCompositionEvent,
    topCompositionUpdate: SyntheticCompositionEvent,

    topContextMenu: SyntheticMouseEvent,

    topCopy: SyntheticClipboardEvent,
    topCut: SyntheticClipboardEvent,

    topDoubleClick: SyntheticMouseEvent,

    topDrag: SyntheticDragEvent,
    topDragEnd: SyntheticDragEvent,
    topDragEnter: SyntheticDragEvent,
    topDragExit: SyntheticDragEvent,
    topDragLeave: SyntheticDragEvent,
    topDragOver: SyntheticDragEvent,
    topDragStart: SyntheticDragEvent,
    topDrop: SyntheticDragEvent,

    topError: SyntheticUIEvent,
    topFocus: SyntheticFocusEvent,
    topInput: SyntheticInputEvent,

    topKeyDown: SyntheticKeyboardEvent,
    topKeyPress: SyntheticKeyboardEvent,
    topKeyUp: SyntheticKeyboardEvent,

    topLoad: SyntheticUIEvent,

    topMouseDown: SyntheticMouseEvent,
    topMouseMove: SyntheticMouseEvent,
    topMouseOut: SyntheticMouseEvent,
    topMouseOver: SyntheticMouseEvent,
    topMouseEnter: SyntheticMouseEvent,
    topMouseUp: SyntheticMouseEvent,

    topOrientationChange: SyntheticEvent,

    topPaste: SyntheticClipboardEvent,
    topReset: SyntheticEvent,
    topResize: SyntheticUIEvent,
    topScroll: SyntheticUIEvent,

    topSelectionChange: SyntheticEvent,

    topSubmit: SyntheticEvent,

    topTextInput: SyntheticInputEvent,

    topTouchCancel: SyntheticTouchEvent,
    topTouchEnd: SyntheticTouchEvent,
    topTouchMove: SyntheticTouchEvent,
    topTouchStart: SyntheticTouchEvent,

    topWheel: SyntheticWheelEvent,

    topRateChange: SyntheticEvent,
    topSeeked: SyntheticEvent,
    topSeeking: SyntheticEvent,
    topStalled: SyntheticEvent,
    topSuspend: SyntheticEvent,
    topTimeUpdate: SyntheticEvent,
    topVolumeChange: SyntheticEvent,
    topWaiting: SyntheticEvent
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/applyEvents.js */

var has = require(23);


module.exports = applyEvents;


function applyEvents(events, eventHandler) {
    var localHas = has,
        id, eventArray, i, il;

    for (id in events) {
        if (localHas(events, id)) {
            eventArray = events[id];
            i = -1;
            il = eventArray.length - 1;

            while (i++ < il) {
                eventHandler.listenTo(id, eventArray[i]);
            }
        }
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/applyPatches.js */

var getNodeById = require(104),
    applyPatch = require(165);


module.exports = applyPatches;


function applyPatches(hash, rootDOMNode, document) {
    var id;

    for (id in hash) {
        if (hash[id] !== undefined) {
            applyPatchIndices(getNodeById(id), hash[id], id, document, rootDOMNode);
        }
    }
}

function applyPatchIndices(DOMNode, patchArray, id, document, rootDOMNode) {
    var i = -1,
        length = patchArray.length - 1;

    while (i++ < length) {
        applyPatch(patchArray[i], DOMNode, id, document, rootDOMNode);
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/event_listener/src/index.js */

var process = require(57);
var isObject = require(31),
    isFunction = require(17),
    environment = require(99),
    eventTable = require(133);


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
/* ../../node_modules/virt-dom/src/events/getters/getWindowWidth.js */

module.exports = getWindowWidth;


function getWindowWidth(window, document, documentElement) {
    return window.innerWidth || document.clientWidth || documentElement.clientWidth;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getWindowHeight.js */

module.exports = getWindowHeight;


function getWindowHeight(window, document, documentElement) {
    return window.innerHeight || document.clientHeight || documentElement.clientHeight;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getEventTarget.js */

module.exports = getEventTarget;


function getEventTarget(nativeEvent, window) {
    var target = nativeEvent.target || nativeEvent.srcElement || window;
    return target.nodeType === 3 ? target.parentNode : target;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/getNodeAttributeId.js */

var DOM_ID_NAME = require(84);


module.exports = getNodeAttributeId;


function getNodeAttributeId(node) {
    return node && node.getAttribute && node.getAttribute(DOM_ID_NAME) || "";
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/nativeEventToJSON.js */

var indexOf = require(55),
    isNode = require(102),
    isFunction = require(17),
    ignoreNativeEventProp = require(134);


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
/* ../../node_modules/virt-dom/src/events/isEventSupported.js */

var isFunction = require(17),
    isNullOrUndefined = require(21),
    has = require(23),
    supports = require(135),
    environment = require(99);


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
/* ../../node_modules/virt-dom/node_modules/event_listener/src/event_table.js */

var isNode = require(102),
    environment = require(99);


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
/* ../../node_modules/virt-dom/src/utils/ignoreNativeEventProp.js */

module.exports = [
    "view", "target", "currentTarget", "path", "srcElement",
    "cancelBubble", "stopPropagation", "stopImmediatePropagation", "preventDefault", "initEvent",
    "NONE", "CAPTURING_PHASE", "AT_TARGET", "BUBBLING_PHASE", "MOUSEDOWN", "MOUSEUP",
    "MOUSEOVER", "MOUSEOUT", "MOUSEMOVE", "MOUSEDRAG", "CLICK", "DBLCLICK", "KEYDOWN",
    "KEYUP", "KEYPRESS", "DRAGDROP", "FOCUS", "BLUR", "SELECT", "CHANGE"
];


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/supports/src/index.js */

var environment = require(99);


var supports = module.exports;


supports.dom = !!(typeof(window) !== "undefined" && window.document && window.document.createElement);
supports.workers = typeof(Worker) !== "undefined";

supports.eventListeners = supports.dom && !!environment.window.addEventListener;
supports.attachEvents = supports.dom && !!environment.window.attachEvent;

supports.viewport = supports.dom && !!environment.window.screen;
supports.touch = supports.dom && "ontouchstart" in environment.window;


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticClipboardEvent.js */

var getClipboardEvent = require(147),
    SyntheticEvent = require(139);


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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticCompositionEvent.js */

var getCompositionEvent = require(149),
    SyntheticEvent = require(139);


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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticDragEvent.js */

var getDragEvent = require(150),
    SyntheticMouseEvent = require(143);


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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticEvent.js */

var inherits = require(63),
    createPool = require(42),
    nativeEventToJSON = require(131),
    getEvent = require(148);


var SyntheticEventPrototype;


module.exports = SyntheticEvent;


function SyntheticEvent(nativeEvent, eventHandler) {
    getEvent(this, nativeEvent, eventHandler);
}
createPool(SyntheticEvent);
SyntheticEventPrototype = SyntheticEvent.prototype;

SyntheticEvent.extend = function(child) {
    inherits(child, this);
    createPool(child);
    return child;
};

SyntheticEvent.create = function create(nativeTouch, eventHandler) {
    return this.getPooled(nativeTouch, eventHandler);
};

SyntheticEventPrototype.destructor = function() {
    this.nativeEvent = null;
    this.type = null;
    this.target = null;
    this.currentTarget = null;
    this.componentTarget = null;
    this.currentComponentTarget = null;
    this.eventPhase = null;
    this.bubbles = null;
    this.cancelable = null;
    this.timeStamp = null;
    this.defaultPrevented = null;
    this.propagationStopped = null;
    this.isTrusted = null;
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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticFocusEvent.js */

var getFocusEvent = require(156),
    SyntheticUIEvent = require(145);


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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticInputEvent.js */

var getInputEvent = require(157),
    SyntheticEvent = require(139);


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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticKeyboardEvent.js */

var getKeyboardEvent = require(158),
    SyntheticUIEvent = require(145);


var SyntheticUIEventPrototype = SyntheticUIEvent.prototype,
    SynthetiKeyboardEventPrototype;


module.exports = SynthetiKeyboardEvent;


function SynthetiKeyboardEvent(nativeEvent, eventHandler) {

    SyntheticUIEvent.call(this, nativeEvent, eventHandler);

    getKeyboardEvent(this, nativeEvent, eventHandler);
}
SyntheticUIEvent.extend(SynthetiKeyboardEvent);
SynthetiKeyboardEventPrototype = SynthetiKeyboardEvent.prototype;

SynthetiKeyboardEventPrototype.getModifierState = require(152);

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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticMouseEvent.js */

var getMouseEvent = require(151),
    SyntheticUIEvent = require(145);


var SyntheticUIEventPrototype = SyntheticUIEvent.prototype,
    SyntheticMouseEventPrototype;


module.exports = SyntheticMouseEvent;


function SyntheticMouseEvent(nativeEvent, eventHandler) {

    SyntheticUIEvent.call(this, nativeEvent, eventHandler);

    getMouseEvent(this, nativeEvent, eventHandler);
}
SyntheticUIEvent.extend(SyntheticMouseEvent);
SyntheticMouseEventPrototype = SyntheticMouseEvent.prototype;

SyntheticMouseEventPrototype.getModifierState = require(152);

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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticTouchEvent.js */

var getTouchEvent = require(161),
    SyntheticUIEvent = require(145),
    SyntheticTouch = require(162);


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

SyntheticTouchEventPrototype.getModifierState = require(152);

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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticUIEvent.js */

var getUIEvent = require(155),
    SyntheticEvent = require(139);


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
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticWheelEvent.js */

var getWheelEvent = require(164),
    SyntheticMouseEvent = require(143);


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
/* ../../node_modules/virt-dom/src/events/getters/getClipboardEvent.js */

module.exports = getClipboardEvent;


function getClipboardEvent(obj, nativeEvent, eventHandler) {
    obj.clipboardData = getClipboardData(nativeEvent, eventHandler.window);
}

function getClipboardData(nativeEvent, window) {
    return nativeEvent.clipboardData != null ? nativeEvent.clipboardData : window.clipboardData;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getEvent.js */

var getEventTarget = require(129);


module.exports = getEvent;


function getEvent(obj, nativeEvent, eventHandler) {
    obj.nativeEvent = nativeEvent;
    obj.type = nativeEvent.type;
    obj.target = getEventTarget(nativeEvent, eventHandler.window);
    obj.currentTarget = nativeEvent.currentTarget;
    obj.eventPhase = nativeEvent.eventPhase;
    obj.bubbles = nativeEvent.bubbles;
    obj.cancelable = nativeEvent.cancelable;
    obj.timeStamp = nativeEvent.timeStamp;
    obj.defaultPrevented = (
        nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false
    );
    obj.propagationStopped = false;
    obj.isTrusted = nativeEvent.isTrusted;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getCompositionEvent.js */

module.exports = getCompositionEvent;


function getCompositionEvent(obj, nativeEvent) {
    obj.data = nativeEvent.data;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getDragEvent.js */

module.exports = getDragEvent;


function getDragEvent(obj, nativeEvent) {
    obj.dataTransfer = nativeEvent.dataTransfer;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getMouseEvent.js */

var getPageX = require(153),
    getPageY = require(154);


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
/* ../../node_modules/virt-dom/src/events/getters/getEventModifierState.js */

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
/* ../../node_modules/virt-dom/src/events/getters/getPageX.js */

module.exports = getPageX;


function getPageX(nativeEvent, viewport) {
    return nativeEvent.pageX != null ? nativeEvent.pageX : nativeEvent.clientX + viewport.currentScrollLeft;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getPageY.js */

module.exports = getPageY;


function getPageY(nativeEvent, viewport) {
    return nativeEvent.pageY != null ? nativeEvent.pageY : nativeEvent.clientY + viewport.currentScrollTop;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getUIEvent.js */

var getWindow = require(119),
    getEventTarget = require(129);


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
/* ../../node_modules/virt-dom/src/events/getters/getFocusEvent.js */

module.exports = getFocusEvent;


function getFocusEvent(obj, nativeEvent) {
    obj.relatedTarget = nativeEvent.relatedTarget;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getInputEvent.js */

module.exports = getInputEvent;


function getInputEvent(obj, nativeEvent) {
    obj.data = nativeEvent.data;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getKeyboardEvent.js */

var getEventKey = require(159),
    getEventCharCode = require(160);


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

    return type === "keypress" ? getEventCharCode(event) : (
        type === "keydown" || type === "keyup" ? nativeEvent.keyCode : 0
    );
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/getters/getEventKey.js */

var getEventCharCode = require(160);


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
/* ../../node_modules/virt-dom/src/events/getters/getEventCharCode.js */

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
/* ../../node_modules/virt-dom/src/events/getters/getTouchEvent.js */

module.exports = getTouchEvent;


function getTouchEvent(obj, nativeEvent) {
    obj.altKey = nativeEvent.altKey;
    obj.metaKey = nativeEvent.metaKey;
    obj.ctrlKey = nativeEvent.ctrlKey;
    obj.shiftKey = nativeEvent.shiftKey;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/events/syntheticEvents/SyntheticTouch.js */

var getTouch = require(163),
    nativeEventToJSON = require(131),
    createPool = require(42);


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
/* ../../node_modules/virt-dom/src/events/getters/getTouch.js */

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
/* ../../node_modules/virt-dom/src/events/getters/getWheelEvent.js */

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
/* ../../node_modules/virt-dom/src/applyPatch.js */

var virt = require(1),
    isNull = require(27),
    isUndefined = require(28),
    isNullOrUndefined = require(21),
    createDOMElement = require(166),
    renderMarkup = require(83),
    renderString = require(70),
    renderChildrenString = require(85),
    addDOMNodes = require(167),
    removeDOMNode = require(168),
    removeDOMNodes = require(169),
    getNodeById = require(104),
    applyProperties = require(170);


var consts = virt.consts;


module.exports = applyPatch;


function applyPatch(patch, DOMNode, id, document, rootDOMNode) {
    switch (patch.type) {
        case consts.MOUNT:
            mount(rootDOMNode, patch.next, id);
            break;
        case consts.UNMOUNT:
            unmount(rootDOMNode);
            break;
        case consts.INSERT:
            insert(DOMNode, patch.childId, patch.index, patch.next, document);
            break;
        case consts.REMOVE:
            remove(DOMNode, patch.childId, patch.index);
            break;
        case consts.REPLACE:
            replace(DOMNode, patch.childId, patch.index, patch.next, document);
            break;
        case consts.TEXT:
            text(DOMNode, patch.index, patch.next, patch.props);
            break;
        case consts.ORDER:
            order(DOMNode, patch.order);
            break;
        case consts.PROPS:
            applyProperties(DOMNode, patch.id, patch.next, patch.previous);
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
    addDOMNodes(rootDOMNode.childNodes);
}

function unmount(rootDOMNode) {
    removeDOMNodes(rootDOMNode.childNodes);
    rootDOMNode.innerHTML = "";
}

function insert(parentNode, id, index, view, document) {
    var node = createDOMElement(view, id, document);

    if (view.children) {
        node.innerHTML = renderChildrenString(view.children, view.props, id);
        addDOMNodes(node.childNodes);
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
        addDOMNodes(node.childNodes);
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
/* ../../node_modules/virt-dom/src/utils/createDOMElement.js */

var virt = require(1),
    isString = require(19),

    DOM_ID_NAME = require(84),
    nodeCache = require(105),

    applyProperties = require(170);


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
        throw new TypeError("Arguments is not a valid view");
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/addDOMNodes.js */

var isElement = require(171),
    getNodeId = require(172);


module.exports = addDOMNodes;


function addDOMNodes(nodes) {
    var i = -1,
        il = nodes.length - 1;

    while (i++ < il) {
        addDOMNode(nodes[i]);
    }
}

function addDOMNode(node) {
    if (isElement(node)) {
        getNodeId(node);
        addDOMNodes(node.childNodes);
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/removeDOMNode.js */

var isElement = require(171),
    nodeCache = require(105),
    getNodeAttributeId = require(130);


module.exports = removeDOMNode;


var removeDOMNodes = require(169);


function removeDOMNode(node) {
    if (isElement(node)) {
        delete nodeCache[getNodeAttributeId(node)];
        removeDOMNodes(node.childNodes);
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/removeDOMNodes.js */

module.exports = removeDOMNodes;


var removeDOMNode = require(168);


function removeDOMNodes(nodes) {
    var i = -1,
        il = nodes.length - 1;

    while (i++ < il) {
        removeDOMNode(nodes[i]);
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/applyProperties.js */

var isString = require(19),
    isObject = require(31),
    isFunction = require(17),
    isUndefined = require(28),
    isNullOrUndefined = require(21),
    getPrototypeOf = require(34);


module.exports = applyProperties;


function applyProperties(node, id, props, previous) {
    var propKey, propValue;

    for (propKey in props) {
        propValue = props[propKey];

        if (propKey !== "dangerouslySetInnerHTML" && !isFunction(propValue)) {
            if (isNullOrUndefined(propValue) && !isNullOrUndefined(previous)) {
                removeProperty(node, id, previous, propKey);
            } else if (isObject(propValue)) {
                applyObject(node, previous, propKey, propValue);
            } else if (!isNullOrUndefined(propValue) && (!previous || previous[propKey] !== propValue)) {
                applyProperty(node, id, propKey, propValue);
            }
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
        previousValue = previous[propKey],
        keyName, style;

    if (propKey === "attributes") {
        for (keyName in previousValue) {
            if (canRemoveAttribute) {
                node.removeAttribute(keyName);
            } else {
                node[keyName] = isString(previousValue[keyName]) ? "" : null;
            }
        }
    } else if (propKey === "style") {
        style = node.style;

        for (keyName in previousValue) {
            style[keyName] = "";
        }
    } else {
        if (propKey !== "className" && canRemoveAttribute) {
            node.removeAttribute(propKey);
        } else {
            node[propKey] = isString(previousValue) ? "" : null;
        }
    }
}

function applyObject(node, previous, propKey, propValues) {
    var previousValue, key, value, nodeProps, replacer;

    if (propKey === "attributes") {
        for (key in propValues) {
            value = propValues[key];

            if (isUndefined(value)) {
                node.removeAttribute(key);
            } else {
                node.setAttribute(key, value);
            }
        }

        return;
    }

    previousValue = previous ? previous[propKey] : void(0);

    if (!isNullOrUndefined(previousValue) &&
        isObject(previousValue) &&
        getPrototypeOf(previousValue) !== getPrototypeOf(propValues)
    ) {
        node[propKey] = propValues;
        return;
    }

    nodeProps = node[propKey];

    if (!isObject(nodeProps)) {
        nodeProps = node[propKey] = {};
    }

    replacer = propKey === "style" ? "" : void(0);

    for (key in propValues) {
        value = propValues[key];
        nodeProps[key] = isUndefined(value) ? replacer : value;
    }
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/is_element/src/index.js */

var isNode = require(102);


module.exports = isElement;


function isElement(value) {
    return isNode(value) && value.nodeType === 1;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/getNodeId.js */

var has = require(23),
    nodeCache = require(105),
    getNodeAttributeId = require(130);


module.exports = getNodeId;


function getNodeId(node) {
    return node && getId(node);
}

function getId(node) {
    var id = getNodeAttributeId(node),
        localNodeCache, cached;

    if (id) {
        localNodeCache = nodeCache;

        if (has(localNodeCache, id)) {
            cached = localNodeCache[id];

            if (cached !== node) {
                localNodeCache[id] = node;
            }
        } else {
            localNodeCache[id] = node;
        }
    }

    return id;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/utils/getRootNodeInContainer.js */

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
/* ../../node_modules/virt-dom/node_modules/messenger_worker_adapter/src/index.js */

var isString = require(19),
    environment = require(99);


var MessengerWorkerAdapterPrototype,
    globalWorker;


if (environment.worker) {
    globalWorker = self;
}


module.exports = MessengerWorkerAdapter;


function MessengerWorkerAdapter(url) {
    this.__worker = environment.worker ? globalWorker : (isString(url) ? new Worker(url) : url);
}
MessengerWorkerAdapterPrototype = MessengerWorkerAdapter.prototype;

MessengerWorkerAdapterPrototype.addMessageListener = function(callback) {
    this.__worker.addEventListener("message", function onMessage(e) {
        callback(JSON.parse(e.data));
    });
};

MessengerWorkerAdapterPrototype.postMessage = function(data) {
    this.__worker.postMessage(JSON.stringify(data));
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/worker/WorkerAdapter.js */

var virt = require(1),
    extend = require(25),
    Messenger = require(117),
    MessengerWorkerAdapter = require(174),
    nativeDOMComponents = require(71),
    registerNativeComponents = require(120),
    consts = require(106),
    eventClassMap = require(123);


var traverseAncestors = virt.traverseAncestors;


module.exports = WorkerAdapter;


function WorkerAdapter(root) {
    var messenger = new Messenger(new MessengerWorkerAdapter()),
        eventManager = root.eventManager,
        viewport = {
            currentScrollLeft: 0,
            currentScrollTop: 0
        },
        eventHandler = {
            window: global,
            document: global,
            viewport: viewport
        },
        events = eventManager.events;

    this.root = root;
    this.messenger = messenger;

    extend(eventManager.propNameToTopLevel, consts.propNameToTopLevel);

    messenger.on("virt.dom.handleEventDispatch", function(data, callback) {
        var childHash = root.childHash,
            topLevelType = data.topLevelType,
            nativeEvent = data.nativeEvent,
            targetId = data.targetId,
            eventType = events[topLevelType],
            target = childHash[targetId],
            global = eventType.global,
            event, i, il;

        if (target) {
            target = target.component;
        } else {
            target = null;
        }

        viewport.currentScrollLeft = data.currentScrollLeft;
        viewport.currentScrollTop = data.currentScrollTop;

        if (global) {
            i = -1;
            il = global.length - 1;
            event = event || eventClassMap[topLevelType].getPooled(nativeEvent, eventHandler);
            event.currentTarget = event.componentTarget = event.currentComponentTarget = target;
            while (i++ < il) {
                global[i](event);
            }
        }

        traverseAncestors(targetId, function(currentTargetId) {
            if (eventType[currentTargetId]) {
                event = event || eventClassMap[topLevelType].getPooled(nativeEvent, eventHandler);
                event.target = event.componentTarget = target;
                event.currentTarget = event.currentComponentTarget = childHash[currentTargetId].component;
                eventType[currentTargetId](event);
                return event.returnValue;
            } else {
                return true;
            }
        });

        if (event && event.isPersistent !== true) {
            event.destroy();
        }

        callback();
    });

    registerNativeComponents(root, nativeDOMComponents);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/node_modules/messenger_websocket_adapter/src/index.js */

var MessengerWebSocketAdapterPrototype;


module.exports = MessengerWebSocketAdapter;


function MessengerWebSocketAdapter(socket, attachMessage, sendMessage) {
    this.__socket = socket;

    this.__attachMessage = attachMessage || defaultAttachMessage;
    this.__sendMessage = sendMessage || defaultSendMessage;
}
MessengerWebSocketAdapterPrototype = MessengerWebSocketAdapter.prototype;

MessengerWebSocketAdapterPrototype.addMessageListener = function(callback) {
    this.__attachMessage(this.__socket, callback);
};

MessengerWebSocketAdapterPrototype.postMessage = function(data) {
    this.__sendMessage(this.__socket, data);
};

function defaultAttachMessage(socket, callback) {
    socket.onmessage = function onMessage(e) {
        callback(JSON.parse(e.data));
    };
}

function defaultSendMessage(socket, data) {
    socket.send(JSON.stringify(data));
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/virt-dom/src/websocket/WebSocketAdapter.js */

var virt = require(1),
    extend = require(25),
    Messenger = require(117),
    MessengerWebSocketAdapter = require(176),
    nativeDOMComponents = require(71),
    registerNativeComponents = require(120),
    consts = require(106),
    eventClassMap = require(123);


var traverseAncestors = virt.traverseAncestors;


module.exports = WebSocketAdapter;


function WebSocketAdapter(root, socket, attachMessage, sendMessage) {
    var messenger = new Messenger(new MessengerWebSocketAdapter(socket, attachMessage, sendMessage)),

        eventManager = root.eventManager,

        viewport = {
            currentScrollLeft: 0,
            currentScrollTop: 0
        },
        eventHandler = {
            window: global,
            document: global,
            viewport: viewport
        },

        events = eventManager.events;

    this.root = root;
    this.messenger = messenger;

    extend(eventManager.propNameToTopLevel, consts.propNameToTopLevel);

    messenger.on("virt.dom.handleEventDispatch", function(data, callback) {
        var childHash = root.childHash,
            topLevelType = data.topLevelType,
            nativeEvent = data.nativeEvent,
            targetId = data.targetId,
            eventType = events[topLevelType],
            target = childHash[targetId],
            global = eventType.global,
            event, i, il;

        if (target) {
            target = target.component;
        } else {
            target = null;
        }

        viewport.currentScrollLeft = data.currentScrollLeft;
        viewport.currentScrollTop = data.currentScrollTop;

        if (global) {
            i = -1;
            il = global.length - 1;
            event = event || eventClassMap[topLevelType].getPooled(nativeEvent, eventHandler);
            event.currentTarget = event.componentTarget = event.currentComponentTarget = target;
            while (i++ < il) {
                global[i](event);
            }
        }

        traverseAncestors(targetId, function(currentTargetId) {
            if (eventType[currentTargetId]) {
                event = event || eventClassMap[topLevelType].getPooled(nativeEvent, eventHandler);
                event.target = event.componentTarget = target;
                event.currentTarget = event.currentComponentTarget = childHash[currentTargetId].component;
                eventType[currentTargetId](event);
                return event.returnValue;
            } else {
                return true;
            }
        });

        if (event && event.isPersistent !== true) {
            event.destroy();
        }

        callback();
    });

    registerNativeComponents(root, nativeDOMComponents);
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/i18n/src/index.js */

var isArray = require(18),
    isString = require(19),
    isObject = require(31),
    format = require(181),
    fastSlice = require(182),
    has = require(23),
    defineProperty = require(52);


var translationCache = global.__I18N_TRANSLATIONS__;


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


function create(flatMode, throwMissingError) {

    flatMode = !!flatMode;
    throwMissingError = !!throwMissingError;


    function i18n(locale, key) {
        return i18n.translate(locale, key, fastSlice(arguments, 2));
    }

    i18n.create = create;

    i18n.translate = function(locale, key, args) {
        var translations = translationCache[locale] || null;

        if (translations === null) {
            throw new Error("i18n(key[, locale[, ...args]]) no translations for " + locale + " locale");
        }
        if (!isString(key)) {
            throw new TypeError("i18n(key[, locale[, ...args]]) key must be a String");
        }

        args = isArray(args) ? args : [];

        if (flatMode === true) {
            return translateFlat(key, translations, args);
        } else {
            return translate(key, translations, args);
        }
    };

    i18n.flatMode = function(value) {
        flatMode = !!value;
    };

    i18n.throwMissingError = function(value) {
        throwMissingError = !!value;
    };

    i18n.reset = function() {
        flatMode = false;
        throwMissingError = false;
    };

    i18n.has = function(locale, key) {
        if (has(translationCache[locale], key)) {
            return true;
        } else {
            return false;
        }
    };

    i18n.add = function(locale, object) {
        var translations = translationCache[locale] || (translationCache[locale] = {}),
            localHas, key;

        if (isObject(object)) {
            localHas = has;

            for (key in object) {
                if (localHas(object, key)) {
                    if (localHas(translations, key)) {
                        throw new TypeError("i18n.add(locale, object) cannot override " + locale + " translation with key " + key);
                    } else {
                        translations[key] = object[key];
                    }
                }
            }
        } else {
            throw new TypeError("i18n.add(locale, object) object must be an Object");
        }
    };

    function missingTranslation(key) {
        if (throwMissingError) {
            throw new Error("i18n(locale, key) missing translation for key " + key);
        } else {
            return "--" + key + "--";
        }
    }

    function translate(key, translations, args) {
        var origKey = key,
            keys = key.split("."),
            length = keys.length - 1,
            i = 0,
            value = translations[keys[i]];


        while (i++ < length) {
            key = keys[i];

            if (isObject(value)) {
                value = value[key];

                if (value == null) {
                    return missingTranslation(origKey);
                }
            } else {
                return missingTranslation(origKey);
            }
        }

        if (value == null || isObject(value)) {
            return missingTranslation(origKey);
        } else {
            return args.length !== 0 ? format.array(value, args) : value;
        }
    }

    function translateFlat(key, translations, args) {
        var value = translations[key];

        if (value == null || isObject(value)) {
            return missingTranslation(key);
        } else {
            return args.length !== 0 ? format.array(value, args) : value;
        }
    }

    return i18n;
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/is_regexp/src/index.js */

var isObject = require(31);


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
/* ../../node_modules/prop_types/src/en.js */

module.exports = {
    "prop_types.regexp": "Invalid %s of value %s supplied to %s, expected RexExp.",
    "prop_types.instance_of": "Invalid %s of type %s supplied to %s, expected instance of %s.",
    "prop_types.one_of": "Invalid %s of value %s supplied to %s, expected one of %s.",
    "prop_types.is_required": "Required %s was not specified in %s.",
    "prop_types.primitive": "Invalid %s of type %s supplied to %s expected %s.",
    "prop_types.anonymous": "anonymous"
};


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/format/src/index.js */

var isString = require(19),
    isObject = require(31),
    isPrimitive = require(16),
    isArrayLike = require(54),
    isFunction = require(17),
    indexOf = require(55),
    fastSlice = require(182);


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
/* ../../node_modules/fast_slice/src/index.js */

var clamp = require(183),
    isNumber = require(22);


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
/* ../../node_modules/clamp/src/index.js */

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
/* ../../src/Divider.js */

var virt = require(1),
    virtDOM = require(2),
    propTypes = require(3),
    domDimensions = require(185);


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


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/dom_dimensions/src/index.js */

var getCurrentStyle = require(186),
    isElement = require(171);


var domDimensions = exports;


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
/* ../../node_modules/get_current_style/src/index.js */

var supports = require(135),
    environment = require(99),
    isElement = require(171),
    isString = require(19),
    camelize = require(187);


var baseGetCurrentStyle;


module.exports = getCurrentStyle;


function getCurrentStyle(node, style) {
    if (isElement(node) && isString(style)) {
        return baseGetCurrentStyle(node, style);
    } else {
        return "";
    }
}


if (supports.dom && environment.document.defaultView) {
    baseGetCurrentStyle = function(node, style) {
        return node.ownerDocument.defaultView.getComputedStyle(node, "")[camelize(style)] || "";
    };
} else {
    baseGetCurrentStyle = function(node, style) {
        if (node.currentStyle) {
            return node.currentStyle[camelize(style)] || "";
        } else {
            return node.style[camelize(style)] || "";
        }
    };
}


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/camelize/src/index.js */

var reInflect = require(188),
    capitalizeString = require(189);


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
/* ../../node_modules/re_inflect/src/index.js */

module.exports = /[^A-Z-_ ]+|[A-Z][^A-Z-_ ]+|[^a-z-_ ]+/g;


},
function(require, exports, module, undefined, global) {
/* ../../node_modules/capitalize_string/src/index.js */

module.exports = capitalizeString;


function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


}], null, void(0), (new Function("return this;"))()));
