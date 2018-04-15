'use strict';

const Controller = require('egg').Controller;

class OrderHistoryController extends Controller {
  // get
  async index() {
    const { ctx } = this;
    ctx.service.login.validCookie().then(_ => {
        console.log(1);
    }).catch(e => {
        console.log(2);
    });
  }
}

module.exports = OrderHistoryController;