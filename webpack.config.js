module.exports = {
  entry: "./src/scribe-plugin-line-tooltip.js",
  output: {
    path: "dist",
    publicPath: "/assets/",
    filename: "scribe-plugin-line-tooltip.js",
    libraryTarget: "amd"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  }
};
