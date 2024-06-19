const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  /* publicPath: './' */
});

 module.exports = {
    publicPath: process.env.NODE_ENV
    === 'production'
    ?'/order-system'
    :'/'
 }
