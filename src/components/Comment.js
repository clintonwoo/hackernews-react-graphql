import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'react-apollo';
import Link from 'next/link';

import convertNumberToTimeAgo from '../helpers/convertNumberToTimeAgo';

class Comment extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    creationTime: PropTypes.number.isRequired,
    indentationLevel: PropTypes.number.isRequired,
    submitterId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      creationTime: PropTypes.number.isRequired,
      submitterId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  }
  static fragments = {
    comment: gql`
      fragment Comment on Comment {
        id,
        creationTime,
        comments {
          id,
          creationTime,
          submitterId,
          text
        },
        submitterId,
        text,
      }
    `,
  }
  vote() {
    this;
    return "vote(event, this, &quot;up&quot;)";
  }
  toggle() {
    this;
    return "toggle(event, 15238246)";
  }
  render() {
    return (
      <tr className="athing comtr " id="15238246">
        <td>
          <table style={{ border: '0' }}>
            <tbody>
              <tr>
                <td className="ind">
                  <img alt="" src="/static/s.gif" height="1" width={`${this.props.indentationLevel * 40}px`}/* Width varies depending on comment level*/ />
                </td>
                <td style={{ verticalAlign: 'top' }} className="votelinks">
                  <center>
                    <a id="up_15238246" onClick={this.vote} href="vote?id=15238246&amp;how=up&amp;auth=4eb97bf0d2568aa743691210b904f0c5182bb0fc&amp;goto=item%3Fid%3D15237896#15238246">
                      <div className="votearrow" title="upvote" />
                    </a>
                  </center>
                </td>
                <td className="default">
                  <div style={{ marginTop: '2px', marginBottom: '-10px' }}>
                    <span className="comhead">
                      <Link prefetch href="/user?id=mstade">
                        <a className="hnuser">{this.props.submitterId}</a>
                      </Link>
                      <span className="age">
                        {' '}
                        <Link prefetch href={`/item?id=${this.props.id}`}>
                          <a>{convertNumberToTimeAgo(this.props.creationTime)}</a>
                        </Link>
                      </span>
                      {' '}
                      <span id="unv_15238246" />
                      <span className="par" />
                      {' '}
                      <a className="togg" id="24" href="javascript:void(0)" onClick={this.toggle}>[-]</a>
                      <span className="storyon" />
                    </span>
                  </div>
                  <br />
                  <div className="comment">
                    <span className="c00">
                      <span dangerouslySetInnerHTML={{__html: this.props.text}} />
                      <div className="reply">
                        <p>
                          <font size="1">
                            <u>
                              <Link prefetch href={`/reply?id=${this.props.id}&goto=item%3Fid%3D${this.props.id}`}>
                                <a>reply</a>
                              </Link>
                            </u>
                          </font>
                        </p>
                      </div>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}

export default Comment;
