import { gql } from 'apollo-server-express';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { NewsFeed, newsFeedNewsItemFragment } from '../components/news-feed';
import { FeedType } from '../data/models/feed';
import { withData } from '../helpers/with-data';
import { MainLayout } from '../layouts/main-layout';

const POSTS_PER_PAGE = 30;

const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${newsFeedNewsItemFragment}
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
      first,
      skip,
      type: FeedType.ASK,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
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
