// app/service/user.js
const Service = require('egg').Service;

class LoginService extends Service {
  async fetch(name, passwd) {
    // const userpd = await this.app.mysql.query('select * from user where u_name = ?', name);
    const user = await this.app.mysql.get('user', { u_name: name });
    console.log(user);
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  validCookie() {
    let token = this.ctx.cookies.get('mx_token', {
      encrypt: true
    });
    return new Promise((resolve, reject) => {
      if (token) {
        const { nowDate, deadline } = JSON.parse(token);;
        if (parseInt(nowDate) + parseInt(deadline) > new Date().getTime()) {
          resolve();
        } else {
          //redict login
          console.log('token过期');
          reject();
        }
      } else {
        // redict login
        console.log('token不存在');
        reject();
      }
    });
  }
}
module.exports = LoginService;
