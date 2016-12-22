"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-sass");

  grunt.initConfig({
    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },

    html: {
      files: [{
         expand: true,
         src: ["*.html"],
         dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    },

    sass: {
      style: {
        files: {
          "css/style.css": "sass/style.scss"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 2 versions"
            ]})
          ]
        },
        src: "css/*.css"
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "./build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"],
        options: {spawn: false}
      },
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"],
        options: {spawn: false}
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "postcss",
    "csso",
    "svgmin",
    "imagemin"
  };
