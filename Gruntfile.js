module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: {toplevel: true},
        squeeze: {dead_code: false},
        codegen: {quote_keys: true}
      },
      build: {
		files: {
		  'dist/<%= pkg.file %>.min.js':'src/<%=pkg.file %>.js'
		}
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/*.js'
      ]
    },
    cssmin: {
      options: {
        report: 'gzip'
      },
      build: {
        files: {
        'dist/<%= pkg.file %>.min.css':'src/<%=pkg.file %>.css'
        }
      }
    },
    clean: ['dist'],
    copy: {
      build: {
	    files: [{
			expand: true,
			cwd: 'src',
			src: '**/*',
			dest:'dist/'
		  }]
	  }
	},
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint','clean','uglify','cssmin','copy']);
};