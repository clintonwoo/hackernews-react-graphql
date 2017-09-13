import React, { Component } from 'react';
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
    title: PropTypes.string,
    isPostScrutinyVisible: PropTypes.bool,
    points: PropTypes.number.isRequired,
    isFavoriteVisible: PropTypes.bool,
  }
  static defaultProps = {
    title: undefined,
    isFavoriteVisible: true,
    isPostScrutinyVisible: false,
  }

  upvote() {

  }
  hidestory() {

  }
  render() {
    return (
      <tr>
        <td colSpan="2" />
        <td className="subtext">
          <span className="score">{this.props.points} points</span>
          {' by '}
          <a href={`/user?id=${this.props.submitterId}`} className="hnuser">
            {this.props.submitterId}
          </a>
          {' '}
          <span className="age">
            <a href="item?id=15077449">
              {convertNumberToTimeAgo(this.props.creationTime)}
            </a>
          </span>
          {' | '}
          <a href="/hide?id=15077449&amp;goto=news&amp;auth=15140ad499d896ef90cc72930b3fb7706f6d6398" onClick={this.hidestory}>
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
          <a href={`/item?id=${this.props.id}`}>
            {} {(() => {
              switch (this.props.commentCount) {
                case 0: return 'discuss';
                case 1: return '1 comment';
                default: return `${this.props.commentCount} comments`;
              }
            })()}
          </a>{this.props.isFavoriteVisible && ' | favorite'}
        </td>
      </tr>
    );
  }
}

const post = gql`
  fragment NewsDetail on entry {
    id
    submitterId
    commentCount
    points
    isFavoriteVisible
  }
`

export default NewsDetail;
