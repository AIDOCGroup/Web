var gulp = require('gulp'),
    webpack = require('webpack'),
    minimist = require('minimist'),
    proxy = require('http-proxy-middleware'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    history = require('connect-history-api-fallback'),
    del = require('del');

options = minimist(process.argv.slice(2))
isProduction = options.env == 'prod'

buildPath = './build/';


function createTask(task, taskName) {
    if (task.type == 'concat') {
        (function (task, taskName) {
            var cleanTaskName = taskName + '.clean';
            var runTaskName = taskName + '.run';
            gulp.task(cleanTaskName, function () {
                return gulp.src(task.build + task.file).pipe(plugins.clean({ force: true }));
            })
            gulp.task(runTaskName, function () {
                return gulp.src(task.src)
                    .pipe(plugins.concat(task.file))
                    .pipe(plugins.if(task.encrypt_js, plugins.uglify()))
                    .pipe(plugins.if(task.encrypt_css, plugins.minifyCss()))
                    .pipe(gulp.dest(task.build))
            })
            return gulp.task(taskName, [cleanTaskName, runTaskName], function () {
                browserSync.reload();
            })
        })(task, taskName)
    }
    else if (task.type == 'copy') {
        (function (task, taskName) {
            var cleanTaskName = taskName + '.clean';
            gulp.task(cleanTaskName, function () {
                return gulp.src(task.build).pipe(plugins.clean({ force: true }));
            })
            return gulp.task(taskName, [cleanTaskName], function () {
                return gulp.src(task.src).pipe(gulp.dest(task.build))
            })
        })(task, taskName)
    }
    else if (task.type == 'less') {
        (function (task, taskName) {
            var cleanTaskName = taskName + '.clean';
            var runTaskName = taskName + '.run';
            gulp.task(cleanTaskName, function () {
                return gulp.src(task.build + task.file).pipe(plugins.clean({ force: true }));
            })
            gulp.task(runTaskName, function () {
                return gulp.src(task.src)
                    .pipe(plugins.less())
                    .pipe(plugins.concat(task.file))
                    .pipe(gulp.dest(task.build))
            })
            gulp.task(taskName, [cleanTaskName, runTaskName], function () {
                browserSync.reload();
            })
        })(task, taskName)

    }
    else if (task.type == 'webpack') {
        (function (task, taskName) {
            return gulp.task(taskName, function (callback) {
                webpack(require("./gulp/webpack.config.js")(task, isProduction), function () {
                    browserSync.reload();
                    callback();
                });
            })
        })(task, taskName)
    }
    else if (task.type == 'clean') {
        (function (task, taskName) {
            return gulp.task(taskName, function () {
                return gulp.src(task.src).pipe(plugins.clean({ force: true }));
            });
        })(task, taskName)
    }
    else if (task.type == 'md5') {
        (function (task, taskName) {
            var taskRev = taskName + ".rev",
                taskReplace = taskName + ".replace",
                taskClean = taskName + ".clean",
                manifestName = taskName + ".rev.json";
            gulp.task(taskRev, function () {
                var pipe = gulp.src(task.src).pipe(plugins.rev()).pipe(gulp.dest(task.build))
                    .pipe(plugins.rev.manifest()).pipe(plugins.rename(manifestName)).pipe(gulp.dest(task.build));

                return pipe;
            });
            gulp.task(taskReplace, function () {
                var files = require(task.build + manifestName);
                var pipe = gulp.src(task.page);
                for (var file in files) {
                    console.log(task.page, file, files[file], task.pageBuild);
                    pipe.pipe(plugins.replace(file, files[file]));
                }
                pipe.pipe(gulp.dest(task.pageBuild));
                return pipe;
            });
            gulp.task(taskClean, function () {
                return gulp.src([
                    task.build + "/*.rev.json"
                ]).pipe(plugins.clean({ force: true }));
            });
        })(task, taskName)
    }
}

var tasks = [];

gulp.task('browser-sync', function () {
    browserSync.init({
        startPath: '/aidoc-admin/',
        server: {
            baseDir: buildPath,

            middleware: [proxy('/api', {
                    target:'http://192.168.8.101:81',
                    /*target: 'http://127.0.0.1:8400',*/
                //target: 'https://www.kelexuexi.com',
                changeOrigin: true,
                logLevel: 'debug'
            }), history({
                rewrites: [
                    {
                        from: /^\/aidoc-admin\/assets\/(.*)$/,
                        to: function(context) {
                            return '/assets/' + context.match[1]
                        }
                    }
                    
                ]
            })]
        }
    });
});
tasks.push('browser-sync');

var config = require('./gulp/gulp.config')(isProduction, buildPath);

for (var key in config["base"]) {
    var task = config["base"][key];
    var taskName = "base." + key;
    createTask(task, taskName);
    gulp.watch(task.watch || task.src, [taskName])
    tasks.push(taskName);
}

for (var key in config["prod"]) {
    var task = config["prod"][key],
        taskName = key;
    createTask(task, taskName);
}

gulp.task('clean', function () {
    return gulp.src([buildPath+'assets/'])
        .pipe(plugins.clean({ force: true }));
});

var timestamp = parseInt((new Date()).getTime()/100000),
    options = {
        connect: {
            'region': 'oss-cn-hangzhou',
            'accessKeyId': 'LTAIdHEXYDE6UM0W',
            'accessKeySecret': 'mzLC7wZPLKlhjX45IB2vDldjZbZb6O',
            'bucket': 'tianyiaidoc',
        },
        setting: {
            dir: `static/admin/${timestamp}/assets`, // root directory name 
            noClean: true, // compare with the last cache file to decide if the file deletion is need 
            force: true, // ignore cache file and force re-upload all the files 
            quiet: true // quiet option for oss deleteMulti operation 
        }
    };
gulp.task('upload', function () {
    return gulp.src(buildPath+'assets/**/*').pipe(plugins.ossSync(options));
});
gulp.task('release', ['upload'], function () {
    return gulp.src(buildPath+'index.html')
        .pipe(plugins.replace('/aidoc-admin/assets/', `http://tianyiaidoc.oss-cn-hangzhou.aliyuncs.com/${options.setting.dir}/`))
        .pipe(gulp.dest(buildPath));
});

gulp.task("default", ['clean'], function() {
    if(isProduction) {
        return runSequence(tasks, 
        "app.script.md5.rev", "app.script.md5.replace", "app.script.md5.clean",
        "app.style.md5.rev", "app.style.md5.replace", "app.style.md5.clean",
        "app.md5.clean", "release")
    }
    else return runSequence(tasks);
});
