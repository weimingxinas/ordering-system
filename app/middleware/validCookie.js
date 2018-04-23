module.exports = options => {
  return async function validCookie(ctx, next) {
    try {
      await ctx.service.login.validCookie();
      await next();
    } catch (e) {
      ctx.redirect('http://baidu.com');
      console.log('跳转登录');
      return false;
    }
  };
};