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
    let { time, menu, t_id, res_id } = order;
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
  async fetchOneOrder(id) {
    try {
      const result = await this.app.mysql.get('order',{
        o_id: id
      });
      return result;
    } catch(e) {
      return e;
    }    
  }
  async updateOrder(id, params) {
    try {
      const options = {
        where: {
          o_id: id
        }
      };
      const result = await this.app.mysql.update('order',params, options);
      return result;
    } catch(e) {
      return e;
    } 
  }
  async salesCount() {
    try {
      return await this.app.mysql.query("select sum(total_price) as sum_price from `order`");
    } catch(e) {
      return e;
    }
  }
}
module.exports = OrderService;