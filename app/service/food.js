// app/service/user.js
const Service = require('egg').Service;

class FoodService extends Service {
  async fetchFood() {
    const food = await this.app.mysql.select('food',{
      orders:[['c_id', 'ASC']]
    });
    return food;
  }
  async fetchFoodType() {
    const type = await this.app.mysql.select('food_type', {
      orders:[['type_id', 'ASC']]
    });
    return type;
  }
  async insertFood(food) {
    try {
      const result = await this.app.mysql.insert('food',food);
      return result;
    } catch(e) {
      return e;
    }
  }
  async deleteFood(id) {
    try {
      const result = await this.app.mysql.delete('food',{
        c_id: id
      });
      return result;
    } catch(e) {
      return e;
    }
  }
}
module.exports = FoodService;