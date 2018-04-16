'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  // get order list
  async index() {
    const res = await this.ctx.service.order.fetchOrder();
    if (res) {
      this.ctx.body ={
        data: res,
        status: 200
      };
    } else {
      this.ctx.body = {
        data: res.sqlMessage || res,
        status: 'get order error'
      }
    }
  }
  async create() {
    const order = this.ctx.request.body;
    const res = await this.service.order.insertOrder(order);
    if(res.affectedRows === 1) {
      this.ctx.body = await {
        data: true,
        status: 200
      }
      // 通知后台管理系统
    } else {
      this.ctx.body = await {
        data: res.sqlMessage || res,
        status: 'params error'
      }
    }    
  }
  async destroy() {
    const o_id = this.ctx.params.id;
    const res = await this.ctx.service.order.deleteOrder(o_id);
    if(res.affectedRows === 1) {
      this.ctx.body = await {
        data: true,
        status: 200
      }
    } else {
      this.ctx.body = await {
        data: res.sqlMessage || res,
        status: 'delete error'
      }
    }    
  }
}

module.exports = OrderController;