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
                            "**/*.scss",
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
                    src: ["*.scss"],
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
                    src: ["*.scss"],
                    dest: "target/release",
                    ext: ".css"
                }]
            }
        },
        watch: {
            sass: {
                // We watch and compile sass files as normal but don"t live reload here
                files: ["*.scss","**/*.scss"],
                tasks: ["sass:dev"]
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: ["style/compiled/*","code/*","*.html"]
            }
        }
    });

    // Default task(s).
    grunt.registerTask("default", ["clean:release","mkdir","sass:dev"]);
    grunt.registerTask("init", ["clean:release","mkdir:target"]);

};
