'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('rearrange-blogs')
      .service('myService')
      .getWelcomeMessage();
  },
};
