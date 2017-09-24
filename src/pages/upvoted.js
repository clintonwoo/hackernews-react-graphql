import React from 'react';
import {
  graphql,
  gql,
} from 'react-apollo';

import Main from '../layouts/Main';
import NewsFeed from '../components/presentational/NewsFeed';
import NewsFeedApolloHOC from '../components/container/NewsFeedWithApolloRenderer';
import withData from '../helpers/withData';

const POSTS_PER_PAGE = 30;

const query = gql`
  query NewestFeed($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${NewsFeed.fragments.newsItem}
`;

const NewestNewsFeed = graphql(query, {
  options: ({ options: { first, skip } }) => ({
    variables: {
      type: 'NEW',
      first,
      skip,
    },
  }),
  props: ({ data }) => ({
    data,
  }),
})(NewsFeedApolloHOC);

export default withData((props) => {
  const pageNumber = (props.url.query && +props.url.query.p) || 0;
  return (
    <Main currentURL={props.url.pathname}>
      <NewestNewsFeed options={{
        currentURL: props.url.pathname,
        first: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * pageNumber,
      }}
      />
    </Main>
  );
});
