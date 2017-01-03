/*global module:false*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= pkg.licenses %> */\n',
        // Task configuration.
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        },
        // 压缩
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            main: {
                expand: true,
                cwd: 'src/',
                src: '**/*.js',
                dest: 'dist/'
            }
        },
        // concat: {
        //   options: {
        //     banner: '<%= banner %>',
        //     stripBanners: true
        //   },
        //   dist: {
        //     src: ['lib/<%= pkg.name %>.js'],
        //     dest: 'dist/<%= pkg.name %>.js'
        //   }
        // },
        // js代码校验
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            }
        },
        //   gruntfile: {
        //     src: 'Gruntfile.js'
        //   },
        //   lib_test: {
        //     src: ['lib/**/*.js', 'test/**/*.js']
        //   }
        // },
        // qunit: {
        //   files: ['test/**/*.html']
        // },
        // watch: {
        //   gruntfile: {
        //     files: '<%= jshint.gruntfile.src %>',
        //     tasks: ['jshint:gruntfile']
        //   },
        //   lib_test: {
        //     files: '<%= jshint.lib_test.src %>',
        //     tasks: ['jshint:lib_test', 'qunit']
        //   }
        // },
        // 自动添加requirejs配置
        bowerRequirejs: {
            dev: {
                rjsConfig: 'src/js/main.js',
                options: {
                    baseUrl: 'lib/',
                    transitive: true,
                    exclude:['require-css']
                }
            }
        }
    });
    // var target = grunt.option('target') || 'dev';
    // These plugins provide necessary tasks.
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Bower 相关
    //grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    // Default task.
    grunt.registerTask('default', ['bowerRequirejs','copy']);

    grunt.registerTask('build',['bowerRequirejs','copy']);
    grunt.registerTask('release',['bowerRequirejs','copy','uglify']);
};