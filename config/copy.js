module.exports.tasks = {
    copy: {
        release: {
            files: [
                {
                    expand: true, flatten: false,
                    src: [
                        "**/_*.scss",
                        "!target/**/*",
                        "!config/*",
                        "!libs/**/*.scss"
                    ],
                    dest: "target/release.git/"
                }
            ]
        }
    },
};
