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
    const msg = this.ctx.request.body;
    // 计算金额
    const menuid = Object.keys(msg.menu);
    let totalPrice = 0;
    if (msg.menu) {
      const menuPrice = await this.service.food.menuPrice(menuid, ['c_id', 'piece']);
      menuPrice.map(val => {
        menuid.map(id => {
          if (val['c_id'] == id) {
            totalPrice = ((totalPrice *100) + (val['piece'] * msg.menu[id] * 100)) / 100;
          }
        });
      });
      await this.service.food.addFoodNum(msg.menu);
      msg.menu = await JSON.stringify(msg.menu);
    }
    msg['t_id'] = parseInt(msg['t_id']);
    msg['res_id'] = parseInt(msg['res_id']);
    const order = {
      ...msg,
      time: new Date(),
      total_price: totalPrice
    }
    const res = await this.service.order.insertOrder(order);
    if(res.affectedRows === 1) {
      this.ctx.body = await {
        data: {
          o_id: res['insertId']
        },
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
  async show() {
    const id = this.ctx.params.id;
    const res = await this.ctx.service.order.fetchOneOrder(id);
    const menu = JSON.parse(res.menu);
    const menuid = Object.keys(menu);
    let menuList = await this.service.food.menuPrice(menuid, ['c_id', 'c_name', 'piece']);
    let arr = [];
    menuList.map(val => {
      menuid.forEach(id => {
        if(id == val['c_id']) {
          arr.push({
            ...val,
            'num': menu[id]
          });
        }
      });
    });
    res.menu = arr;
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
  async update() {
    const o_id = this.ctx.params.id;
    const o_body = this.ctx.request;
    const res = await this.ctx.service.order.updateOrder(o_id, o_body);
    if(res.affectedRows === 1) {
      this.ctx.body = await {
        data: true,
        status: 200
      }
    } else {
      this.ctx.body = await {
        data: res.sqlMessage || res,
        status: 'update error'
      }
    }
  }
  async fetchKpis() {
    const salesCount = await this.ctx.service.order.salesCount();
    const PV = 18900;
    if(salesCount) {
      this.ctx.body = await {
        data: {
          salesCount: salesCount[0]['sum_price'],
          pv: PV
        },
        status: 200
      }
    } else {
      this.ctx.body = await {
        data: salesCount.sqlMessage || salesCount,
        status: 'fetch error'
      }
    }
  }
}

module.exports = OrderController;