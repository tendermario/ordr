module.exports = {
  entry : './public/scripts/app.js',
  output : {
    path : './public/scripts/',
    filename : "bundle.js"
  },
  module : {
    loaders : [
      {
        test : /.js$/,
        exclude : /node_modules/,
        loader : 'babel',
        query : {
          presets : [
            'es2015'
          ]
        }
      }
    ]
  }
};