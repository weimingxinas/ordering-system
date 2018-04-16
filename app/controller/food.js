'use strict';

const Controller = require('egg').Controller;

class FoodController extends Controller {
  // 获取所有菜
  async index() {
    let res = await this.ctx.service.food.fetchFood();
    if (res) {
      this.ctx.body = await {
        data: res,
        status: 200
      };
    } else {
      this.ctx.body = await {
        data: res.sqlMessage || res,
        status: 'get food error'
      }
    }
  }
  // 获取菜的分类
  async foodType() {
    const res = await this.ctx.service.food.fetchFoodType();
    if (res) {
      this.ctx.body = await {
        data: res,
        status: 200
      }
    } else {
      this.ctx.body = await {
        data: res.sqlMessage || res,
        status: 'get foodtype error'
      }
    }
  }
  // 添加菜品
  async create() {
    const food = this.ctx.request.body;
    const res = await this.ctx.service.food.insertFood(food);
    if(res.affectedRows === 1) {
      this.ctx.body = await {
        data: true,
        status: 200
      }
    } else {
      this.ctx.body = await {
        data: res.sqlMessage || res,
        status: 'params error'
      }
    }
  }
  // delete food 
  async destroy() {
    const c_id = this.ctx.params.id;
    const res = await this.ctx.service.food.deleteFood(c_id);
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
  // update food
  async update() {
    const c_id = this.ctx.params.id;
    const c_body = this.ctx.request.body;
    console.log(c_id, c_body);
    const res = await this.ctx.service.food.updateFood(c_id, c_body);
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
}

module.exports = FoodController;