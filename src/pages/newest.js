import React from 'react';
import {
  graphql,
  gql,
} from 'react-apollo';

import MainHOC from '../layouts/MainHOC';
import NewsFeed from '../components/NewsFeed';
import withData from '../helpers/withData';

const POSTS_PER_PAGE = 30;
const pageNumber = 0;
const skip = POSTS_PER_PAGE * pageNumber;

const NewsFeedRenderer = ({ data: { loading, error, feed } }) => {
  if (error) return <div>Error loading news items.</div>;
  if (feed && feed.length) {
    return (
      <NewsFeed newsItems={feed} />
    );
  }
  return <div>Loading</div>;
};

const hotNewsItems = gql`
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

const NewsFeedHOC = graphql(hotNewsItems, {
  options: {
    variables: {
      type: 'NEW',
      first: POSTS_PER_PAGE,
      skip,
    },
  },
  props: ({ data }) => ({
    data,
  }),
})(NewsFeedRenderer);

export default withData(props => (
  <MainHOC>
    <NewsFeedHOC />
  </MainHOC>
));
