import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'react-apollo';
import Link from 'next/link';
import renderHTML from 'react-render-html';

import convertNumberToTimeAgo from '../../helpers/convertNumberToTimeAgo';


const Comment = (props) => {
  const vote = () => {
    console.log(this);
    // return "vote(event, this, &quot;up&quot;)";
  };
  const toggle = () => {
    console.log(this);
    // return "toggle(event, 15238246)";
  };
  return (
    <tr className="athing comtr " id="15238246">
      <td>
        <table style={{ border: '0' }}>
          <tbody>
            <tr>
              <td className="ind">
                <img alt="" src="/static/s.gif" height="1" width={`${props.indentationLevel * 40}px`}/* Width varies depending on comment level*/ />
              </td>
              <td style={{ verticalAlign: 'top' }} className="votelinks">
                <center>
                  <a id="up_15238246" onClick={vote} href="vote?id=15238246&amp;how=up&amp;auth=4eb97bf0d2568aa743691210b904f0c5182bb0fc&amp;goto=item%3Fid%3D15237896#15238246">
                    <div className="votearrow" title="upvote" />
                  </a>
                </center>
              </td>
              <td className="default">
                <div style={{ marginTop: '2px', marginBottom: '-10px' }}>
                  <span className="comhead">
                    <Link prefetch href="/user?id=mstade">
                      <a className="hnuser">{props.submitterId}</a>
                    </Link>
                    <span className="age">
                      {' '}
                      <Link prefetch href={`/item?id=${props.id}`}>
                        <a>{convertNumberToTimeAgo(props.creationTime)}</a>
                      </Link>
                    </span>
                    {' '}
                    <span id="unv_15238246" />
                    <span className="par" />
                    {' '}
                    <a className="togg" id="24" href="javascript:void(0)" onClick={toggle}>[-]</a>
                    <span className="storyon" />
                  </span>
                </div>
                <br />
                <div className="comment">
                  <span className="c00">
                    <span>{renderHTML(props.text)}</span>
                    <div className="reply">
                      <p>
                        <font size="1">
                          <u>
                            <Link prefetch href={`/reply?id=${props.id}&goto=item%3Fid%3D${props.id}`}>
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
};
Comment.propTypes = {
  id: PropTypes.number.isRequired,
  creationTime: PropTypes.number.isRequired,
  indentationLevel: PropTypes.number.isRequired,
  submitterId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
Comment.fragments = {
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
      text
    }
  `,
};

export default Comment;
