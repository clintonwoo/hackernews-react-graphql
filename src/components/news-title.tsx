import gql from 'graphql-tag';
import Router from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { parse } from 'url';

import { upvoteNewsItem } from '../data/mutations/upvote-news-item';

export interface INewsTitleProps {
  id: number;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  rank?: number;
  title: string;
  url?: string;
  upvoted: boolean;
  upvoteNewsItem: (id: number) => void;
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
    return (
      <tr className="athing">
        <td style={{ textAlign: 'right', verticalAlign: 'top' }} className="title">
          <span className="rank">{this.props.isRankVisible && `${this.props.rank}.`}</span>
        </td>
        <td style={{ verticalAlign: 'top' }} className="votelinks">
          <div style={{ textAlign: 'center' }}>
            {this.props.isUpvoteVisible && (
              <a
                className={this.props.upvoted ? 'nosee' : ' '}
                onClick={() => this.props.upvoteNewsItem(this.props.id)}
                href="javascript:void(0)"
              >
                <div className="votearrow" title="upvote" />
              </a>
            )}
          </div>
        </td>
        <td className="title">
          <a className="storylink" href={this.props.url ? this.props.url : `item?id=${this.props.id}`}>
            {this.props.title}
          </a>
          {this.props.url && (
            <span className="sitebit comhead">
              {' '}
              (
              <a href={`from?site=${parse(this.props.url).hostname}`}>
                <span className="sitestr">{parse(this.props.url).hostname}</span>
              </a>
              )
            </span>
          )}
        </td>
      </tr>
    );
  }
}

export const NewsTitle = graphql(upvoteNewsItem, {
  props: ({ ownProps, mutate }) => ({
    upvoteNewsItem: id =>
      mutate({
        variables: { id },
      })
        // .then(() => Router.push(`/login?id=${id}&password=${password}`))
        .catch(() => Router.push('/login', `/vote?id=${id}&how=up&goto=news`)),
  }),
})(NewsTitleView);
