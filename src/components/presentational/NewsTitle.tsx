import gql from 'graphql-tag';
import * as React from 'react';
import { parse } from 'url';

export class NewsTitle extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isRankVisible: PropTypes.bool,
    isUpvoteVisible: PropTypes.bool,
    rank: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    upvoted: PropTypes.bool.isRequired,
    upvoteNewsItem: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isRankVisible: true,
    isUpvoteVisible: true,
    rank: undefined,
    url: undefined,
  };
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
  render(): JSX.Element {
    return (
      <tr className="athing" id={this.props.id}>
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
