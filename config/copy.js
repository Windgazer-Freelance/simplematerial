module.exports.tasks = {
    copy: {
        release: {
            files: [
                {
                    expand: true, flatten: false,
                    src: [
                        "*.md",
                        "**/_*.scss",
                        "!target/**/*",
                        "!config/*",
                        "!node_modules/**/*.scss"
                    ],
                    dest: "target/release.git/"
                }
            ]
        }
    },
};
