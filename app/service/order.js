// app/service/food.js
const Service = require('egg').Service;

class OrderService extends Service {
  async fetchOrder() {
    const order = await this.app.mysql.select('order', {
      orders: [['o_id', 'ASC']]
    });
    return order;
  }
  async insertOrder(order) {
    try {
      return await this.app.mysql.insert('order', order);
    } catch (e) {
      return e;
    }
  }
  async deleteOrder(id) {
    try {
      const result = await this.app.mysql.delete('order',{
        o_id: id
      });
      return result;
    } catch(e) {
      return e;
    }    
  }
}
module.exports = OrderService;