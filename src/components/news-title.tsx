import { gql } from 'apollo-server-express';
import Router from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { parse } from 'url';

import { upvoteNewsItem } from '../data/mutations/upvote-news-item';

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

export class NewsTitleView extends React.Component<INewsTitleProps> {
  static fragments = {
    newsItem: gql`
      fragment NewsTitle on NewsItem {
        id
        title
        url
        upvoted
      }
    `,
  };

  static defaultProps = {
    isRankVisible: true,
    isUpvoteVisible: true,
    rank: undefined,
    url: undefined,
  };

  render(): JSX.Element {
    const props = this.props;

    return (
      <tr className="athing">
        <td style={{ textAlign: 'right', verticalAlign: 'top' }} className="title">
          <span className="rank">{props.isRankVisible && `${props.rank}.`}</span>
        </td>
        <td style={{ verticalAlign: 'top' }} className="votelinks">
          <div style={{ textAlign: 'center' }}>
            {props.isUpvoteVisible && (
              <a
                className={props.upvoted ? 'nosee' : ' '}
                onClick={() => props.upvoteNewsItem(props.id)}
                href="javascript:void(0)"
              >
                <div className="votearrow" title="upvote" />
              </a>
            )}
          </div>
        </td>
        <td className="title">
          <a className="storylink" href={props.url ? props.url : `item?id=${props.id}`}>
            {props.title}
          </a>
          {props.url && (
            <span className="sitebit comhead">
              {' '}
              (
              <a href={`from?site=${parse(props.url).hostname}`}>
                <span className="sitestr">{parse(props.url).hostname}</span>
              </a>
              )
            </span>
          )}
        </td>
      </tr>
    );
  }
}

export const NewsTitle = graphql<INewsItemOwnProps, INewsTitleProps, {}, {}>(upvoteNewsItem, {
  props: ({ ownProps, mutate }) => ({
    upvoteNewsItem: id =>
      mutate({
        variables: { id },
      })
        // .then(() => Router.push(`/login?id=${id}&password=${password}`))
        .catch(() => Router.push('/login', `/vote?id=${id}&how=up&goto=news`)),
  }),
})(NewsTitleView);
