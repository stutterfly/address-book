/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    project: {
      src: '',
      css: 'css',
      sass: 'sass',
      js: [
        '<%= project.src %>/js/*.js'
      ]
    },
    // Task configuration.
    connect: {
      server: {
        options: {
          port: 80,
          open: true,
          base: 'build',
          keepalive: true
        }
      },
      dev: {
        options: {
          port: 8080,
          open: true
        }
      }
    },
    clean: {
      build: ['build']
    },
    libsass: {
      dev: {
        files: {
          '<%= project.css %>/styles.css': '<%= project.sass %>/styles.scss'
        }
      }
    },
    requirejs: {
      js: {
        options: {
          baseUrl: './js',
          mainConfigFile: './js/main.js',
          name: 'main',
          out: './build/js/main.js',
          preserveLicenseComments: false
        }
      },
      css: {
        options: {
          optimizeCss: 'standard',
          cssIn: './css/styles.css',
          out: 'build/css/styles.css'
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          src: [
            'fonts/**',
            'index.html'
          ],
          dest: 'build/'
        }]
      },
      requirejs: {
        files: [{
          src: ['node_modules/requirejs/require.js'],
          dest: 'build/js/require.js'
        }]
      }
    },
    replace: {
      appbuild: {
        src: ['build/index.html'],
        overwrite: true,
        replacements: [{
          from: './node_modules/requirejs/',
          to: "./js/"
        }]
      }
    },
    react: {
      jsx: {
        files: [
          {
            expand: true,
            cwd: './templates',
            src: [ '**/*.jsx' ],
            dest: './js/components',
            ext: '.js'
          }
        ]
      }
    },
    watch: {
      sass: {
        files: '<%= project.sass %>/{,*/}*.{scss,sass}',
        tasks: ['libsass:dev']
      },
      react: {
        files: './templates/**/*.jsx',
        tasks: ['react']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-libsass');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('default', ['connect:server']);
  grunt.registerTask('dev', ['connect:dev', 'react', 'libsass:dev', 'watch']);
  grunt.registerTask('build', ['clean', 'libsass:dev', 'react', 'requirejs', 'copy', 'replace']);
};