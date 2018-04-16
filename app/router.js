'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  const validCookie = app.middleware.validCookie();
  /*
  * login
  * author: wmx
  */
  router.resources('login', '/api/login', controller.login);
  /*
  * 菜谱部分
  * author: wmx
  */
  // 菜
  router.resources('food', '/api/food', controller.food);
  // 菜的分类
  router.get('/api/foodType', controller.food.foodType);
  /*
  * 订单部分
  * author: wmx
  */  
  // 获取订单列表
  router.get('/api/order', validCookie, controller.order.index);
  // 该路由mobile访问，不加验证
  router.post('/api/order', controller.order.create);
  router.delete('/api/order/:id', controller.order.destroy);
};
