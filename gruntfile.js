module.exports = function(grunt) {

    require('time-grunt')(grunt); // Display de tempo de execução de Tarefas
    // Configurações do Projeto
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeRedundantAttributes: true,
                    collapseBooleanAttributes: true
                },
                files: {
                    'dist/index.html': 'src/index.html',
                }
            }
        }, // HTMLmin

        // Css
        compass: {
            dist: {
                options: { // Localização das pastas de desenvolvimento
                    cssDir: ["dist/css"],
                    sassDir: ["src/sass"],
                    environment: 'production'
                },
                dev: {
                    options: { // Pastas Destino
                        sassDir: 'sass',
                        cssDir: 'css'
                    }
                }
            }
        }, // Sass
        csscomb: {
            bar: {
                files: {
                    'src/sass/main.scss': ['src/sass/main.scss']
                }
            }
        }, // CssComb

        // Js
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            all: ['src/js/**/*.js'],

        }, // JsHint
        concat: {
            dist: {
                src: ['src/*.js'],
                dest: 'src/main.js',
            },
        }, // Concat
        uglify: {
            options: {
                banner: "/* Arquivo não minificado na pasta src/js/ :D */\n"
            },
            my_target: {
                files: {
                    'dist/js/main.js': ['src/js/main.js']
                }
            }
        }, // Uglify

        // Img
        imageoptim: {
            options: {
                jpegMini: false,
                imageAlpha: true,
                quitAfter: true
            },
            otimizar: {
                src: ['src/img/']
            }
        }, // ImageOptim
        copy: {
            main: {
                src: 'src/img/*',
                dest: 'dist/img/',
                flatten: true,
                expand: true,
                filter: 'isFile',
            },
        }, // Copy
        //FTP
        // 'ftp-deploy': {
        //     build: {
        //         auth: {
        //             host: 'ftp.yoursite.com',
        //             port: 21,
        //             authKey: 'key1' // Especificado no Arquivo ".ftppass"
        //         },
        //         src: '../dist/',
        //         dest: '/www/public_html/',
        //         exclusions: [
        //             '../**/.DS_Store',
        //             '../**/Thumbs.db',
        //             '../.git',
        //             '../.gitignore',
        //             '../README.md',
        //             '../src',
        //             '../assets'
        //         ]
        //     }
        // }
    });

    // Carregar Modulos das Tarefas
    // HTML
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Css
    grunt.loadNpmTasks('grunt-contrib-compass'); // Commpilador Sass
    grunt.loadNpmTasks('grunt-csscomb'); // Organizador de Css
    // JS
    grunt.loadNpmTasks('grunt-contrib-uglify'); // Minificador JS
    grunt.loadNpmTasks('grunt-contrib-jshint'); // Verificador de Erros em JS 
    grunt.loadNpmTasks('grunt-contrib-concat'); // Juntar varios Js's em um
    // Img
    grunt.loadNpmTasks('grunt-imageoptim'); // Otimizar Img's por App's
    grunt.loadNpmTasks('grunt-contrib-copy'); // Copiar Img's
    // FTP
    grunt.loadNpmTasks('grunt-ftp-deploy'); // FTP

    // Tarefas Agrupadas
    grunt.registerTask('html', ['htmlmin']); // HTML
    grunt.registerTask('css', ['csscomb', 'compass']); // CSS
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']); // JS
    grunt.registerTask('img', ['imageoptim', 'copy']); // IMG's

    // Tarefas Padrões
    grunt.registerTask('ftp', ['ftp-deploy'])
    grunt.registerTask('default', ['html', 'css', 'js', 'img']);

};