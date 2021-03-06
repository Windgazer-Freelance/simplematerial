var grunt = require("grunt");

module.exports.tasks = {
    pkg: grunt.file.readJSON("package.json"),
    buildVersion: grunt.template.today("yyyymmddHHMM"),
    bumpup: {
        files: [ "package.json" ],
        options: {
            normalize: true
        }
    },
};
