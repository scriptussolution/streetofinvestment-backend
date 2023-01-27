"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */

  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    const extension = ({}) => ({
      typeDefs: /* GraphQL */ `
        type Mutation {
          updateArticleOrder(input: updateArticleOrderInput): ResponseData
          updateArticleOrderByCategories(
            input: UpdateBlogOrderCategoryInput
          ): ResponseData
        }
        input updateBlogOrderInput {
          blogId: Int!
          isTopVisitedOrder: Int
          isTrendingOrder: Int
        }
        input updateArticleOrderInput {
          blogs: [updateBlogOrderInput!]!
        }
        input UpdateBlogOrderCategoryInput {
          categoryId: Int!
          blogOrders: String!
        }
        type ResponseData {
          status: Int!
          message: String!
        }
      `,
      resolvers: {
        Mutation: {
          async updateArticleOrder(parent, args, ctx, info) {
            const entries = await Promise.all(
              args.input.blogs.map((blog) =>
                strapi.entityService.update(
                  "api::article.article",
                  blog.blogId,
                  {
                    data: {
                      isTopVisitedOrder: blog.isTopVisitedOrder,
                      isTrendingOrder: blog.isTrendingOrder,
                    },
                  }
                )
              )
            );
            const SUCCESSFUL_RESPONSE = {
              status: 200,
              message: "Operation Successful",
            };
            return SUCCESSFUL_RESPONSE;
          },
          async updateArticleOrderByCategories(parent, args, ctx, info) {
            await strapi.entityService.update(
              "api::category.category",
              args.input.categoryId,
              {
                data: {
                  blogOrders: args.input.blogOrders,
                },
              }
            );
            const SUCCESSFUL_RESPONSE = {
              status: 200,
              message: "Operation Successful",
            };
            return SUCCESSFUL_RESPONSE;
          },
        },
      },
      resolversConfig: {
        "Mutation.updateArticleOrder": {
          auth: false,
        },
        "Mutation.updateArticleOrderByCategories": {
          auth: false,
        },
      },
    });
    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
