'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
  }
}

module.exports = LoginController;
