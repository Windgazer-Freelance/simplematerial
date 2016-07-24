/* global module, require, process */
module.exports = function(grunt) {

    "use strict";

    require("time-grunt")(grunt);
    require("load-grunt-tasks")(grunt);
    //loads the various task configuration files
    var configs = require("load-grunt-configs")(grunt);
    grunt.initConfig(configs);

    // Default task(s).
    grunt.registerTask(
        "default",
        [
            "prep",
            "render"
        ]
    );
    grunt.registerTask(//Cleaning, cloning, mkdir, that sorta stuff
        "prep",
        [
            "clean:release",
            "mkdir",
            "gitclone:release",
            "gitclone:ghpages"
        ]
    );
    grunt.registerTask(//Copying, parsing, compiling, you know the drill
        "render",
        [
            "copy:release",
            "sass:dev",
            "sd"
        ]
    );
    grunt.registerTask(//Running servers, file-watching, the whole sh'bang
        "host",
        [
            "default",
            "http-server:dev",
            "watch"
        ]
    );

    grunt.registerTask("sd", function(which) { //couldn't get grunt-styledocco to pick up includes
        // Instruct this task to wait until we call the done() method to continue
        var done = this.async();

        // Run `git rev-parse HEAD` to get the SHA
        grunt.util.spawn({
            opts: {
                cwd: "target/release.git/"
            },
            cmd: "styledocco",
            args: [
                "--verbose",
                "-n", grunt.config.get("pkg.info.fullName"),
                "-o", "../pages.git/",
                "--include", "../release/examples.css"
            ]
        }, function(err, out, stderr) {
            // TODO: Handle error

            // All done, continue to the next tasks
            done();
        });
    });

    grunt.registerTask("release",
     "My custom release task, can be run in stages [prep|dev|live], prep must be used " +
     "before live!\n" +
     "'dev' will commit and push to release branch without confirmation.\n" +
     "'prep' will stash anything on current branch and checkout master branch.",
      function(type) {
        var isDev = type === "dev";
        if (!isDev) {
            grunt.task.run("releaseclean");
        } else {
            type = "prep";
        }
        type = type ? type : "prep"; // Default release type
        grunt.task.run("release" + type);
        if (isDev) {
            grunt.task.run("releasedev");
        }
    });
    grunt.registerTask(
        "releaselive",
        [
            "gittag:source",
            "gittag:release",
            "gittag:ghpages",
            "gitpush:release",
            "gitpush:ghpages",
            "bumpup",
            "gitadd:source",
            "gitcommit:source"
        ]
    );
    grunt.registerTask(
        "releasedev",
        [
            "gittag:dev",
            "gitpush:release"
        ]
    );
    grunt.registerTask(
        "releaseprep",
        [
            "default",
            "gitadd:release",
            "gitcommit:release",
            "gitadd:ghpages",
            "gitcommit:ghpages"
        ]
    );
    grunt.registerTask(
        "releaseclean",
        [
            "gitstash",
            "gitcheckout"
        ]
    );

};
