module.exports.tasks = {
    // Task configuration.
    "http-server": {
        dev: {
            // the server root directory
            root: "target/pages.git/",
            // the server port
            // can also be written as a function, e.g.
            // port: function() { return 8282; }
            port: 8282,
            // the host ip address
            // If specified to, for example, "127.0.0.1" the server will
            // only be available on that ip.
            // Specify "0.0.0.0" to be available everywhere
            host: "0.0.0.0",
            showDir: true,
            autoIndex: true,
            // server default file extension
            ext: "html",
            // run in parallel with other tasks
            runInBackground: true
        }
    },
    watch: {
        sass: {
            // We watch and compile sass files as normal but don"t live reload here
            files: [ "*.scss","**/*.scss" ],
            tasks: [ "default" ]
        },
        livereload: {
            // Here we watch the files the sass task will compile to
            // These files are sent to the live reload server after sass compiles to them
            options: {
                livereload: true,
                cwd: "target/pages.git/"
            },
            files: [ "*.css","*.html" ]
        }
    }
};
