const path = require('path');

module.exports = {
  entry: ['./index.js', './utils.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
};