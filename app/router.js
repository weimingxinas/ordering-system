'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  /* login */
  router.resources('login', '/api/login', controller.login);
  router.resources('order', '/api/orderHistory', controller.orderHistory);
  router.resources('food', '/api/food', controller.food);
};
