const { gql } = require("@apollo/client");

export const ARTICLES = gql`
  query articles(
    $filters: ArticleFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    articles(
      filters: $filters
      pagination: $pagination
      sort: $sort
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          title
          description
        }
      }
      meta {
        pagination {
          total
          page
        }
      }
    }
  }
`;

export const FETCH_CATEGORIES = gql`
  query {
    categories {
      data {
        id
        attributes {
          name
          slug
          blogOrders
        }
      }
    }
  }
`;
