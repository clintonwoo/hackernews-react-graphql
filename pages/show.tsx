import gql from 'graphql-tag';
import Link from 'next/link';
import * as React from 'react';
import { graphql } from 'react-apollo';

import {
  NewsFeed,
  newsFeedNewsItemFragment,
  INewsFeedData,
  INewsFeedContainerProps,
} from '../src/components/news-feed';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';
import { FeedType } from '../src/data/models';

const POSTS_PER_PAGE = 30;

const query = gql`
  query topNewsItems($type: FeedType!, $first: Int!, $skip: Int!) {
    feed(type: $type, first: $first, skip: $skip) {
      ...NewsFeed
    }
  }
  ${newsFeedNewsItemFragment}
`;

export interface IShowHNNewsFeedProps {
  options: {
    currentUrl: string;
    first: number;
    notice: JSX.Element;
    skip: number;
  };
}

const ShowHNNewsFeed = graphql<IShowHNNewsFeedProps, INewsFeedData, {}, INewsFeedContainerProps>(
  query,
  {
    options({ options: { first, skip } }) {
      return {
        variables: { type: FeedType.SHOW, first, skip },
      };
    },
    props({ ownProps, data }) {
      return { ...ownProps, data: data! };
    },
  }
)(NewsFeed);

export const ShowHNPage = withDataAndRouter((props) => {
  const pageNumber = (props.router.query && +props.router.query.p) || 0;

  const notice = (
    <>
      <tr key="noticetopspacer" style={{ height: '5px' }} />
      <tr key="notice">
        <td colSpan={2} />
        <td>
          Please read the{' '}
          <Link href="/showhn">
            <a>
              <u>rules</u>
            </a>
          </Link>
          . You can also browse the{' '}
          <Link href="/shownew">
            <a>
              <u>newest</u>
            </a>
          </Link>{' '}
          Show HNs.
        </td>
      </tr>
      <tr key="noticebottomspacer" style={{ height: '10px' }} />
    </>
  );

  return (
    <MainLayout currentUrl={props.router.pathname}>
      <ShowHNNewsFeed
        options={{
          currentUrl: props.router.pathname,
          first: POSTS_PER_PAGE,
          skip: POSTS_PER_PAGE * pageNumber,
          notice,
        }}
      />
    </MainLayout>
  );
});

export default ShowHNPage;
