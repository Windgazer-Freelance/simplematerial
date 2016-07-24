module.exports.tasks = {
    clean: {
        release: [ "target" ],
        all: [ "libs","node_modules" ]
    },
    mkdir: {
        target: {
            options: {
                create: [ "target" ]
            }
        }
    },
};
