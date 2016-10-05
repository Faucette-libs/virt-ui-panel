var virt = require("@nathanfaucett/virt"),
    virtDOM = require("@nathanfaucett/virt-dom"),
    propTypes = require("@nathanfaucett/prop_types"),
    Panel = require("../..");


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
