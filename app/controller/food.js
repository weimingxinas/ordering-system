'use strict';

const fs = require('fs');
const Controller = require('egg').Controller;
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
class FoodController extends Controller {
  // 获取所有菜
  constructor(ctx) {
    super(ctx);
    this.filename = null;
  }
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
    let food = this.ctx.request.body;
    food = {
      ...food,
      total: 0
    }
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
    const c_body = this.ctx.request;
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
  // upload pic
  async uploadPic() {
    const stream = await this.ctx.getFileStream();
    const baseName = Math.random().toString(36).substr(2);
    this.filename = baseName + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', this.filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    this.ctx.body = { 
      url: this.filename
    };
  }
}

module.exports = FoodController;