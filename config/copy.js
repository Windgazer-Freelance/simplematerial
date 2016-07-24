module.exports.tasks = {
    copy: {
        release: {
            files: [
                {
                    expand: true, flatten: false,
                    src: [
                        "bower.json",
                        "**/_*.scss",
                        "!target/**/*",
                        "!libs/**/*.scss"
                    ],
                    dest: "target/release.git/"
                }
            ]
        }
    },
};
