'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = 'mxbaba';

  // add your config here
  config.middleware = [];
  // 安全
  config.security = {
    csrf: {
      enable: false,
      cookieName: 'csrfToken',
      headerName: 'x-csrf-token'
    },
    domainWhiteList: ['http://localhost:8080','.baidu.com', '.123.207.15.165:18901','.123.207.15.165:18902'],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true
  };
  config.multipart = {
    //fileExtensions: [ '.doc' ]
  };
  config.io = {
    init: { }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      }
    }
  }
  return config;
};

