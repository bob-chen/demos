module.exports = {
  entry: ['./index.js'],
  output: {
    filename: 'bundle.js'
  },
  devtool: 'sourcemap',
  watch: true,
  module: {
    loaders: [{
      test: /index.js/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-3'],
        plugins: [
          ["transform-runtime", {
            "polyfill":false,
            "regenerator":true
          }]
        ]
      }                                          
    }]
  }
}