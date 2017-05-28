module.exports = {
  entry:'./compiled/main.js',
  output: {
    filename: './out/game.js',
    path: __dirname
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  }
};
