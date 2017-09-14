import React from 'react';
import Link from 'next/link';

import Main from '../layouts/Main';
import withData from '../helpers/withData';

export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <tr>
      <td>
        <table style={{ borderSpacing: '7px 0px' }}>
          <tbody>
            <tr>
              <td>
                <Link prefetch href="/leaders">
                  <a>leaders</a>
                </Link>
              </td>
              <td>
                Users with most karma.
              </td>
            </tr>
            <tr>
              <td>
                <Link prefetch href="/front">
                  <a>front</a>
                </Link>
              </td>
              <td>
                Front page submissions for a given day (e.g. <a href="/front?day=2016-06-20">2016-06-20</a>), ordered by time spent there.
              </td>
            </tr>
            <tr>
              <td>
                <Link prefetch href="/best">
                  <a>best</a>
                </Link>
              </td>
              <td>
                Highest-voted recent links.
              </td>
            </tr>
            <tr>
              <td>
                <Link prefetch href="/active">
                  <a>active</a>
                </Link>
              </td>
              <td>
                Most active current discussions.
              </td>
            </tr>
            <tr>
              <td>
                <Link prefetch href="/bestcomments">
                  <a>bestcomments</a>
                </Link>
              </td>
              <td>
                Highest-voted recent comments.
              </td>
            </tr>
            <tr>
              <td>
                <Link prefetch href="/noobstories">
                  <a>noobstories</a>
                </Link>
              </td>
              <td>
                Submissions from new accounts.
              </td>
            </tr>
            <tr>
              <td>
                <Link prefetch href="/noobcomments">
                  <a>noobcomments</a>
                </Link>
              </td>
              <td>
                Comments from new accounts.
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </Main>
));
