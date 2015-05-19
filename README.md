# About
This repo is to help get you started building this [browserify pipeline documentation](http://jmm.github.io/browserify-pipeline-docs/).

# Building

## First time
* Clone this repo
* `cd` in
* `$ git checkout build`
* `$ sh setup.sh`
* Optionally create a `gulpfile-custom.js` file that exports a function that receives and returns a configuration object. See `gulpfile.js` for the relevant properties.

## Every time
* `$ node_modules/.bin/gulp build` (or `build:watch`).

Output should appear in the `dist` directory (default: `./dist`).

# Content
The content is in [jmm/browserify-pipeline-docs-content](https://github.com/jmm/browserify-pipeline-docs-content). You can submit issues or pull requests there to update it.

# Build System
The bulk of the build system is in [jmm/browserify-pipeline-docs-builder](https://github.com/jmm/browserify-pipeline-docs-builder).
