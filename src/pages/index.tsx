import { gql } from 'apollo-server-express';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { NewsFeedView } from '../components/news-feed';
import { NewsFeed } from '../components/news-feed';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

const POSTS_PER_PAGE = 30;

const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${NewsFeedView.fragments.newsItem}
`;

export interface ITopNewsFeedProps {
  options: {
    first: number;
    skip: number;
  };
}

const TopNewsFeed = graphql<ITopNewsFeedProps>(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'TOP',
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

export const IndexPage = withData(props => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;
  return (
    <MainLayout currentUrl={props.url.pathname}>
      <TopNewsFeed
        options={{
          currentUrl: props.url.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber,
        }}
      />
    </MainLayout>
  );
});

export default IndexPage;
