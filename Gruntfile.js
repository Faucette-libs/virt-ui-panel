module.exports = function(grunt) {

    grunt.initConfig({
        jsbeautifier: {
            files: [
                "Gruntfile.js",
                "src/**/*.js",
                "test/**/*.js"
            ]
        },
        jshint: {
            options: {
                // be ecmascript3 compatible
                es3: true,
                // warn when defining and never using variables
                unused: true,
                // assume a node.js environment
                node: true,
                // force curly braces with conditionals
                curly: true,
                // prohibit overwriting native object prototypes
                freeze: true,
                // only allow functions to be used before their declaration
                latedef: "nofunc",
                // only allow block nesting of depth 2
                maxdepth: 3,
                // warn about invalid whitespace characters
                nonbsp: true,
                // warn about undefined variables
                // undef: false,
                // prohibit usage of == and !=
                eqeqeq: true,
                // allow == and != for null only
                eqnull: true,
                // allow expression usage in assignments
                expr: true,
                // do not suppress warnings about __proto__
                proto: false
            },
            files: [
                "Gruntfile.js",
                "src/**/*.js",
                "test/**/*.js"
            ]
        }
    });

    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask("default", ["jsbeautifier", "jshint"]);
};
