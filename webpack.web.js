const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist-web'),
    filename: 'ics2csv.js',
    library: 'ics2csv',
  },
};
