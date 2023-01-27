import { gql } from "@apollo/client";

export const UPDATE_BLOGS_ORDER_MUTATION = gql`
  mutation updateArticleOrder($input: updateArticleOrderInput) {
    updateArticleOrder(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_BLOGS_ORDER_FOR_CATEGORY = gql`
  mutation updateArticleOrderByCategories(
    $input: UpdateBlogOrderCategoryInput
  ) {
    updateArticleOrderByCategories(input: $input) {
      status
      message
    }
  }
`;
