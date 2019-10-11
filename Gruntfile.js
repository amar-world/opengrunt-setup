    'use strict';

    module.exports = function (grunt) {

    	require('jit-grunt')(grunt, {
    		configureProxies: 'grunt-connect-proxy'
    	});



    	grunt.initConfig({

    		settings: {
    			connect: {
    				host: 'localhost',
    				port: 8070
    			},
    			proxy: {
    				// host: '101.53.157.190',
    				host: 'localhost',
    				port: 8080
    			}
    		},

    		connect: {
    			options: {
    				port: 8070,
					hostname: '*',
					livereload:true,
    				middleware: function (connect, options, defaultMiddleware) {
						// defaultMiddleware.unshift(function (req, res, next) {
						// 	if (req.url !== '/hello/world') return next();

						// 	//res.end('Hello, world from port #' + options.port + '!');
						// });
    					var proxy = require("grunt-connect-proxy/lib/utils").proxyRequest;
    					return [
    						proxy
    					].concat(defaultMiddleware);
    				}
				},
    			proxies: [{
    					context: "/destinations/Golit",
    					host: '<%= settings.proxy.host %>',
    					port: '<%= settings.proxy.port %>',
    					headers: {
    						"host": '<%= settings.proxy.host %>',
    						port: '<%= settings.proxy.port %>'
    					},
    					changeOrigin: true,
    					rewrite: {
    					// "^/destinations/Golit": "/hr-odata-modules/golit/dev/odata.svc/"
    					"^/destinations/Golit": ""
    					},
    					headers: {
    						"X-Proxied-Header": "added"
    					},
    					ws: true
					}
    				// , 
    				// {
    				// 	context: '/hr-odata-modules',
    				// 	host: '<%= settings.proxy.host %>',
    				// 	port: '<%= settings.proxy.port %>',
    				// 	https: false
    				// }
    			],
    			src: {},
    			dist: {}
    		},

    		watch: {
    			options: {
    				livereload: true
    			},
    			css: {
    				files: ['devapp/**/webapp/**/*.less', 'devapp/**/webapp/**/*.css'],
    				tasks: ['build']
    			},
    			js: {
    				files: ['devapp/**/webapp/**/*.js', 'devapp/**/webapp/**/*.xml', 'devapp/**/webapp/**/*.json', 'devapp/**/webapp/**/*.html', 'devapp/**/webapp/**/*.properties'],
    				tasks: ['build']
    			}
    		},

    		openui5_connect: {
    			options: {
    				resources: [
    					'resources',
    					'bower_components/openui5-sap.m/resources',
    					'bower_components/openui5-themelib_sap_belize/resources'
    				],
    				testresources: [
    					'resources',
    					'bower_components/openui5-sap.m/test-resources',
    					'bower_components/openui5-themelib_sap_belize/test-resources'
    				]
    			},
    			src: {
    				options: {
    					appresources: 'devapp'
    				}
    			},
    			dist: {
    				options: {
    					appresources: 'dist'
    				}
    			}
    		},

    		openui5_preload: {
    			component: {
    				options: {
    					resources: {
    						cwd: 'devapp',
    						// prefix: 'com/golit.ms.landingpage',
    						src: [

    							'**/*.js',
    							'**/*.fragment.html',
    							'**/*.fragment.json',
    							'**/*.fragment.xml',
    							'**/*.view.html',
    							'**/*.view.json',
    							'**/*.view.xml',
    							'**/*.properties',
    							'**/*.css',
    							'manifest.json',
    							'!test/**'
    						]
    					},
    					dest: 'dist'
    				},
    				components: true
    			}
    		},

    		clean: {
    			dist: 'dist',
    			coverage: 'coverage'
    		},

    		uglify: {
    			options: {
    				mangle: true,
    				compress: {
    					drop_console: true,
    					dead_code: false,
    					unused: false
    				}
    			},
    			files: {
    				expand: true,
    				cwd: 'devapp',
    				src: ['devapp/**/webapp/**/*.js', 'devapp/**/webapp/**/*.xml', 'devapp/**/webapp/**/*.json', 'devapp/**/webapp/**/*.html', 'devapp/**/webapp/**/*.properties'],
    				dest: "dist"
    			}
    		},

    		copy: {
    			dist: {
    				files: [{
    					expand: true,
    					cwd: 'devapp',
    					src: [
    						'**',
    						'!test/**'
    					],
    					dest: 'dist'
    				}]
    			}
    		},

    		eslint: {
    			webapp: ['webapp']
    		},

    		// karma: {
    		// 	options: {
    		// 		basePath: 'webapp',
    		// 		frameworks: ['openui5', 'qunit'],
    		// 		openui5: {
    		// 			path: 'http://localhost:8080/resources/sap-ui-core.js'
    		// 		},
    		// 		client: {
    		// 			openui5: {
    		// 				config: {
    		// 					theme: 'sap_belize',
    		// 					language: 'EN',
    		// 					bindingSyntax: 'complex',
    		// 					compatVersion: 'edge',
    		// 					preload: 'async',
    		// 					resourceroots: {
    		// 						'sap.ui.demo.todo': './base'
    		// 					}
    		// 				}
    		// 			}
    		// 		},
    		// 		files: [{
    		// 				pattern: 'test/karma-main.js',
    		// 				included: true,
    		// 				served: true,
    		// 				watched: true
    		// 			},
    		// 			{
    		// 				pattern: '**',
    		// 				included: false,
    		// 				served: true,
    		// 				watched: true
    		// 			}
    		// 		],
    		// 		proxies: {
    		// 			'/base/resources': 'http://localhost:8080/resources',
    		// 			'/base/test-resources': 'http://localhost:8080/test-resources',
    		// 		},
    		// 		reporters: ['progress'],
    		// 		port: 8080,
    		// 		logLevel: 'INFO',
    		// 		browsers: ['Chrome']
    		// 	},
    		// 	ci: {
    		// 		singleRun: true,
    		// 		browsers: ['PhantomJS'],
    		// 		preprocessors: {
    		// 			'{webapp,webapp/!(test)}/*.js': ['coverage']
    		// 		},
    		// 		coverageReporter: {
    		// 			includeAllSources: true,
    		// 			reporters: [{
    		// 					type: 'html',
    		// 					dir: '../coverage/'
    		// 				},
    		// 				{
    		// 					type: 'text'
    		// 				}
    		// 			],
    		// 			check: {
    		// 				each: {
    		// 					statements: 100,
    		// 					branches: 100,
    		// 					functions: 100,
    		// 					lines: 100
    		// 				}
    		// 			}
    		// 		},
    		// 		reporters: ['progress', 'coverage'],
    		// 	},
    		// 	watch: {
    		// 		client: {
    		// 			clearContext: false,
    		// 			qunit: {
    		// 				showUI: true
    		// 			}
    		// 		}
    		// 	},
    		// 	coverage: {
    		// 		singleRun: true,
    		// 		browsers: ['PhantomJS'],
    		// 		preprocessors: {
    		// 			'{webapp,webapp/!(test)}/*.js': ['coverage']
    		// 		},
    		// 		coverageReporter: {
    		// 			includeAllSources: true,
    		// 			reporters: [{
    		// 					type: 'html',
    		// 					dir: '../coverage/'
    		// 				},
    		// 				{
    		// 					type: 'text'
    		// 				}
    		// 			]
    		// 		},
    		// 		reporters: ['progress', 'coverage'],
    		// 	}
    		// }

    	});

    	// These plugins provide necessary tasks.
    	grunt.loadNpmTasks('grunt-connect-proxy');
    	grunt.loadNpmTasks('grunt-contrib-connect');
    	grunt.loadNpmTasks('grunt-contrib-clean');
    	grunt.loadNpmTasks("grunt-contrib-uglify");
    	grunt.loadNpmTasks('grunt-contrib-copy');
    	grunt.loadNpmTasks('grunt-openui5');
    	grunt.loadNpmTasks('grunt-eslint');
    	grunt.loadNpmTasks('grunt-karma');
    	grunt.loadNpmTasks("grunt-contrib-watch");

    	// Server task
    	grunt.registerTask('serve', function (target) {
    		//console.log(target);
    		grunt.task.run("configureProxies:" + (target || "src"));
    		// grunt.task.run("openui5_connect:" + (target || "src") + ":keepalive");
    		grunt.task.run('openui5_connect:' + (target || 'src'));
    		grunt.task.run('watch');
    	});

    	// Linting task
    	grunt.registerTask('lint', ['eslint']);

    	// Test tasks
    	grunt.registerTask('test', ['clean:coverage', 'openui5_connect:src', 'karma:ci']);
    	grunt.registerTask('karma-watch', ['openui5_connect:src', 'karma:watch']);
    	grunt.registerTask('coverage', ['clean:coverage', 'openui5_connect:src', 'karma:coverage']);

    	// Build task
    	grunt.registerTask('build', ['clean:dist', 'openui5_preload', 'copy']);

    	// Default task
    	grunt.registerTask('default', ['serve']);
    };