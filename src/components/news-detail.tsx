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

export class NewsDetailView extends React.Component<INewsDetailProps> {
  static defaultProps = {
    isFavoriteVisible: true,
    isJobListing: false,
    isPostScrutinyVisible: false,
  };

  render(): JSX.Element {
    const props = this.props;

    return props.isJobListing ? (
      <tr>
        <td colSpan={2} />
        <td className="subtext">
          <span className="age">
            <Link prefetch href={`/item?id=${props.id}`}>
              <a>{convertNumberToTimeAgo(props.creationTime)}</a>
            </Link>
          </span>
        </td>
      </tr>
    ) : (
      <tr>
        <td colSpan={2} />
        <td className="subtext">
          <span className="score">{props.upvoteCount} points</span>
          {' by '}
          <Link prefetch href={`/user?id=${props.submitterId}`}>
            <a className="hnuser">{props.submitterId}</a>
          </Link>{' '}
          <span className="age">
            <Link prefetch href={`/item?id=${props.id}`}>
              <a>{convertNumberToTimeAgo(props.creationTime)}</a>
            </Link>
          </span>
          {' | '}
          {props.hidden ? (
            <a href="javascript:void(0)" onClick={() => props.hideNewsItem(props.id)}>
              hide
            </a>
          ) : (
            <a href="javascript:void(0)" onClick={() => props.unhideNewsItem(props.id)}>
              hide
            </a>
          )}
          {props.isPostScrutinyVisible && (
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
          <Link prefetch href={`/item?id=${props.id}`}>
            <a>
              {(() => {
                switch (props.commentCount) {
                  case 0:
                    return 'discuss';
                  case 1:
                    return '1 comment';
                  default:
                    return `${props.commentCount} comments`;
                }
              })()}
            </a>
          </Link>
          {props.isFavoriteVisible && ' | favorite'}
        </td>
      </tr>
    );
  }
}

export const NewsDetail = graphql<INewsDetailOwnProps, INewsDetailProps, {}, {}>(gql(hideNewsItem), {
  props: ({ ownProps, mutate }) => ({
    hideNewsItem: (id: number) =>
      mutate({
        variables: { id },
      })
        // .then(() => Router.push(`/login?id=${id}&password=${password}`))
        .catch(() => Router.push('/login', `/hide?id=${id}&how=up&goto=news`)),
    unhideNewsItem: id =>
      mutate({
        variables: { id },
      }).catch(() => Router.push('/login', `/unhide?id=${id}&how=up&goto=news`)),
  }),
})(NewsDetailView);
