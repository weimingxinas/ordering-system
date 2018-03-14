'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // get
  async index() {
    const { ctx } = this;
    ctx.body = `body: ${JSON.stringify(ctx.query.id)}`;
  }
  // login
  async create() {
    const { ctx, service } = this;
    ctx.body = ctx.request.body;
    
  }
}

module.exports = LoginController;
