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
		  'tmp/<%= pkg.file %>.min.js':'src/<%=pkg.file %>.js'
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
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      js:{
        src: [
          'bower_components/jquery-shapefly-client/dist/jquery-shapefly-client.js',
          'tmp/<%= pkg.file %>.min.js'
        ],
        dest: "dist/<%= pkg.file %>.js"
      }
    },
    copy: {
      build: {
	    files: [{
			expand: true,
			cwd: 'bower_components/jquery-shapefly-client/dist/',
			src: '**/*.html',
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
  grunt.registerTask('default', ['jshint','uglify','concat','copy']);
};