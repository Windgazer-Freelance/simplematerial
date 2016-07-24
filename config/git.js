module.exports.tasks = {
    gitadd: {
        release: {
            options: {
                all: true,
                cwd: "target/release.git/",
                force: false
            },
            files: {
                src: [ "." ]
            }
        },
        ghpages: {
            options: {
                all: true,
                cwd: "target/pages.git/",
                force: false
            },
            files: {
                src: [ "." ]
            }
        },
        source: {
            options: {
                all: true,
                force: false
            },
            files: {
                src: [ "." ]
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
                src: [ "." ]
            }
        },
        ghpages: {
            options: {
                cwd: "target/pages.git/",
                message: "Releasing v<%= pkg.version %>-src build <%= buildVersion %>",
                allowEmpty: true //In case of no changes since last dev build...
            },
            files: {
                src: [ "." ]
            }
        },
        source: {
            options: {
                message: "Version bump"
            },
            files: {
                src: [ "." ]
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
                cwd: "target/pages.git/",
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
};
