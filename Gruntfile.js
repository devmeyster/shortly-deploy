module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      // options: {
      //   mangle: ''
      // },
      my_target: {
        files: {
          'public/dist/app.min.js': [
            'public/client/*.js'
          ],
          'public/dist/vendor.min.js':[
            'public/lib/jquery.js',
            'public/lib/underscore.js',
            'public/lib/backbone.js',
            'public/lib/handlebars.js',
          ]
        }
      }
    },

    jshint: {
      files: [
        // Add filespec list here
        './*.js',
        'public/client/*.js',
        'app/*.js',
        'app/**/*.js',
        'lib/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js',
          'node_modules/**'
        ]
      }
    },

    cssmin: {
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      options: {
        stdout: true
      },
      prod: {
        command: [
          'azure site scale mode standard shortly-artur',
          'git push azure master',
          'azure site scale mode free shortly-artur'
        ].join('&&')
      },
      'server-dev': {
        command: [
          './dev-env.sh',
        ].join('&&'),
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    /*var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);*/

    grunt.task.run([ 'shell:server-dev','watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'uglify'
  ]);

  grunt.registerTask('deploy', function(n){
    if(grunt.option('prod')) {
      grunt.task.run([
        'test',
        'jshint',
        'shell:prod'
      ])
    } else {
      grunt.task.run([
        'test',
        'build',
        'jshint',
        'server-dev'
      ]);
    }
    // add your deploy tasks here
  });


};
