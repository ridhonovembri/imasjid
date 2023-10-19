const { defineConfig } = require('@vue/cli-service')
const path = require('path')


module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  devServer: {
    // outputDir: path.resolve(__dirname,'../BE/public'),
    proxy:{
      '^/api':{
        target: 'http://localhost:3000'
      }
    }
  }
})
