import * as React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-server-express';

import { MainLayout } from '../layouts/main-layout';
import { NewsFeedView } from '../components/news-feed';
import { NewsFeed } from '../components/news-feed';
import { withData } from '../helpers/with-data';

const POSTS_PER_PAGE = 30;

const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${NewsFeedView.fragments.newsItem}
`;

export interface IAskPageProps {
  options: {
    first: number;
    skip: number;
  };
}

const AskPageNewsFeedWithGraphQL = graphql<IAskPageProps>(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'ASK',
      first,
      skip,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
  // loadMorePosts: data =>
  //   data.fetchMore({
  //     variables: {
  //       skip: data.allNewsItems.length,
  //     },
  //     updateQuery: (previousResult, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) {
  //         return previousResult;
  //       }
  //       return Object.assign({}, previousResult, {
  //         // Append the new posts results to the old one
  //         allNewsItems: [...previousResult.allNewsItems, ...fetchMoreResult.allNewsItems],
  //       });
  //     },
  //   }),
})(NewsFeed);

export const AskPage = withData(props => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;

  return (
    <MainLayout currentUrl={props.url.pathname}>
      <AskPageNewsFeedWithGraphQL
        options={{
          currentUrl: props.url.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber,
        }}
      />
    </MainLayout>
  );
});

export default AskPage;
