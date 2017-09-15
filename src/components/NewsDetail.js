import React, { Component } from 'react';
import Link from 'next/link';
import { gql } from 'react-apollo';
import PropTypes from 'prop-types';
import url from 'url';


import convertNumberToTimeAgo from '../helpers/convertNumberToTimeAgo';

class NewsDetail extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    creationTime: PropTypes.number.isRequired,
    submitterId: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    isPostScrutinyVisible: PropTypes.bool,
    isFavoriteVisible: PropTypes.bool,
    isJobListing: PropTypes.bool,
  }
  static defaultProps = {
    isFavoriteVisible: true,
    isPostScrutinyVisible: false,
    isJobListing: false,
  }
  static fragments = {
    newsItem: gql`
      fragment NewsDetail on NewsItem {
        id,
        commentCount,
        creationTime,
        submitterId,
        points
      }
    `,
  };

  upvote() {
    console.log(this);
  }
  hidestory() {
    console.log(this);
    return "/hide?id=15077449&amp;goto=news&amp;auth=15140ad499d896ef90cc72930b3fb7706f6d6398";
  }
  render() {
    return (
      this.props.isJobListing ?
        <tr>
          <td colSpan="2" />
          <td className="subtext">
            <span className="age">
              <Link prefetch href={`/item?id=${this.props.id}`}>
                <a>
                  {convertNumberToTimeAgo(this.props.creationTime)}
                </a>
              </Link>
            </span>
          </td>
        </tr>
        :
        <tr>
          <td colSpan="2" />
          <td className="subtext">
            <span className="score">{this.props.points} points</span>
            {' by '}
            <Link prefetch href={`/user?id=${this.props.submitterId}`}>
              <a className="hnuser">
                {this.props.submitterId}
              </a>
            </Link>
            {' '}
            <span className="age">
              <Link prefetch href={`/item?id=${this.props.id}`}>
                <a>
                  {convertNumberToTimeAgo(this.props.creationTime)}
                </a>
              </Link>
            </span>
            {' | '}
            <a href="javascript:void(0)" onClick={this.hidestory}>
            hide
            </a>
            {
              this.props.isPostScrutinyVisible &&
              <span>
                {' | '}
                <a href="https://hn.algolia.com/?query=Sublime%20Text%203.0&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0" onClick={this.hidestory}>
                past
                </a>
                {' | '}
                <a href="https://www.google.com/search?q=Sublime%20Text%203.0" onClick={this.hidestory}>
                web
                </a>
              </span>
            }
            {' | '}
            <Link prefetch href={`/item?id=${this.props.id}`}>
              <a>
                {(() => {
                  switch (this.props.commentCount) {
                    case 0: return 'discuss';
                    case 1: return '1 comment';
                    default: return `${this.props.commentCount} comments`;
                  }
                })()}
              </a>
            </Link>
            {this.props.isFavoriteVisible && ' | favorite'}
          </td>
        </tr>
    );
  }
}

export default NewsDetail;
