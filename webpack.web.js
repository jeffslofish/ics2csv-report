const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist-web'),
    filename: 'ics2csv.js',
    library: 'ics2csv',
  },
};
