/*
Name: setupProxy.js
Description:  Sets up proxy server in order to get data from API
Authors: Troy D'Amico
Date: 10/20/23
*/
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://18.116.69.161',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};