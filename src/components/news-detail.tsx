import { useMutation } from '@apollo/client';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';

import { HIDE_NEWS_ITEM_MUTATION } from '../data/mutations/hide-news-item-mutation';
import { convertNumberToTimeAgo } from '../helpers/convert-number-to-time-ago';

export interface INewsDetailProps {
  commentCount: number;
  creationTime: number;
  hidden?: boolean;
  id: number;
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

const HIDE_BUTTON_STYLE = { cursor: 'pointer' };

export function NewsDetail(props: INewsDetailProps): JSX.Element {
  const {
    commentCount,
    creationTime,
    hidden,
    id,
    isFavoriteVisible = true,
    isJobListing = false,
    isPostScrutinyVisible = false,
    submitterId,
    upvoteCount,
  } = props;

  const [hideNewsItem] = useMutation(HIDE_NEWS_ITEM_MUTATION, {
    onError() {
      Router.push('/login', `/hide?id=${id}&how=up&goto=news`);
    },
    variables: { id },
  });

  const unhideNewsItem = (): void => undefined;

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
          <a onClick={(): void => unhideNewsItem()} style={HIDE_BUTTON_STYLE}>
            unhide
          </a>
        ) : (
          <a onClick={(): Promise<any> => hideNewsItem()} style={HIDE_BUTTON_STYLE}>
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
            {commentCount === 0
              ? 'discuss'
              : commentCount === 1
              ? '1 comment'
              : `${commentCount} comments`}
          </a>
        </Link>
        {isFavoriteVisible && ' | favorite'}
      </td>
    </tr>
  );
}
