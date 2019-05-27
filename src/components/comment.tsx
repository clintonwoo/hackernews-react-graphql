import Link from 'next/link';
import * as React from 'react';
import renderHTML from 'react-render-html';

import { convertNumberToTimeAgo } from '../helpers/convert-number-to-time-ago';

export interface ICommentProps {
  id: number;
  creationTime: number;
  indentationLevel: number;
  submitterId: string;
  text: string;
}

export const commentFragment = `
  fragment Comment on Comment {
    id
    creationTime
    comments {
      id
      creationTime
      submitterId
      text
    }
    submitterId
    text
  }
`;

export class Comment extends React.Component<ICommentProps> {
  render(): JSX.Element {
    const props = this.props;

    const vote = () => {
      return undefined;
    };

    const toggle = () => {
      return undefined;
    };

    return (
      <tr className="athing comtr " id="15238246">
        <td>
          <table style={{ border: '0' }}>
            <tbody>
              <tr>
                <td className="ind">
                  <img
                    alt=""
                    src="/static/s.gif"
                    height="1"
                    width={`${props.indentationLevel * 40}px`} /* Width varies depending on comment level*/
                  />
                </td>
                <td style={{ verticalAlign: 'top' }} className="votelinks">
                  <div style={{ textAlign: 'center' }}>
                    <a
                      id="up_15238246"
                      onClick={vote}
                      href="vote?id=15238246&amp;how=up&amp;auth=4eb97bf0d2568aa743691210b904f0c5182bb0fc&amp;goto=item%3Fid%3D15237896#15238246"
                    >
                      <div className="votearrow" title="upvote" />
                    </a>
                  </div>
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
                      </span>{' '}
                      <span id="unv_15238246" />
                      <span className="par" />{' '}
                      <a className="togg" id="24" href="javascript:void(0)" onClick={toggle}>
                        [-]
                      </a>
                      <span className="storyon" />
                    </span>
                  </div>
                  <br />
                  <div className="comment">
                    <span className="c00">
                      <span>{renderHTML(props.text)}</span>
                      <div className="reply">
                        <p style={{ fontSize: '1' }}>
                          <u>
                            <Link prefetch href={`/reply?id=${props.id}&goto=item%3Fid%3D${props.id}`}>
                              <a>reply</a>
                            </Link>
                          </u>
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
