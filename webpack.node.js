const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ics2csv.js',
    library: 'ics2csv',
    libraryTarget: 'commonjs2',
  },
};
