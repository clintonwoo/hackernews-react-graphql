import { gql } from 'apollo-server-express';
import Router from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { parse } from 'url';

import { upvoteNewsItemMutation } from '../data/mutations/upvote-news-item-mutation';

export interface INewsTitleProps extends INewsItemOwnProps {
  upvoteNewsItem: (id: number) => void;
}

export interface INewsItemOwnProps {
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

export function NewsTitleView(props: INewsTitleProps): JSX.Element {
  const { id, isRankVisible, isUpvoteVisible, rank, title, upvoted, url } = props;

  return (
    <tr className="athing">
      <td style={{ textAlign: 'right', verticalAlign: 'top' }} className="title">
        <span className="rank">{isRankVisible && `${rank}.`}</span>
      </td>
      <td style={{ verticalAlign: 'top' }} className="votelinks">
        <div style={{ textAlign: 'center' }}>
          {isUpvoteVisible && (
            <a className={upvoted ? 'nosee' : ' '} onClick={() => props.upvoteNewsItem(id)}>
              <div className="votearrow" title="upvote" />
            </a>
          )}
        </div>
      </td>
      <td className="title">
        <a className="storylink" href={url || `item?id=${id}`}>
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

NewsTitleView.defaultProps = {
  isRankVisible: true,
  isUpvoteVisible: true,
};

export const NewsTitle = graphql<INewsItemOwnProps, {}, {}, INewsTitleProps>(
  gql(upvoteNewsItemMutation),
  {
    props({ ownProps, mutate }) {
      return {
        ...ownProps,
        upvoteNewsItem: (id: number) =>
          mutate!({
            variables: { id },
          })
            // .then(() => Router.push(`/login?id=${id}&password=${password}`))
            .catch(() => Router.push('/login', `/vote?id=${id}&how=up&goto=news`)),
      };
    },
  }
)(NewsTitleView);
