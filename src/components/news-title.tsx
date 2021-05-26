import { useMutation } from '@apollo/client';
import Router from 'next/router';
import * as React from 'react';
import { parse } from 'url';

import { UPVOTE_NEWS_ITEM_MUTATION } from '../data/mutations/upvote-news-item-mutation';
import { ErrorAction } from './error-action';

export interface INewsTitleProps {
  id: number;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  rank?: number;
  title: string;
  url?: string;
  upvoted?: boolean;
}

export const newsTitleFragment = `
  fragment NewsTitle on NewsItem {
    id
    title
    url
    upvoted
  }
`;

export function NewsTitle(props: INewsTitleProps): JSX.Element {
  const { id, isRankVisible = true, isUpvoteVisible = true, rank, title, upvoted, url } = props;

  const [notLoggedIn, setNotLoggedIn] = React.useState(false);

  const [upvoteNewsItem] = useMutation(UPVOTE_NEWS_ITEM_MUTATION, {
    onError: () => {     
      setNotLoggedIn(true);
    },
    variables: { id },
  });

  return (
    <tr className="athing">
      <td style={{ textAlign: 'right', verticalAlign: 'top' }} className="title">
        <span className="rank">{isRankVisible && `${rank}.`}</span>
      </td>
      <td style={{ verticalAlign: 'top' }} className="votelinks">
        <div style={{ textAlign: 'center' }}>
          {isUpvoteVisible && (
            <a
              className={upvoted ? 'nosee' : ' '}
              onClick={(): Promise<any> => upvoteNewsItem()}
              style={{ cursor: 'pointer' }}
            >
              <div className="votearrow" title="upvote" />
            </a>
          )}
        </div>            
        <div>{ notLoggedIn && (<ErrorAction />) }</div>
      </td>
      <td className="title">
        <a className="storylink" target="_blank" href={url || `item?id=${id}`}>
          {title}
        </a>
        {url && (
          <span className="sitebit comhead">
            {' '}
            (
            <a href={`from?site=${parse(url).hostname}`}>
              <span className="sitestr">{parse(url).hostname}</span>
            </a>
            )
          </span>
        )}
      </td>
    </tr>
  );
}
