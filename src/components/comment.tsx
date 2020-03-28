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
    const { id, creationTime, indentationLevel, submitterId, text } = this.props;

    const vote = (): void => {
      return undefined;
    };

    const toggle = (): void => {
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
                    width={indentationLevel * 40} /* Width varies depending on comment level */
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
                      <Link href="/user?id=mstade">
                        <a className="hnuser">{submitterId}</a>
                      </Link>
                      <span className="age">
                        {' '}
                        <Link href={`/item?id=${id}`}>
                          <a>{convertNumberToTimeAgo(creationTime)}</a>
                        </Link>
                      </span>{' '}
                      <span id="unv_15238246" />
                      <span className="par" />{' '}
                      <a className="togg" id="24" onClick={toggle}>
                        [-]
                      </a>
                      <span className="storyon" />
                    </span>
                  </div>
                  <br />
                  <div className="comment">
                    <span className="c00">
                      <span>{renderHTML(text)}</span>
                      <div className="reply">
                        <p style={{ fontSize: '1' }}>
                          <u>
                            <Link href={`/reply?id=${id}&goto=item%3Fid%3D${id}`}>
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
