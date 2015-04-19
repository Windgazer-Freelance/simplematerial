/* global module, require, process */
module.exports = function(grunt) {

    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        buildVersion: grunt.template.today("yyyymmddHHMM"),
        // Task configuration.
        bumpup: {
            files: ["package.json","bower.json"],
            options: {
                normalize: true
            }
        },
        clean: {
            release: ["target"],
            all: ["libs","node_modules"]
        },
        copy: {
            release: {
                files: [
                    {
                        expand: true, flatten: false,
                        src: [
                            "bower.json",
                            "**/_*.scss",
                            "!libs/**/*.scss"
                        ],
                        dest: "target/release.git/"
                    }
                ]
            }
        },
        gitadd: {
            release: {
                options: {
                    all: true,
                    cwd: "target/release.git/",
                    force: false
                },
                files: {
                    src: ["."]
                }
            },
            source: {
                options: {
                    all: true,
                    force: false
                },
                files: {
                    src: ["."]
                }
            }
        },
        gitcheckout: {
            source: {
                options: {
                    branch: "master"
                }
            }
        },
        gitclone: {
            release: {
                options: {
                    cwd: "target/",
                    branch: "release",
                    depth: 1,
                    repository: "<%= pkg.repository.url %>",
                    directory: "release.git"
                }
            },
            ghpages: {
                options: {
                    cwd: "target/",
                    branch: "gh-pages",
                    depth: 1,
                    repository: "<%= pkg.repository.url %>",
                    directory: "pages.git"
                }
            }
        },
        gitcommit: {
            release: {
                options: {
                    cwd: "target/release.git/",
                    message: "Releasing v<%= pkg.version %> build <%= buildVersion %>",
                    allowEmpty: true //In case of no changes since last dev build...
                },
                files: {
                    src: ["."]
                }
            },
            ghpages: {
                options: {
                    cwd: "target/pages.git/",
                    message: "Releasing v<%= pkg.version %> build <%= buildVersion %>",
                    allowEmpty: true //In case of no changes since last dev build...
                },
                files: {
                    src: ["."]
                }
            },
            source: {
                options: {
                    message: "Version bump"
                },
                files: {
                    src:["."]
                }
            }
        },
        gitpush: {
            release: {
                options: {
                    cwd: "target/release.git/",
                    remote: "origin",
                    branch: "release",
                    tags: true
                }
            },
            ghpages: {
                options: {
                    cwd: "target/pages.git/",
                    remote: "origin",
                    branch: "gh-pages",
                    tags: true
                }
            },
            source: {
                options: {
                    remote: "origin",
                    branch: "master",
                    tags: true
                }
            }
        },
        gitstash: {
            source: {
                options: {
                    command: "save"
                }
            }
        },
        gittag: {
            release: {
                options: {
                    cwd: "target/release.git/",
                    tag: "v<%= pkg.version %>"
                }
            },
            source: {
                options: {
                    tag: "v<%= pkg.version %>-src"
                }
            },
            ghpages: {
                options: {
                    tag: "v<%= pkg.version %>-docs"
                }
            },
            dev: {
                options: {
                    cwd: "target/release.git/",
                    tag: "v<%= pkg.version %>-<%= buildVersion %>"
                }
            }
        },
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
        mkdir: {
            target: {
                options: {
                    create: [ "target" ]
                }
            }
        },
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
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["*.scss","!_*.scss"],
                    dest: "target/release",
                    ext: ".css"
                }]
            },
            dev: {
                options: {
                    style: "expanded",
                    lineNumbers: true,
                    debugInfo: true
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["*.scss","!_*.scss"],
                    dest: "target/release",
                    ext: ".css"
                }]
            }
        },
        watch: {
            sass: {
                // We watch and compile sass files as normal but don"t live reload here
                files: ["*.scss","**/*.scss"],
                tasks: ["render"]
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: {
                    livereload: true,
                    cwd: "target/pages.git/"
                },
                files: ["*.css","*.html"]
            }
        }
    });

    // Default task(s).
    grunt.registerTask(
        "default",
        [
            "prep",
            "render"
        ]
    );
    grunt.registerTask( //Cleaning, cloning, mkdir, that sorta stuff
        "prep",
        [
            "clean:release",
            "mkdir",
            "gitclone:ghpages"
        ]
    );
    grunt.registerTask( //Copying, parsing, compiling, you know the drill
        "render",
        [
            "copy:release",
            "sass:dev",
            "sd"
        ]
    );
    grunt.registerTask( //Running servers, file-watching, the whole sh'bang
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

};
