// app/service/user.js
const Service = require('egg').Service;

class FoodService extends Service {
  async fetchFood(name, passwd) {
    // const userpd = await this.app.mysql.query('select * from user where u_name = ?', name);
    const food = await this.app.mysql.select('food');
    console.log(food);
    if (food) {
      return food;
    } else {
      return null;
    }
  }
}
module.exports = FoodService;