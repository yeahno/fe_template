var path=require("path");

module.exports = function() {
    var project_name="app";
    var argvs=process.argv;
    for (var i = 0;i<argvs.length;i++) {
        if(argvs[i].indexOf('--')==0){
            project_name=argvs[i].substr(2);
            break;
        }
    }
    return {
        projectName:project_name,
        buildDir:  path.resolve('build',project_name),
        projectDir: path.resolve('src',project_name)
    };
}