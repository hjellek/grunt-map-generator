/*
 * grunt-map-generator
 * https://github.com/hjellek/grunt-map-generator
 *
 * Copyright (c) 2015 Knut Eirik Leira Hjelle
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/tmp']
        },

        mkdir: {
            tmp: {
                options: {
                    mode: 0700,
                    create: ['test/tmp']
                }
            }
        },

        // Configuration to be run (and then tested).
        "grunt-map-generator": {
            test: {
                options: {
                    banner: 'Supports banner!\n',
                    outFile: "test/tmp/result",
                    sourceDir: "test/fixtures",
                    extension: [
                        '.html',
                        '.test'
                    ],
                    ignore: [
                        "c.html"
                    ],
                    template: function(file, basePath)
                    {
                        return file+"\n";
                    }
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*-test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'mkdir:tmp','grunt-map-generator:test', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
    grunt.registerTask('main', ['test']);

};
