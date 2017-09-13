import React, { Component } from 'react';
import PropTypes from 'prop-types';
import url from 'url';

class NewsTitle extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    rank: PropTypes.number,
    isRankVisible: PropTypes.bool,
  }
  static defaultProps = {
    // text: undefined,
    url: undefined,
    rank: undefined,
    isRankVisible: true,
  }

  upvote() {

  }
  hidestory() {

  }
  render() {
    return (
      <tr className="athing" id={this.props.id}>
        <td style={{ textAlign: 'right', verticalAlign: 'top' }} className="title">
          <span className="rank">{this.props.isRankVisible && `${this.props.rank}.`}</span>
        </td>
        <td style={{ verticalAlign: 'top' }} className="votelinks">
          <center>
            <a onClick={this.upvote} href="vote?id=15077519&amp;how=up&amp;auth=b73e5ad6975f51978fed805f4c3c079e9516fe1d&amp; goto=news"><div className="votearrow" title="upvote" /></a>
          </center>
        </td>
        <td className="title">
          <a href={this.props.url ? this.props.url : `item?id=${this.props.id}`} className="storylink">
            {this.props.title}
          </a>
          {
            this.props.url &&
            <span className="sitebit comhead"> (
              <a href={`from?site=${url.parse(this.props.url).hostname}`}>
                <span className="sitestr">{url.parse(this.props.url).hostname}</span>
              </a>)
            </span>
          }
        </td>
      </tr>
    );
  }
}

export default NewsTitle;
