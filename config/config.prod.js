'use strict';
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: '123.207.15.165',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '000000',
    // 数据库名
    database: 'test',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
exports.cluster = {
    listen: {
      port: 18900,
      hostname: '0.0.0.0',
      // path: '/var/run/egg.sock',
    }
};
exports.security = {
    csrf: {
      enable: false,
    },
};