'use strict';

var request = require('request');

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      dev: {
        NODE_ENV: 'DEVELOPMENT'
      },
      prod: {
        NODE_ENV: 'PRODUCTION'
      }
    },
    clean: ['dist'],
    copy: {
      templates: {
        files: [
          {expand: true, flatten: true, src: ['public/app/features/messages/message.html'], dest: 'dist/app/features/messages/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['public/app/features/sidebar/contact.html'], dest: 'dist/app/features/sidebar/', filter: 'isFile'}
        ]
      },
      css: {
        files: [
          {expand: true, flatten: true, src: ['public/css/main.css'], dest: 'dist/css/', filter: 'isFile'}
        ]
      }
    },
    preprocess: {
      html: {
        src: 'public/index.html',
        dest: 'dist/index.html',
      }
    },
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['public/**/*.js', '!public/**/*.spec.js', '!public/bower_components/**/*.js'],
        dest: 'dist/js/smssync.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! smsSync - Created by Evan Klein */\n\n'
      },
      dist: {
        files: {
          'dist/js/smssync.min.js': ['dist/js/smssync.js']
        }
      }
    },
    develop: {
      server: {
        file: 'app.js'
      },
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: [
          'public/css/*.css'
        ],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: ['public/*.html'],
        options: {
          livereload: reloadPort
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    jshint: {
      src: ['public/app/**/*.js', '!public/app/**/*.spec.js'],
      options : {
        jshintrc: true
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'jshint'
  ]);

  grunt.registerTask('serve-dev', [
    'env:dev',
    'clean',
    'copy:css',
    'preprocess:html',
    'develop',
    'watch'
  ]);

  grunt.registerTask('serve-prod', [
    'env:prod',
    'clean',
    'copy',
    'preprocess:html',
    'concat',
    'uglify',
    'develop',
    'watch'
  ]);

  grunt.registerTask('analyze', [
    'jshint'
  ]);

  grunt.registerTask('test', [
    'karma'
  ]);
};
