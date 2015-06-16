# davidollerhead.com

Another iteration of my portfolio site, this time with jekyll.

Rebuilt using [Yeoman](http://wwwy.yeoman.io) and the excellent [Jekyll-rb generator](https://github.com/robwierzbowski/generator-jekyllrb)

## Get going

First off, we're going to need the following installed:

- [brew](http://brew.sh/)
- [bundler](http://bundler.io/)
- [node](http://nodejs.org/)
- [bower](http://bower.io/)

Now, we can install all the dependencies.

```bash
brew install GraphicsMagick
bundle install
npm install
bower install
```

Now we can get grunt to do the heavy lifting.

## Grunt Workflow

#### grunt serve

Compiles all files and opens the site in your default browser. A watch task watches for changes to files, recompiles if necessary, and injects the changes into the browser with LiveReload.

#### grunt check

Checks code quality with Jshint and SCSS Lint, and Jekyll health with `jekyll doctor`.

#### grunt build

Builds an optimized site to the dist directory. [Usemin blocks](https://github.com/yeoman/grunt-usemin#the-useminprepare-task) are concatenated, [CSS](https://github.com/gruntjs/grunt-contrib-cssmin), [images](https://github.com/gruntjs/grunt-contrib-imagemin), and [HTML](https://github.com/gruntjs/grunt-contrib-htmlmin) are minified, [JavaScript is uglified](https://github.com/gruntjs/grunt-contrib-uglify), and assets are [revved](https://github.com/yeoman/grunt-filerev) for cache busting.

`grunt serve:dist` will run `grunt build` and open the result in your default browser

#### grunt psi-ngrok

A task to build and locally host a production version of the site, use ngrok to tunnel out a public address and pass this to Google's PageSpeed Insights API.  Returning the score for both mobile and desktop and any recommendations.  A threshold score can be set should a performance budget be imopsed.

This requires `grunt serve:dist` to have been previously run so a localhost webserver is hosting the production build.

#### grunt deploy

A task that uploads the content of the dist directory to the ftp details specified in the gruntfile.

#### grunt (default)

`grunt` on its own is a complete test, build and deployment task that runs `grunt check`, any tests, `grunt build` then finally `grunt deploy` to ftp upload the generated site.


## To Do

- Navigation Weighting / Sorting
- ~~Lazy Load Carousel~~
- ~~Carousel Prev / Next icons~~
- ~~Responsive Images~~
- ~~Contact Form Submission~~
- ~~Profile Image Position~~
