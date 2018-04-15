'use strict';

const Controller = require('egg').Controller;

class FoodController extends Controller {
  async index() {
    const { ctx } = this;
    let food;
    await ctx.service.login.validCookie();
    food = await ctx.service.food.fetchFood();
    ctx.body = await {
        result: food,
        status: 200
    };
  }
}

module.exports = FoodController;