import * as React from 'react';

import { MainLayout } from '../layouts/main-layout';
import { withData } from '../helpers/with-data';

export const FormatDocPage = withData((props) => (
  <MainLayout
    isFooterVisible={false}
    isNavVisible={false}
    currentUrl={props.dataContext.pathname}
    title="Formatting Options"
  >
    <tr>
      <td>
        <span className="admin">
          <div style={{ textAlign: 'center' }}>
            <table style={{ width: '500px' }}>
              <tbody>
                <tr>
                  <td>
                    Blank lines separate paragraphs.
                    <p>
                      Text after a blank line that is indented by two or more spaces is reproduced
                      verbatim. (This is intended for code.)
                    </p>
                    <p>
                      Text surrounded by asterisks is italicized, if the character after the first
                      asterisk isn&#39;t whitespace.
                    </p>
                    <p>
                      Urls become links, except in the text field of a submission.
                      <br />
                      <br />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </span>
        <br />
        <br />
      </td>
    </tr>
  </MainLayout>
));

export default FormatDocPage;
