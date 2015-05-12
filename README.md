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
