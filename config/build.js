module.exports.tasks = {
    sass: {
        options: {
            loadPath: [
                "libs"
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
