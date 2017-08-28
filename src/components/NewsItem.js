import React, { Component } from 'react';
import PropTypes from 'prop-types';
import url from 'url';

class NewsItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    creationTime: PropTypes.instanceOf(Date).isRequired,
    submitterId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    url: PropTypes.string,
    commentCount: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    favoriteVisible: PropTypes.bool.isRequired,
    rank: PropTypes.number,
    rankVisible: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    text: undefined,
    url: undefined,
    rank: undefined,
  }

  upvote() {

  }
  hidestory() {

  }
  render() {
    // const hostname = ;
    return (
      <tr>
        <tr className="athing" id={this.props.id}>
          <td style={{ align: "right", verticalAlign: "top" }} className="title">
            <span className="rank">{this.props.rankVisible && `${this.props.rank}.`}</span>
          </td>
          <td style={{ verticalAlign: 'top' }} className="votelinks">
            <center>
              <a onClick={this.upvote} href="/vote?id=15077519&amp;how=up&amp;auth=b73e5ad6975f51978fed805f4c3c079e9516fe1d&amp; goto=news" className="nosee"><div className="votearrow" title="upvote"></div></a>
            </center>
          </td>
          <td className="title">
            <a href={this.props.url ? this.props.url : `/item?id=${this.props.id}` } className="storylink">{this.props.title}</a>{this.props.url && <span className="sitebit comhead"> (<a href={`from?site=${url.parse(this.props.url).hostname}`}><span className="sitestr">{url.parse(this.props.url).hostname}</span></a>)</span>}
          </td>
        </tr>
        <tr>
          <td colSpan="2" />
          <td className="subtext">
            <span className="score">{this.props.points} points</span> by <a href={`user?id=${this.props.submitterId}`} className="hnuser">{this.props.submitterId}</a> <span className="age"><a href="/item?id=15077449">3 hours ago</a></span> <span></span> | <a href="hide?id=15077449&amp;goto=news&amp;auth=15140ad499d896ef90cc72930b3fb7706f6d6398" onClick={this.hidestory}>hide</a> | <a 
            href={`item?id=${this.props.id}`}>{} {(() => {
              switch (this.props.commentCount) {
                case 0:  return 'discuss';
                case 1:  return '1 comment';
                default: return `${this.props.commentCount} comments`;
              }
            })()}
            </a>{this.props.favoriteVisible && ' | favorite'}              </td></tr>
        <tr className="spacer" style={{ height: '5px' }} />
        {
          this.props.text &&
            <tr>
              <td colSpan="2" />
              <td>{this.props.text}</td>
            </tr>
        }
      </tr>
    );
  }
}
// this.props.commentCount > 0 ? `${this.props.commentCount} comments` : 'discuss'
//<tr className="athing" id={this.props.id}>
  //    upvote.  <a href={this.props.link ? this.props.link : `/item?id=${this.props.id}`}>this.props.title</a> {this.props.link  && `(${<a href={this.props.link}>{url.parse(this.props.link).hostname}</a>})`}
    //</tr>

// <tr>
//       {this.props.points} points by {this.props.submitterId} {this.props.creationTime} hours/minutes ago | hide {  this.props.commentCount} comments{this.props.favoriteVisible && ' | favorite'}
//     </tr>

export default NewsItem;
