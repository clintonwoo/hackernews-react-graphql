import React from 'react';
import Link from 'next/link';

class Comment extends React.Component {
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
                  <img alt="" src="/static/s.gif" height="1" width="0"/* Width varies depending on comment level*/ />
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
                        <a className="hnuser">mstade</a>
                      </Link>
                      <span className="age">
                        {' '}
                        <Link prefetch href="/item?id=15238246">
                          <a>1 hour ago</a>
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
                      I honestly can't believe I'm saying this, but: can you please enable me to buy a new license for 4.0 even though it may not even be on the road map yet? Or switch to / enable a subscriber model which is paid yearly and gives access to all upgrades?<p>I rely so much on sublime for my day to day work and I fear the $80 or whatever I paid for it whenever ago is too cheap for the amount of value I'm getting out of it, and I'd hate to see this magnificent piece of software fall by the wayside because of an unsustainable business model.
                      </p>
                      <p>
                        Of course, if the business is perfectly sustainable then you know, carry on as you where.
                        <span />
                      </p>
                      <div className="reply">
                        <p>
                          <font size="1">
                            <u>
                              <Link prefetch href="/reply?id=15238246&amp;goto=item%3Fid%3D15237896%2315238246">
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
