'use strict';

const Controller = require('egg').Controller;

class FoodController extends Controller {
  // 获取所有菜
  async index() {
    let food = await this.ctx.service.food.fetchFood();
    if (food) {
      this.ctx.body = await {
        data: food,
        status: 200
      };
    } else {
      this.ctx.body = await {
        data: food || [],
        status: 500
      }
    }
  }
  // 获取菜的分类
  async foodType() {
    const type = await this.ctx.service.food.fetchFoodType();
    if (type) {
      this.ctx.body = await {
        data: type,
        status: 200
      }
    } else {
      this.ctx.body = await {
        data: type || [],
        status: 500
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
        data: res.sqlMessage,
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
        data: res.sqlMessage,
        status: 'delete error'
      }
    }
  }
  // update food
  async update() {
    const c_id = this.ctx.params.id;
    const c_body = this.ctx.request.body;
    const res = await this.ctx.service.food.updateFood(c_id, c_body);
    if(res.affectedRows === 1) {
      this.ctx.body = await {
        data: true,
        status: 200
      }
    } else {
      this.ctx.body = await {
        data: res.sqlMessage,
        status: 'delete error'
      }
    }
  }
}

module.exports = FoodController;