module.exports.tasks = {
    clean: {
        release: [ "target" ],
        all: [ "libs","node_modules" ],
        preprelease: [ "target/*.git/*", "!target/*.git/.git" ]
    },
    mkdir: {
        target: {
            options: {
                create: [ "target" ]
            }
        }
    },
};
