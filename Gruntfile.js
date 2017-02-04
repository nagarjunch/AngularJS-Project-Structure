/**
 * Created by nagarjun on 2/2/17.
 */
//the wrapper function
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        // Turn on the server
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        // Add CSS and JS files within the bower components folder.
        wiredep: {
            target: {
                src: 'src/index.html',
                ignorePath: '../',
            }
        },

        "overrides":{
            "bootstrap" : {
                "main": [
                    "less/bootstrap.less",
                    "dist/css/bootstrap.css",
                    "dist/js/bootstrap.js"
                ]
            }
        },

        // Compile the Sass and make nice CSS.
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'src/content/css/app.css': ['src/content/sass/app.scss']
                }
            }
        },

        // Check the JavaScript
        jshint: {
            all: ['Gruntfile.js', 'src/app/**/*.js']
        },

        // Watch for changed files and update them.
        watch: {
            options: {
                livereload: 8500,
            },
            sass: {
                files: 'src/content/sass/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: false
                }
            },
            css: {
                files: ['**/*.css'],
            },
            scripts: {
                files: ['src/app/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                    livereload: false
                }
            }
        },

        // Clean the dist directory
        clean: {
            build: 'dist'
        },

        // Copy the index file to our distribution folder
        copy: {
            dist: {
                files: [
                    { src: ['src/index.html'], dest: 'dist/'},
                    { src: ['src/app/**/*.html'], dest : 'dist/'},
                    { src: ['src/content/images/**', 'src/content/svg/**'], dest: 'dist/'},
                    { src: ['*'], dest: 'dist/src/fonts/', expand: true, cwd: 'bower_components/components-font-awesome/fonts/'},
                ]
            }
        },

        // Minify the css files for distribution
        cssmin: {
            dist: {
                files: [{
                    dest: 'dist/src/css/vendor.css',
                    src: '.tmp/concat/css/vendor.css'
                },
                    {
                        dest: 'dist/src/css/app.css',
                        src: '.tmp/concat/css/app.css'
                    }]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    'dist/src/js/{,*/}*.js',
                    'dist/src/css/{,*/}*.css',
                ]
            }
        },

        // Prepare the files
        useminPrepare: {
            options: {
                dest: 'dist/src'
            },
            html: 'src/index.html'
        },

        // Run the usemin tasks to concat and uglify the files
        usemin: {
            html: 'dist/src/index.html',
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: false,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['src/app/{,*/}*.html'],
                    dest: 'dist'
                }]
            }
        },

        ngtemplates: {
            dist: {
                options: {
                    module: 'app',
                    htmlmin: '<%= htmlmin.dist.options %>',
                    usemin: 'js/app.js',
                },
                cwd: 'src',
                src: 'app/**/*.html',
                dest: '.tmp/concat/js/templates.js'
            }
        }

    });

    // load grunt tasks by reading package.json devDependencies
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['clean:build', 'wiredep', 'jshint', 'sass', 'concurrent']);

    // the build task to get everything ready for production
    grunt.registerTask('build', ['clean:build', 'useminPrepare', 'ngtemplates', 'sass', 'copy', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin']);

};