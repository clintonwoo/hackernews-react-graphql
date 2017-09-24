import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Link from 'next/link';
import PropTypes from 'prop-types';
import url from 'url';


import convertNumberToTimeAgo from '../../helpers/convertNumberToTimeAgo';

export default class NewsDetail extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    creationTime: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
    hideNewsItem: PropTypes.func.isRequired,
    isPostScrutinyVisible: PropTypes.bool,
    isFavoriteVisible: PropTypes.bool,
    isJobListing: PropTypes.bool,
    submitterId: PropTypes.string.isRequired,
    upvoteCount: PropTypes.number.isRequired,
  }
  static defaultProps = {
    isFavoriteVisible: true,
    isPostScrutinyVisible: false,
    isJobListing: false,
  }
  static fragments = {
    newsItem: gql`
      fragment NewsDetail on NewsItem {
        id
        commentCount
        creationTime
        hidden
        submitterId
        upvoteCount
      }
    `,
  };
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
            <span className="score">{this.props.upvoteCount} points</span>
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
            {
              this.props.hidden ?
                <a href="javascript:void(0)" onClick={() => this.props.hideNewsItem(this.props.id)}>
                  hide
                </a>
                :
                <a href="javascript:void(0)" onClick={() => this.props.unhideNewsItem(this.props.id)}>
                  hide
                </a>
            }
            {
              this.props.isPostScrutinyVisible &&
              <span>
                {' | '}
                <a href="https://hn.algolia.com/?query=Sublime%20Text%203.0&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0">
                past
                </a>
                {' | '}
                <a href="https://www.google.com/search?q=Sublime%20Text%203.0">
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
