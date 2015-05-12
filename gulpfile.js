var
  path = require('path'),
  cfg;

cfg = {
  // Content files input.
  'paths.content': path.join(
    __dirname, 'content'),
  // Built output.
  'paths.dist': path.join(__dirname, 'dist'),
  // Build artefacts.
  'paths.build': path.join(__dirname, 'build'),
  'del.force': false,
  gulp: require('gulp'),
};

try {
  cfg = require('./gulpfile-custom')(cfg);
}
catch (e) {}
finally {
  if (cfg) {
    require('./builder')(cfg);
  }
}
