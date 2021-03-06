/*
 * grunt-bing-translate
 * https://github.com/atysoncadenhead/grunt-bing-translate
 *
 * Copyright (c) 2013 Tyson Cadenhead
 * Licensed under the MIT license.
 */

 /*jslint node: true */

'use strict';

module.exports = function(grunt) {

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
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bing_translate: {
      "options": {
        "clientId": require("./config.json").clientId, // Replace this with your Bing Translate Client ID
        "clientSecret": require("./config.json").clientSecret, // Replace this with your Bing Translate Client Secret
        "defaultLanguage": "en",
        "languages": ["es", "fr"],
        "files": {
            "temp": {
                "template": "module.exports = { 'lang': '<%- language %>', 'words': <%- values %> };",
                "values": {
                    "hello": "Hello",
                    "world": "World"
                }
            }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'bing_translate', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
