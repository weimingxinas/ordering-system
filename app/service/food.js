// app/service/food.js
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
  async updateFood(id, params) {
    try {
      const options = {
        where: {
          c_id: id
        }
      };
      const result = await this.app.mysql.update('food',params, options);
      return result;
    } catch(e) {
      return e;
    }    
  }
  async addFoodNum(menu) {
    //批量更新并在total字段
    try {
      let result;
      result = this.app.mysql.query(`
      update food
        set total = total + case c_id 
          when 1 then 1
          when 2 then 1
          when 3 then 1
        end
      where c_id in(1,2,3)
      `);
      return result;
    }catch(e) {
      return e;
    }
  }
}
module.exports = FoodService;