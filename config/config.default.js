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
      cookieName: 'csrfToken',
      headerName: 'x-csrf-token',
    },
  };
  return config;
};

