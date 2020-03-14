import { gql } from 'apollo-server-express';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';

import { hideNewsItem } from '../data/mutations/hide-news-item';
import { convertNumberToTimeAgo } from '../helpers/convert-number-to-time-ago';

interface INewsDetailProps extends INewsDetailOwnProps {
  hideNewsItem: (id: number) => void;
  unhideNewsItem: (id: number) => void;
}

interface INewsDetailOwnProps {
  id: number;
  commentCount: number;
  creationTime: number;
  hidden?: boolean;
  isFavoriteVisible?: boolean;
  isJobListing?: boolean;
  isPostScrutinyVisible?: boolean;
  submitterId: string;
  upvoteCount: number;
}

export const newsDetailNewsItemFragment = `
  fragment NewsDetail on NewsItem {
    id
    commentCount
    creationTime
    hidden
    submitterId
    upvoteCount
  }
`;

export function NewsDetailView(props: INewsDetailProps): JSX.Element {
  const {
    id,
    commentCount,
    creationTime,
    hidden,
    isFavoriteVisible,
    isJobListing,
    isPostScrutinyVisible,
    submitterId,
    upvoteCount,
  } = props;

  return isJobListing ? (
    <tr>
      <td colSpan={2} />
      <td className="subtext">
        <span className="age">
          <Link href={`/item?id=${id}`}>
            <a>{convertNumberToTimeAgo(creationTime)}</a>
          </Link>
        </span>
      </td>
    </tr>
  ) : (
    <tr>
      <td colSpan={2} />
      <td className="subtext">
        <span className="score">{upvoteCount} points</span>
        {' by '}
        <Link href={`/user?id=${submitterId}`}>
          <a className="hnuser">{submitterId}</a>
        </Link>{' '}
        <span className="age">
          <Link href={`/item?id=${id}`}>
            <a>{convertNumberToTimeAgo(creationTime)}</a>
          </Link>
        </span>
        {' | '}
        {hidden ? (
          <a href="javascript:void(0)" onClick={() => hideNewsItem(id)}>
            hide
          </a>
        ) : (
          <a href="javascript:void(0)" onClick={() => unhideNewsItem(id)}>
            hide
          </a>
        )}
        {isPostScrutinyVisible && (
          <span>
            {' | '}
            <a href="https://hn.algolia.com/?query=Sublime%20Text%203.0&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0">
              past
            </a>
            {' | '}
            <a href="https://www.google.com/search?q=Sublime%20Text%203.0">web</a>
          </span>
        )}
        {' | '}
        <Link href={`/item?id=${id}`}>
          <a>
            {(() => {
              switch (commentCount) {
                case 0:
                  return 'discuss';
                case 1:
                  return '1 comment';
                default:
                  return `${commentCount} comments`;
              }
            })()}
          </a>
        </Link>
        {isFavoriteVisible && ' | favorite'}
      </td>
    </tr>
  );
}

NewsDetailView.defaultProps = {
  isFavoriteVisible: true,
  isJobListing: false,
  isPostScrutinyVisible: false,
};

export const NewsDetail = graphql<INewsDetailOwnProps, {}, {}, INewsDetailProps>(gql(hideNewsItem), {
  props({ ownProps, mutate }) {
    return {
      ...ownProps,
      hideNewsItem: (id: number): Promise<void> | void =>
        mutate!({
          variables: { id },
        })
          // .then(() => Router.push(`/login?id=${id}&password=${password}`))
          .catch(() => Router.push('/login', `/hide?id=${id}&how=up&goto=news`)),
      unhideNewsItem: (id: number): Promise<void> | void =>
        mutate!({
          variables: { id },
        }).catch(() => Router.push('/login', `/unhide?id=${id}&how=up&goto=news`)),
    };
  },
})(NewsDetailView);
