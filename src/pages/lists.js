import React from 'react';

import Main from '../layouts/Main';

const HomePage = () => (
  <Main>
    <tr>
      <td>
        <table style={{ borderSpacing: '7px 0px' }}>
          <tbody>
            <tr>
              <td>
                <a href="leaders">leaders</a></td>
              <td>
                Users with most karma.
              </td>
            </tr>
            <tr>
              <td>
                <a href="front">front</a>
              </td>
              <td>
                Front page submissions for a given day (e.g. <a href="front?day=2016-06-20">2016-06-20</a>), ordered by time spent there.
              </td>
            </tr>
            <tr>
              <td>
                <a href="best">best</a>
              </td>
              <td>
                Highest-voted recent links.
              </td>
            </tr>
            <tr>
              <td>
                <a href="active">active</a>
              </td>
              <td>
                Most active current discussions.
              </td>
            </tr>
            <tr>
              <td>
                <a href="bestcomments">bestcomments</a>
              </td>
              <td>
                Highest-voted recent comments.
              </td>
            </tr>
            <tr>
              <td>
                <a href="noobstories">noobstories</a>
              </td>
              <td>
                Submissions from new accounts.
              </td>
            </tr>
            <tr>
              <td>
                <a href="noobcomments">noobcomments</a>
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
);

export default HomePage;
