module.exports = {
  entry : './public/javascripts/app.js',
  output : {
    path : './public/javascripts/',
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