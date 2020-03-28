import Link from 'next/link';
import * as React from 'react';

import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

export function ListsPage(props): JSX.Element {
  const { router } = props;

  return (
    <MainLayout currentUrl={router.pathname}>
      <tr>
        <td>
          <table style={{ borderSpacing: '7px 0px' }}>
            <tbody>
              <tr>
                <td>
                  <Link href="/leaders">
                    <a>leaders</a>
                  </Link>
                </td>
                <td>Users with most karma.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/front">
                    <a>front</a>
                  </Link>
                </td>
                <td>
                  Front page submissions for a given day (e.g.{' '}
                  <a href="/front?day=2016-06-20">2016-06-20</a>), ordered by time spent there.
                </td>
              </tr>
              <tr>
                <td>
                  <Link href="/best">
                    <a>best</a>
                  </Link>
                </td>
                <td>Highest-voted recent links.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/active">
                    <a>active</a>
                  </Link>
                </td>
                <td>Most active current discussions.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/bestcomments">
                    <a>bestcomments</a>
                  </Link>
                </td>
                <td>Highest-voted recent comments.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/noobstories">
                    <a>noobstories</a>
                  </Link>
                </td>
                <td>Submissions from new accounts.</td>
              </tr>
              <tr>
                <td>
                  <Link href="/noobcomments">
                    <a>noobcomments</a>
                  </Link>
                </td>
                <td>Comments from new accounts.</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </MainLayout>
  );
}

export default withDataAndRouter(ListsPage);
