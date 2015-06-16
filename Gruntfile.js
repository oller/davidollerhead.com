'use strict';

// Directory reference:
//   css: css
//   sass: _scss
//   javascript: js
//   images: img
//   fonts: fonts

var ngrok = require('ngrok');

module.exports = function(grunt) {
    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    // Load all Grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Configurable paths
        davidollerhead: {
            app: 'app',
            dist: 'dist'
        },
        watch: {
            sass: {
                files: ['<%= davidollerhead.app %>/_scss/**/*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer:server']
            },
            autoprefixer: {
                files: ['<%= davidollerhead.app %>/css/**/*.css'],
                tasks: ['copy:stageCss', 'autoprefixer:server']
            },
            jekyll: {
                files: [
                    '<%= davidollerhead.app %>/**/*.{html,yml,md,mkd,markdown}',
                    '!<%= davidollerhead.app %>/_bower_components/**/*'
                ],
                tasks: ['jekyll:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '.jekyll/**/*.html',
                    '.tmp/css/**/*.css',
                    '{.tmp,<%= davidollerhead.app %>}/<%= js %>/**/*.js',
                    '<%= davidollerhead.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '.jekyll',
                        '<%= davidollerhead.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: [
                        '<%= davidollerhead.dist %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        '.jekyll',
                        'test',
                        '<%= davidollerhead.app %>'
                    ]
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= davidollerhead.dist %>/*',
                        // Running Jekyll also cleans the target directory.  Exclude any
                        // non-standard `keep_files` here (e.g., the generated files
                        // directory from Jekyll Picture Tag).
                        '!<%= davidollerhead.dist %>/.git*'
                    ]
                }]
            },
            server: [
                '.tmp',
                '.jekyll'
            ]
        },
        sass: {
            options: {
                bundleExec: true,
                debugInfo: false,
                lineNumbers: false,
                loadPath: [
                    'app/_bower_components',
                    'app/_bower_components/animate-sass'
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= davidollerhead.app %>/_scss',
                    src: '**/*.{scss,sass}',
                    dest: '.tmp/css',
                    ext: '.css'
                }]
            },
            server: {
                options: {
                    debugInfo: true,
                    lineNumbers: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= davidollerhead.app %>/_scss',
                    src: '**/*.{scss,sass}',
                    dest: '.tmp/css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 5 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= davidollerhead.dist %>/css',
                    src: '**/*.css',
                    dest: '<%= davidollerhead.dist %>/css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css',
                    src: '**/*.css',
                    dest: '.tmp/css'
                }]
            }
        },
        jekyll: {
            options: {
                bundleExec: true,
                config: '_config.yml,_config.build.yml',
                src: '<%= davidollerhead.app %>'
            },
            dist: {
                options: {
                    dest: '<%= davidollerhead.dist %>',
                }
            },
            server: {
                options: {
                    config: '_config.yml',
                    dest: '.jekyll'
                }
            },
            check: {
                options: {
                    doctor: true
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= davidollerhead.dist %>'
            },
            html: '<%= davidollerhead.dist %>/index.html'
        },
        usemin: {
            options: {
                assetsDirs: '<%= davidollerhead.dist %>',
            },
            html: ['<%= davidollerhead.dist %>/**/*.html'],
            css: ['<%= davidollerhead.dist %>/css/**/*.css']
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeComments: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= davidollerhead.dist %>',
                    src: '**/*.html',
                    dest: '<%= davidollerhead.dist %>'
                }]
            }
        },
        // Usemin adds files to concat
        concat: {},
        // Usemin adds files to uglify
        uglify: {},
        // Usemin adds files to cssmin
        cssmin: {
            dist: {
                options: {
                    check: 'gzip'
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    progressive: true,
                    optimizationLevel: 2
                },
                files: [{
                    expand: true,
                    cwd: '<%= davidollerhead.dist %>',
                    src: '**/*.{jpg,jpeg,png}',
                    dest: '<%= davidollerhead.dist %>'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= davidollerhead.dist %>',
                    src: '**/*.svg',
                    dest: '<%= davidollerhead.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= davidollerhead.app %>',
                    src: [
                        // Jekyll processes and moves HTML and text files.
                        // Usemin moves CSS and javascript inside of Usemin blocks.
                        // Copy moves asset files and directories.
                        'img/**/*',
                        'fonts/**/*',
                        // Like Jekyll, exclude files & folders prefixed with an underscore.
                        '!**/_*{,/**}',
                        // Explicitly add any files your site needs for distribution here.
                        '_bower_components/jquery/jquery.min.js',
                        'favicon.ico',
                        'favicon*.png',
                        'apple-touch*.png',
                        'mstile*.png'
                    ],
                    dest: '<%= davidollerhead.dist %>'
                }]
            },
            // Copy CSS into .tmp directory for Autoprefixer processing
            stageCss: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= davidollerhead.app %>/css',
                    src: '**/*.css',
                    dest: '.tmp/css'
                }]
            }
        },
        filerev: {
            options: {
                length: 4
            },
            dist: {
                files: [{
                    src: [
                        '<%= davidollerhead.dist %>/js/**/*.js',
                        '<%= davidollerhead.dist %>/css/**/*.css',
                        //'<%= davidollerhead.dist %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
                        '<%= davidollerhead.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff,woff2}'
                    ]
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= davidollerhead.app %>/js/**/*.js',
                'test/spec/**/*.js'
            ]
        },
        scsslint: {
            allFiles: [
                '<%= davidollerhead.app %>/_scss/**/*.scss',
                '!<%= davidollerhead.app %>/_scss/vendor/**/*.scss'
            ],
            options: {
                config: '.scss-lint.yml',
                reporterOutput: null,
                colorizeOutput: true
            }
        },
        stripmq: {
            options: {
                width: 1200,
                type: 'screen'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= davidollerhead.dist %>/css',
                    src: '*.css',
                    dest: '<%= davidollerhead.dist %>/css',
                    ext: '.ie8.css'
                }]
            }
        },
        concurrent: {
            server: [
                'sass:server',
                'copy:stageCss',
                'jekyll:server'
            ],
            dist: [
                'sass:dist',
                'copy:dist'
            ]
        },
        responsive_images: {
            resize: {
                options: {
                    engine: 'gm',
                    upscale: false,
                    newFilesOnly: true,
                    sizes: [
                        { name: 'lq', width: '100%', quality: 15 }, // Low Quality Placeholder
                        { name: 'xs', width: 200 },
                        { name: 'sm', width: 400 },
                        { name: 'md', width: 800 },
                        { name: 'lg', width: 1200 }
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= davidollerhead.app %>/img',
                    src: [
                        '{about,posts,work}/**/*.{jpg,gif,png}'
                    ],
                    dest: '<%= davidollerhead.dist %>/img'
                }]
            }
        },
        parker: {
            options: {
                file: '<%= davidollerhead.app %>/CSSReport.md',
                colophon: true
            },
            src : [
                '<%= davidollerhead.dist %>/css/main.css'
            ]
        },
        pagespeed: {
            options: {
                nokey: true,
                locale: 'en_GB',
                 threshold: 40
            },
            mobile: {
                options: {
                    strategy: 'mobile'
                }
            },
            desktop: {
                options: {
                    strategy: 'desktop'
                }
            }
        },
        'ftp-deploy': {
            prod: {
                auth: {
                    host: 'ftp.davidollerhead.com',
                    port: 21
                },
                src: '<%= davidollerhead.dist %>',
                dest: '_sites/davidollerhead.com/'
            }
        }
    });

    // Define Tasks
    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    // No real tests yet. Add your own.
    grunt.registerTask('test', [
        //   'clean:server',
        //   'concurrent:test',
        //   'connect:test'
    ]);

    grunt.registerTask('check', [
        'clean:server',
        'jekyll:check',
        'sass:server',
        'jshint:all',
        'scsslint'
    ]);


    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 9000;

        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });

    grunt.registerTask('build', [
        'clean',
        // Jekyll cleans files from the target directory, so must run first
        'jekyll:dist',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'autoprefixer:dist',
        'cssmin',
        'uglify',
        'responsive_images',
        'imagemin',
        'svgmin',
        'parker',
        'stripmq',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('deploy', [
        'ftp-deploy'
    ]);

    grunt.registerTask('default', [
        'check',
        'test',
        'build',
        'ftp-deploy'
    ]);
};
