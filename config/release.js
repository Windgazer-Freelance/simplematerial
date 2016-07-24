var grunt = require("grunt");

grunt.registerTask("release",
 "My custom release task, can be run in stages [prep|dev|live], prep must be used " +
 "before live!\n" +
 "'dev' will commit and push to release branch without confirmation.\n" +
 "'prep' will stash anything on current branch and checkout master branch.",
  function(type) {
    var isDev = type === "dev";
    if (!isDev) {
        grunt.task.run("releaseclean");
    } else {
        type = "prep";
    }
    type = type ? type : "prep"; // Default release type
    grunt.task.run("release" + type);
    if (isDev) {
        grunt.task.run("releasedev");
    }
});
grunt.registerTask(
    "releaselive",
    [
        "gittag:source",
        "gittag:release",
        "gittag:ghpages",
        "gitpush:release",
        "gitpush:ghpages",
        "bumpup",
        "gitadd:source",
        "gitcommit:source"
    ]
);
grunt.registerTask(
    "releasedev",
    [
        "gittag:dev",
        "gitpush:release"
    ]
);
grunt.registerTask(
    "releaseprep",
    [
        "default",
        "gitadd:release",
        "gitcommit:release",
        "gitadd:ghpages",
        "gitcommit:ghpages"
    ]
);
grunt.registerTask(
    "releaseclean",
    [
        "gitstash",
        "gitcheckout"
    ]
);
