var path = require('path');
module.exports = {
  module: {
    loaders: [
      {
        test : /\.jsx?/,
        include : path.resolve(__dirname, 'src'),
        loader : 'babel'
      }
    ],
  },
  output: {
    filename: './build/bundle.js'
  },
  entry: './src/client/index.js'
};
