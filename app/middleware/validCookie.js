module.exports = options => {
    return async function validCookie(ctx, next) {
      try {
          await ctx.service.login.validCookie();
          await next();
      } catch (e) {
          console.log('跳转登录');
          return false;
      }
    };
};