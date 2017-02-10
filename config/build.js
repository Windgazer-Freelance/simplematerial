var grunt = require("grunt");

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

module.exports.tasks = {
    sass: {
        options: {
            loadPath: [
                "node_modules"
            ],
        },
        std: {
            options: {
                style: "compressed"
            },
            files: [ {
                expand: true,
                flatten: true,
                src: [ "*.scss","!_*.scss" ],
                dest: "target/release",
                ext: ".css"
            } ]
        },
        dev: {
            options: {
                style: "expanded",
                lineNumbers: true,
                debugInfo: true
            },
            files: [ {
                expand: true,
                flatten: true,
                src: [ "*.scss","!_*.scss" ],
                dest: "target/release",
                ext: ".css"
            } ]
        }
    },
};
