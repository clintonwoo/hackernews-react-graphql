import React from 'react';
import {
  graphql,
  gql,
} from 'react-apollo';

import Main from '../layouts/Main';
import NewsFeedApolloHOC from '../components/NewsFeedWithApolloRenderer';
import withData from '../helpers/withData';

const POSTS_PER_PAGE = 30;
const pageNumber = 0;
const skip = POSTS_PER_PAGE * pageNumber;
const query = gql`
  query NewestFeed($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      id
      creationTime
      submitterId
      title
      text
      url
      commentCount
      rank
      points
    }
  }
`;
const variables = {
  type: 'NEW',
  first: POSTS_PER_PAGE,
  skip,
};

const NewestNewsFeed = graphql(query, {
  options: {
    variables,
  },
  props: ({ data }) => ({
    data,
  }),
})(NewsFeedApolloHOC);

export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <NewestNewsFeed />
  </Main>
));
