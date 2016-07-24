/* global module, require, process */
module.exports = function(grunt) {

    "use strict";

    require("time-grunt")(grunt);
    require("load-grunt-tasks")(grunt);
    //loads the various task configuration files
    var configs = require("load-grunt-configs")(grunt);
    grunt.initConfig(configs);

    grunt.registerTask(
        "default",
        [
            "prep",
            "render"
        ]
    );

};
