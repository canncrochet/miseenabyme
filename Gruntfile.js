'use strict';


module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        'pkg': pkg,

        'cfg': {
            'src': 'src',
            'build': 'webroot'
        },

        'connect': {
            'dev': {
                'options': {
                    'port': 9000,
                    'base': '<%= cfg.src %>',
                    'keepalive': true,
                    'hostname': '*'
                }
            }
        },

        'imagemin': {
            'default': {
                'files': [{
                    'expand': true,
                    'cwd': '<%= cfg.src %>',
                    'src': ['assets/**/*.{png,jpg,gif}', 'apple-touch-icon-precomposed.png'],
                    'dest': '<%= cfg.build %>/'
                }]
            }
        },

        'useminPrepare': {
            'html': ['<%= cfg.src %>/index.html'],
            'options': {
                'root': '<%= cfg.src %>',
                'dest': '<%= cfg.build %>'
            }
        },

        'usemin': {
            'html': ['<%= cfg.build %>/index.html'],
            'assetsDirs': ['assets/']
        },

        'clean': {
            'default': ['<%= cfg.build %>']
        },

        'gh-pages': {
            'options': {
                'base': '<%= cfg.build %>'
            },
            'src': '**/*'
        },
        'copy': {
            'default': {
                'files': [{
                    'expand': true,
                    'flatten': true,
                    'dest': '<%= cfg.build %>',
                    'src': ['<%= cfg.src %>/*.html', 'CNAME'],
                    'filter': 'isFile'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('server', 'Start a local static webserver', ['connect:dev']);

    grunt.registerTask('default', 'Minify & optimize all files in src, output goes in webroot', [
        'clean',
        'imagemin',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'copy',
        'usemin',
        'gh-pages'
    ]);
};