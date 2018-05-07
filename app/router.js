'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const validCookie = app.middleware.validCookie();
  router.get('/', controller.home.index);
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
  router.get('/api/foodtype', controller.food.foodType);
  /*
  * 订单部分
  * author: wmx
  */  
  // 获取订单列表
  router.get('/api/order', controller.order.index);
  // 该路由mobile访问，不加验证
  router.post('/api/order', controller.order.create);
  router.get('/api/order/:id', controller.order.show);
  router.delete('/api/order/:id', validCookie, controller.order.destroy);
  router.put('/api/order/:id', validCookie, controller.order.update);
  // 主html渲染
  router.post('/api/upload', controller.food.uploadPic);
  router.get('/api/kpis',controller.order.fetchKpis)
};
