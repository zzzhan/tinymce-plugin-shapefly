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
		  'dist/<%= pkg.file %>.js':'src/<%=pkg.file %>.js'
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
    copy: {
      build: {
	    files: [{
			expand: true,
			cwd: 'bower_components/jquery-shapefly-client/dist/',
			src: '**/*',
			dest:'dist/'
		  },{
			expand: true,
			cwd: 'src',
			src: '**/*.php',
			dest:'dist/'
		  }]
	  }
	},
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint','uglify','copy']);
};