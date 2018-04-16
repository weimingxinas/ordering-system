'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // get
  async index() {
    const { ctx } = this;
    console.log('sussess get');
    ctx.body = `body: ${JSON.stringify(ctx.query.id)}`;
  }
  // 登录
  async create() {
    const { userName, userPasswd } = this.ctx.request.body;
    const user = await this.ctx.service.login.fetch(userName, userPasswd);
    if (user && user.u_passwd === userPasswd) {
      const deadline = 1000 * 60 * 60 * 24;
      const token = {
        id: user.id,
        nowDate: new Date().getTime(),
        deadline: deadline
      };
      this.ctx.body = {
        data: true,
        status: 200
      };
      this.ctx.cookies.set('mx_token', JSON.stringify(token), {
        encrypt: true
      });
    } else {
      this.ctx.body = {
        data: false,
        status: 404
      };
    }
  }
}

module.exports = LoginController;
